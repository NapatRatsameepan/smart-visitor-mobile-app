import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import CustomButton from './CustomButton'

const { width } = Dimensions.get('window')
const PIN_LENGTH = 6
const BUTTON_SIZE = width * 0.22

interface CustomPinProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CustomPin({ value, onValueChange }: CustomPinProps) {
  // ฟังก์ชันเมื่อกดตัวเลข
  const handlePressNumber = (num: string) => {
    if (value.length < PIN_LENGTH) {
      onValueChange(value + num);
    }
  }

  // ฟังก์ชันลบตัวเลข
  const handleDelete = () => {
    onValueChange(value.slice(0, -1));
  }

  // ข้อมูลปุ่มตัวเลข (null คือช่องว่าง)
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'ลบ']

  return (
    <View style={styles.container}>
      {/* ส่วนแสดงจุด PIN */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: PIN_LENGTH }).map((_, index) => {
          const isActive = index < value.length;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive ? { backgroundColor: COLORS.main } : { backgroundColor: '#E0E0E0' }
              ]}
            />
          );
        })}
      </View>

      {/* ส่วนปุ่ม Numpad */}
      <View style={styles.numpadContainer}>
        {buttons.map((item, index) => {
          if (item === null) {
            return <View key={index} style={styles.buttonPlaceholder} />
          }

          const isDelete = item === 'ลบ'

          return (
            <CustomButton
              key={index}
              label={item.toString()}
              variant={isDelete ? 'red' : 'main'}
              onPress={() => isDelete ? handleDelete() : handlePressNumber(item.toString())}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 7.5,
  },
  numpadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.8,
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonPlaceholder: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 28,
    fontFamily: Typography.bold,
    color: '#FFFFFF',
  },
})