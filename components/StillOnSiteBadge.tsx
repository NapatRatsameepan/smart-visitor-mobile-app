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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  count: {
    fontSize: 36,
    fontFamily: Typography.bold,
    color: COLORS.white,
    lineHeight: 36,
    marginBottom: -5,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: Typography.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
})