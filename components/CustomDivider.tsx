import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function CustomDivider() {
  return (
    <View style={styles.divider} />
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 2,
    borderRadius: 10,
    backgroundColor: '#AEAEAE',
  }
})
