import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Search it, 2025. All Rights Reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingBottom: 20,
    paddingTop: 10,
  },
  footerText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Footer;
