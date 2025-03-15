"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BleManager } from "react-native-ble-plx"
import SearchActions from "./search-actions"

const Hero = () => {
  const [manager] = useState(new BleManager())
  const [isScanning, setIsScanning] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [disconnectModalVisible, setDisconnectModalVisible] = useState(false);
  const [showSearchActions, setShowSearchActions] = useState(false)
  const [connectedDevice, setConnectedDevice] = useState(null);



  const handleScan = async () => {
    console.log("Starting BLE scan...");
  
    if (!isScanning) {
      setIsScanning(true);
      setModalVisible(true);
  
      if (Platform.OS === "android" && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        ]);
  
        if (
          granted["android.permission.ACCESS_FINE_LOCATION"] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted["android.permission.BLUETOOTH_SCAN"] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted["android.permission.BLUETOOTH_CONNECT"] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Permissions denied");
          setIsScanning(false);
          setModalVisible(false);
          return;
        }
      }
  
      console.log("Permissions granted, scanning for ESP32...");
  
      manager.startDeviceScan(null, null, async (error, device) => {
        if (error) {
          console.error("Scan Error:", error);
          setIsScanning(false);
          setModalVisible(false);
          return;
        }
  
        if (device.name) console.log(`Found device: ${device.name}`);
  
        if (device.name === "ESP32-Locator") {
          console.log("ESP32-Locator found, attempting to connect...");
          manager.stopDeviceScan();
        
          try {
            await device.connect();
            console.log("Connected to ESP32!");
        
            await device.discoverAllServicesAndCharacteristics();
            console.log("Services discovered!");
        
            setConnectedDevice(device); // ✅ Set the connected device here
            setModalVisible(false);
            setSuccessModalVisible(true);
            setShowSearchActions(true);
        
            // Listen for disconnection
            device.onDisconnected(() => {
              console.log("ESP32 Disconnected!");
              handleDisconnect();
            });
        
          } catch (err) {
            console.error("Connection Failed:", err);
            setIsScanning(false);
            setModalVisible(false);
          }
        }
        
  });


      setTimeout(() => {
        console.log("Scan timed out, stopping scan.");
        manager.stopDeviceScan();
        setIsScanning(false);
        setModalVisible(false);
      }, 10000);
    }
  };

   // Function to handle ESP32 disconnection
   const handleDisconnect = () => {
    setShowSearchActions(false);
    setSuccessModalVisible(false);
    setDisconnectModalVisible(true);
    setConnectedDevice(null);
  };
  

  const handleCancel = () => {
    setIsScanning(false)
    setModalVisible(false)
    setShowSearchActions(false)
  }

  const handleSuccess = () => {
    setSuccessModalVisible(false)
  }

  return (
    <View style={styles.container}>
      {showSearchActions ? (
        <SearchActions connectedDevice={connectedDevice} />
      ) : (
        <View style={styles.hero}>
          <View style={styles.content}>
            <Text style={styles.title}>search it.</Text>
            <Text style={styles.description}>Pair your device to perform search actions.</Text>

            <TouchableOpacity
              style={[styles.button, isScanning && styles.buttonDisabled]}
              onPress={handleScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="bluetooth" size={20} color="white" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Pair Device</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Scanning Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.signalIcon}>
              <Ionicons name="cellular" size={40} color="#1E88E5" />
            </View>
            <Text style={styles.modalTitle}>Scanning</Text>
            <Text style={styles.modalText}>
              for the microcontroller broadcast signal, please wait{"\n"}until the scanning is done.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

{/* Disconnection Modal */}
      <Modal animationType="fade" transparent={true} visible={disconnectModalVisible} onRequestClose={() => setDisconnectModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={50} color="red" />
            <Text style={[styles.modalTitle, { color: "red" }]}>Connection Lost</Text>
            <Text style={styles.modalText}>You have been disconnected due to distance limitations, ensure you are within the 10-15 meters distance away from the microcontroller and keep the bluetooth on.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setDisconnectModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal animationType="fade" transparent={true} visible={successModalVisible} onRequestClose={handleSuccess}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={50} color="#1E88E5" />
            </View>
            <Text style={[styles.modalTitle, styles.successTitle]}>Paired Successfully</Text>
            <Text style={styles.modalText}>
              You are now connected to the{"\n"}microcontroller. You may now{"\n"}be able perform search actions.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSuccess}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  hero: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: -40,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1E88E5",
    marginTop: 60,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#1E88E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    maxWidth: 300,
  },
  buttonDisabled: {
    backgroundColor: "#90CAF9",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "80%",
    maxWidth: 320,
  },
  signalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1E88E5",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
  },
})

export default Hero

