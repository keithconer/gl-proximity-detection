import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Hero = () => {
  return (
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>Salamin.</Text>
      <Text style={styles.heroSubtitle}>T</Text>
      <Text style={styles.heroDescription}>
        Development of an IoT-based Smart Eyeglasses Locator System Using ESP32 and BLE Technology.
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    backgroundColor: '#C2185B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Hero;
