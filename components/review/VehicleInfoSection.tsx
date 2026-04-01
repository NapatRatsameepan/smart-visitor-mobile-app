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
  provinces?: { label: string, value: any }[];
  carBrands?: { label: string, value: any }[];
  carColors?: { label: string, value: any }[];
}

export default function VehicleInfoSection({ data, onChange, imageUri, provinces = [], carBrands = [], carColors = [] }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ข้อมูลรถผู้มาติดต่อ
      </Text>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <CustomDropdown
        label='ยี่ห้อรถ'
        data={carBrands}
        value={data.carId || ''}
        placeholder='เลือกยี่ห้อรถที่นี่'
        onChange={(item) => onChange('carId', item.value)}
      />
      <CustomDropdown
        label='สีรถ'
        data={carColors}
        value={data.colorId || ''}
        placeholder='เลือกสีรถที่นี่'
        onChange={(item) => onChange('colorId', item.value)}
      />
      <CustomInput
        label="ทะเบียน"
        value={data.licensePlate || ''}
        onChangeText={(val) => onChange('licensePlate', val)}
        placeholder='กรอกทะเบียนที่นี่'
      />
      <CustomDropdown
        label='จังหวัด'
        data={provinces}
        value={data.provinceId || ''}
        placeholder='เลือกจังหวัดที่นี่'
        onChange={(item) => onChange('provinceId', item.value)}
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
