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
    textAlign: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.5,
  },
});

export default Footer;
