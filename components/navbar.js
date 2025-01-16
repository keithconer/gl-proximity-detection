import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image source={require('../assets/imgs/icons8-opera-glasses-96.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'flex-start',
  },
  logo: {
    height: 40,
    width: 40,
  },
});

export default Navbar;
