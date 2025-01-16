import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Hero from './components/hero';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Righteous': require('./assets/fonts/Righteous-Regular.ttf'),
    'StalinistOne': require('./assets/fonts/StalinistOne-Regular.ttf'),
    'TIDOEmoji': require('./assets/fonts/TIDOEmoji.otf'),
  });

  if (!fontsLoaded) {
    return null; // Wait for fonts to load
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
    backgroundColor: '#1B1B1B',
  },
  contentWrapper: {
    flexGrow: 1,
  },
});
