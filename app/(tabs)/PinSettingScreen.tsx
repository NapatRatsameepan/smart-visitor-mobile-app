import CustomButton from '@/components/CustomButton'
import CustomPin from '@/components/CustomPin'
import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PinSettingScreen() {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleNextButton = () => {
    if (step === 1) {
      if (pin.length < 6) {
        return Alert.alert("แจ้งเตือน", "กรุณาระบุ PIN ให้ครบ 6 หลัก");
      }
      setStep(2); // ไปขั้นตอนยืนยัน
    } else {
      if (pin === confirmPin) {
        router.replace('/(tabs)'); // สำเร็จ
      } else {
        Alert.alert("ผิดพลาด", "PIN ไม่ตรงกัน กรุณาลองใหม่");
        setConfirmPin(""); // ล้างค่าที่กรอกผิดเพื่อให้กรอกใหม่ได้ง่ายขึ้น
      }
    }
  };

  const handleBackButton = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.replace('/Login');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {step === 1 ? "กรุณาตั้งค่า PIN สำหรับเข้าใช้งาน" : "ยืนยัน PIN อีกครั้ง"}
          </Text>
        </View>

        <View style={styles.content}>
          <CustomPin
            value={step === 1 ? pin : confirmPin}
            onValueChange={step === 1 ? setPin : setConfirmPin}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            label="ย้อนกลับ"
            variant="red"
            onPress={handleBackButton}
            style={{ flex: 1 }}
          />
          <CustomButton
            label={step === 1 ? "ต่อไป" : "ยืนยัน"}
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
