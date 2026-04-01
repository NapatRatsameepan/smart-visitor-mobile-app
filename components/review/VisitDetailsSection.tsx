import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomDropdown from '../CustomDropDown'

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
  missions?: { label: string, value: any }[];
  departments?: { label: string, value: any }[];
}

export default function VisitDetailsSection({ data, onChange, missions = [], departments = [] }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>รายละเอียดการเยี่ยมชม</Text>

      <CustomDropdown
        label='แผนกที่ติดต่อ'
        data={departments}
        value={data.departmentId || ''}
        placeholder='เลือกแผนกที่นี่'
        onChange={(item) => onChange('departmentId', item.value)}
      />

      <CustomDropdown
        label='วัตถุประสงค์'
        data={missions}
        value={data.missionId || ''}
        placeholder='เลือกวัตถุประสงค์ที่นี่'
        onChange={(item) => onChange('missionId', item.value)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.bold,
    color: COLORS.main,
  }
})

