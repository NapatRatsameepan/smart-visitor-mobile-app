import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomDropdown from '../CustomDropDown'
import CustomInput from '../CustomInput'
import { Image } from 'expo-image'

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
  imageUri?: string;
}

export default function VisitorInfoSection({ data, onChange, imageUri }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ข้อมูลผู้มาติดต่อ
      </Text>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <CustomInput
        label='คำนำหน้า'
        value={data.prefix || ''}
        placeholder='เช่น นาย, นาง, นางสาว'
        onChangeText={(val) => onChange('prefix', val)}
      />
      <CustomInput
        label="ชื่อ"
        value={data.firstName || ''}
        onChangeText={(val) => onChange('firstName', val)}
        placeholder='กรอกชื่อที่นี่'
      />
      <CustomInput
        label="นามสกุล"
        value={data.lastName || ''}
        onChangeText={(val) => onChange('lastName', val)}
        placeholder='กรอกนามสกุลที่นี่'
      />
      <CustomInput
        label="เลขประจำตัวประชาชน"
        value={data.personalId || ''}
        onChangeText={(val) => onChange('personalId', val)}
        placeholder='กรอกเลขประจำตัวประชาชนที่นี่'
      />
      <CustomInput
        label="ที่อยู่"
        value={data.address || ''}
        onChangeText={(val) => onChange('address', val)}
        placeholder='กรอกที่อยู่ที่นี่'
      />
      <CustomInput
        label="เบอร์ติดต่อ"
        value={data.phone || ''}
        onChangeText={(val) => onChange('phone', val)}
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
    overflow: 'hidden'
  },
  image: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
  }
})
