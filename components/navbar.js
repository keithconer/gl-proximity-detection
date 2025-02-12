import { View, Image, StyleSheet } from "react-native"

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image source={require("../assets/imgs/logo.png")} style={styles.logo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: "25%",
    width: "100%",
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    height: 40,
    width: 40,
    marginBottom: 8,
  },
})

export default Navbar

