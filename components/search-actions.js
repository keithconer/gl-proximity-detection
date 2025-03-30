import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchActions = ({ connectedDevice }) => {
  const [rssi, setRssi] = useState(null);
  const [proximity, setProximity] = useState("Unknown");
  const opacity = new Animated.Value(1); // For blinking effect

  // Function to determine proximity from RSSI
  const getProximityLabel = (rssiValue) => {
    if (rssiValue >= -50) return "Very Near";
    if (rssiValue >= -63) return "Near";
    if (rssiValue >= -75) return "Far";
    return "Very Far";
  };

  // ✅ Real-time RSSI updates (removes delay)
  useEffect(() => {
    if (!connectedDevice) return;

    const updateRSSI = async () => {
      try {
        const updatedDevice = await connectedDevice.readRSSI();
        const rssiValue = updatedDevice.rssi;

        if (typeof rssiValue === "number") {
          setRssi(rssiValue);
          setProximity(getProximityLabel(rssiValue));
        }
      } catch (err) {
        console.error("Error reading RSSI:", err);
      }
    };

    const interval = setInterval(updateRSSI, 500); // ✅ Updated every 500ms for real-time updates

    return () => clearInterval(interval);
  }, [connectedDevice]);

  // Radar blinking effect
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>search it.</Text>
        <Text style={styles.description}>You may now perform search actions.</Text>

        {/* ✅ Clean RSSI Display (no debug text) */}
        <Animated.View style={[styles.rssiContainer, { opacity }]}>
          <Text style={styles.rssiText}>
            Signal Strength: {rssi !== null ? `${rssi} dBm (${proximity})` : "Scanning..."}
          </Text>
        </Animated.View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="volume-high" size={24} color="#1E88E5" />
          <Text style={styles.actionText}>Buzzer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="flash" size={24} color="#1E88E5" />
          <Text style={styles.actionText}>Light</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 24,
  },
  rssiContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F0F8FF",
  },
  rssiText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  description: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Ensures equal spacing like the reference image
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#1E88E5",
  },
});

export default SearchActions;
