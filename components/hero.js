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

const Hero = () => {
  const [manager] = useState(new BleManager())
  const [isScanning, setIsScanning] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [device, setDevice] = useState(null)

  const handleScan = async () => {
    if (!isScanning) {
      setIsScanning(true)
      setModalMessage("Scanning...")
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

      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error(error)
          setModalMessage("Scan error.")
          setIsScanning(false)
          setModalVisible(true)
          return
        }
        if (device) {
          console.log(device)
          setDevice(device)
          manager.stopDeviceScan()
          setIsScanning(false)
          setModalMessage("Device found: " + device.name)
          setModalVisible(true)
        }
      })
    }
  }

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

      {/* Removed Footer Text */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
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
    marginTop: -40, // Adjust for logo position
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1E88E5",
    marginTop: 60, // Space for logo above
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
    borderRadius: 25, // More rounded corners to match design
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
  //Removed Footer Style
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    width: "80%",
    maxWidth: 320,
  },
  modalText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default Hero

