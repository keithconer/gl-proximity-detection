// app/tabs/explore.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Explore screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1B1B",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
