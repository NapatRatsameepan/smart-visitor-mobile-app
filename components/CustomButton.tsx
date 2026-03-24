import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'main' | 'green' | 'red';
  style?: ViewStyle;
}

export default function CustomButton({ label, onPress, variant = 'main' }: CustomButtonProps) {
  const getVariantStyle = () => {

    switch (variant) {
      case 'green': return styles.bgGreen;
      case 'red': return styles.bgRed;
      default: return styles.bgMain;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, getVariantStyle()]}
    >
      <Text style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgMain: {
    backgroundColor: COLORS.main,
  },
  bgGreen: {
    backgroundColor: COLORS.green,
  },
  bgRed: {
    backgroundColor: COLORS.red,
  },
  text: {
    fontFamily: Typography.bold,
    color: '#FFFFFF',
    fontSize: 16,
  },
});