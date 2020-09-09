import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#7E4822',
    elevation: 4
  },
  navbarText: {
    color: '#25170A',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20
  }
})

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Dice Roller</Text>
    </View>
  )
}
