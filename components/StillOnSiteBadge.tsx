import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


interface StillOnSiteBadgeProps {
  count: number
}

export default function StillOnSiteBadge({ count }: StillOnSiteBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>ยังไม่แสกนออก</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  count: {
    fontSize: 48,
    fontFamily: Typography.bold,
    color: COLORS.white,
    lineHeight: 48,
    marginBottom: -5,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
})