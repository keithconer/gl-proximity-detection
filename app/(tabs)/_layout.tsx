// app/tabs/_layout.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tabHeader}>Your Tabs Header</Text>
      <View style={styles.tabContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    padding: 20,
  },
  tabHeader: {
    fontSize: 24,
    fontFamily: "Righteous",
    color: "white",
    marginBottom: 20,
  },
  tabContent: {
    flex: 1,
  },
});
