import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  style?: StyleProp<ViewStyle>;
  label?: string;
}

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  label = ""
}: CustomInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholderTextColor="#64748B"
          style={[styles.input, secureTextEntry && { paddingRight: 44 }]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Image
              source={require('@/assets/icon/View.svg')}
              style={{ width: 24, height: 24 }}
              tintColor={isPasswordVisible ? COLORS.main : "#64748B"}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: Typography.bold,
    color: COLORS.main,
    fontSize: 16,
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    height: 40,
    fontFamily: Typography.regular,
    color: COLORS.main,
    fontSize: 16,
    textAlignVertical: 'center',
  },
});

