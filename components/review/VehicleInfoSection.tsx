import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomDropdown from '../CustomDropDown'
import CustomInput from '../CustomInput'

export default function VehicleInfoSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ข้อมูลรถผู้มาติดต่อ
      </Text>
      <View style={styles.imageContainer}>

      </View>
      <CustomDropdown
        label='ยี่ห้อรถ'
        data={[]}
        value={''}
        placeholder='เลือกยี่ห้อรถที่นี่'
        onChange={() => { }}
      />
      <CustomDropdown
        label='สีรถ'
        data={[]}
        value={''}
        placeholder='เลือกสีรถที่นี่'
        onChange={() => { }}
      />
      <CustomInput
        label="ทะเบียน"
        value=""
        onChangeText={() => { }}
        placeholder='กรอกทะเบียนที่นี่'
      />
      <CustomDropdown
        label='จังหวัด'
        data={[]}
        value={''}
        placeholder='เลือกจังหวัดที่นี่'
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
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.grey,
    borderRadius: 6,
  }
})