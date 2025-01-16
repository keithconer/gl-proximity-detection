import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Hero = () => {
  return (
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>Salamin.</Text>
      <Text style={styles.heroSubtitle}>T</Text>
      <Text style={styles.heroDescription}>
        Pair your device to trigger the buzzer.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="bluetooth" size={24} color="white" />
          <Text style={styles.buttonText}>Pair Device</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="volume-up" size={24} color="white" />
          <Text style={styles.buttonText}>Trigger Buzzer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    paddingVertical: 50,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 70,
    fontFamily: 'Righteous',
    fontWeight: '700',
    color: 'white',
  },
  heroSubtitle: {
    fontSize: 45,
    fontFamily: 'TIDOEmoji',
    paddingBottom: 30,
    color: 'white',
  },
  heroDescription: {
    fontSize: 18,
    maxWidth: 800,
    textAlign: 'center',
    marginBottom: 40,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'column', // Stack the buttons vertically
    width: '100%', // Make the container take the full width
    paddingHorizontal: 15, // Add horizontal padding for better spacing
    marginBottom: 20, // Optional: Add margin at the bottom
  },
  button: {
    backgroundColor: '#C2185B',
    paddingVertical: 15, // Add more vertical padding to make buttons larger
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Space between buttons
    width: '100%', // Full width for each button
    justifyContent: 'center', // Center the content inside the button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Hero;
