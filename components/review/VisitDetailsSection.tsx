import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomDropdown from '../CustomDropDown'

export default function VisitDetailsSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        รายละเอียดภารกิจเยี่ยมชม
      </Text>
      <CustomDropdown
        label='แผนกที่ติดต่อ'
        data={[]}
        value={''}
        placeholder='เลือกแผนกที่ติดต่อที่นี่'
        onChange={() => { }}
      />
      <CustomDropdown
        label='ภารกิจเยี่ยมชม'
        data={[]}
        value={''}
        placeholder='เลือกภารกิจเยี่ยมชมที่นี่'
        onChange={() => { }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.bold,
    color: COLORS.main,
  }
})
