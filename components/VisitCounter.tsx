import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface VisitCounterProps {
  count: number
}

export default function VisitCounter({ count }: VisitCounterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>เยี่ยมชมวันนี้</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 24,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  count: {
    fontSize: 100,
    fontFamily: Typography.bold,
    color: COLORS.main,
    lineHeight: 100,
    marginBottom: -5,
    textAlign: 'center',
  },
  label: {
    fontSize: 24,
    fontFamily: Typography.bold,
    color: COLORS.main,
    textAlign: 'center',
  },
})