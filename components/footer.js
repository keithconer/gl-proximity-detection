import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2023 Salamin. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    paddingBottom: 10,
    // Remove textAlign from here as it's not effective for View components
  },
  footerText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center', // Correctly apply textAlign to Text component
  },
});

export default Footer;
