import CustomButton from '@/components/CustomButton'
import CustomPin from '@/components/CustomPin'
import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PinSettingScreenAgain() {

  const router = useRouter();

  const handleNextButton = () => {
    router.replace('/(tabs)/PinSettingScreenAgain');
  }

  const handleBackButton = () => {
    router.replace('/(tabs)/PinSettingScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>ยืนยัน PIN อีกครั้ง</Text>
        </View>

        <View style={styles.content}>
          <CustomPin />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            label="ย้อนกลับ"
            variant="red"
            onPress={handleBackButton}
            style={{ flex: 1 }}
          />
          <CustomButton
            label="ยืนยัน"
            variant="green"
            onPress={handleNextButton}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  header: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.main,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: Typography.bold,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
})
