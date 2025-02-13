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
import { useNavigation } from "@react-navigation/native"

const Hero = () => {
  const navigation = useNavigation()
  const [manager] = useState(new BleManager())
  const [isScanning, setIsScanning] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [device, setDevice] = useState(null)

  const handleScan = async () => {
    if (!isScanning) {
      setIsScanning(true)
      setModalVisible(true)

      if (Platform.OS === "android" && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (!granted) {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setModalMessage("Location permission denied.")
            return
          }
        }
      }

      // Simulate scanning for 4 seconds then show success
      setTimeout(() => {
        setModalVisible(false)
        setSuccessModalVisible(true)
      }, 4000)
    }
  }

  const handleCancel = () => {
    setIsScanning(false)
    setModalVisible(false)
  }

  const handleSuccess = () => {
    console.log("Success Modal closed, navigating...");
    setSuccessModalVisible(false);
  
    setTimeout(() => {
      navigation.navigate("SearchActions");
    }, 500);
  };
  

  return (
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
  hero: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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

