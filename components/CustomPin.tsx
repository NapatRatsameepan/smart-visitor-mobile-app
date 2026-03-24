import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width } = Dimensions.get('window')
const PIN_LENGTH = 6
const BUTTON_SIZE = width * 0.22

export default function CustomPin() {
  const [pin, setPin] = useState('')

  // ฟังก์ชันเมื่อกดตัวเลข
  const handlePressNumber = (num: string) => {
    if (pin.length < PIN_LENGTH) {
      setPin(prev => prev + num)
    }
  }

  // ฟังก์ชันลบตัวเลข
  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1))
  }

  // ข้อมูลปุ่มตัวเลข (null คือช่องว่าง)
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'ลบ']

  return (
    <View style={styles.container}>
      {/* ส่วนแสดงจุด PIN */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: PIN_LENGTH }).map((_, index) => {
          const isActive = index < pin.length;
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
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                { backgroundColor: isDelete ? COLORS.red : COLORS.main }
              ]}
              onPress={() => isDelete ? handleDelete() : handlePressNumber(item.toString())}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    textDecorationLine: 'none',
  },
})