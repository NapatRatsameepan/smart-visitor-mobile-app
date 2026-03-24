import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logo from '../assets/logo.png'
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';

export default function SignInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    router.replace('/(tabs)/VehicleBrandScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.logoContainer}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* ส่วนแสดง Form */}
        <View style={styles.formContainer}>
          <CustomInput
            label="ชื่อผู้ใช้"
            placeholder='กรอกชื่อผู้ใช้ที่นี่'
            value={username}
            onChangeText={setUsername}
          />

          <CustomInput
            label="รหัสผ่าน"
            placeholder='กรอกรหัสผ่านที่นี่'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonWrapper}>
            <CustomButton
              label='ลงชื่อเข้าใช้'
              onPress={handleSignIn}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 48,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 280,
    height: 280,
  },
  formContainer: {
    gap: 16,
  },
  buttonWrapper: {
    marginTop: 24,
  },
});