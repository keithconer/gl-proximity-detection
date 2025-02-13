import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchActions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/imgs/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>search it.</Text>
        <Text style={styles.description}>
          You may now perform search actions.
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="camera" size={24} color="#1E88E5" />
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>

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
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    paddingTop: 60,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#1E88E5",
  },
});

export default SearchActions;
