import React from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { StalinistOne_400Regular } from "@expo-google-fonts/stalinist-one";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Footer from "../components/footer";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Righteous: Righteous_400Regular,
    StalinistOne: StalinistOne_400Regular,
    TIDOEmoji: require("../assets/fonts/TIDOemoji.otf"), // Correctly load the custom TIDOEmoji font
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // If fonts are still loading
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Navbar />
        <Hero />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
  },
  contentWrapper: {
    flexGrow: 1,
  },
  title: {
    fontFamily: "Righteous", // Use the loaded Righteous font
    fontSize: 50,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "StalinistOne", // Use the loaded StalinistOne font
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  emojiText: {
    fontFamily: "TIDOEmoji", // Use the loaded TIDOEmoji font
    fontSize: 100, // Adjust size for emojis if needed
    color: "#fff",
  },
});
