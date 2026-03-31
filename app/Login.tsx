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
    router.replace('/(tabs)/PinSettingScreen');
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
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 24,
  },
});