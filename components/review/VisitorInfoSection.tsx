import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomDropdown from '../CustomDropDown'
import CustomInput from '../CustomInput'

export default function VisitorInfoSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ข้อมูลผู้มาติดต่อ
      </Text>
      <View style={styles.imageContainer}>

      </View>
      <CustomDropdown
        label='คำนำหน้า'
        data={[]}
        value={''}
        placeholder='เลือกคำนำหน้า'
        onChange={() => { }}
      />
      <CustomInput
        label="ชื่อ"
        value=""
        onChangeText={() => { }}
        placeholder='กรอกชื่อที่นี่'
      />
      <CustomInput
        label="นามสกุล"
        value=""
        onChangeText={() => { }}
        placeholder='กรอกนามสกุลที่นี่'
      />
      <CustomInput
        label="เลขประจำตัวประชาชน"
        value=""
        onChangeText={() => { }}
        placeholder='กรอกเลขประจำตัวประชาชนที่นี่'
      />
      <CustomInput
        label="ที่อยู่"
        value=""
        onChangeText={() => { }}
        placeholder='กรอกที่อยู่ที่นี่'
      />
      <CustomInput
        label="เบอร์ติดต่อ"
        value=""
        onChangeText={() => { }}
        placeholder='กรอกเบอร์ติดต่อที่นี่'
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
