import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CustomButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  variant?: 'main' | 'green' | 'red' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  label,
  icon,
  onPress,
  variant = 'main',
  style,
  textStyle
}: CustomButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'green': return styles.bgGreen;
      case 'red': return styles.bgRed;
      case 'outline': return styles.bgOutline;
      default: return styles.bgMain;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, getVariantStyle(), style]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {label && (
        <Text style={[styles.text, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 4,
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
  bgOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  text: {
    fontFamily: Typography.bold,
    color: COLORS.white,
    fontSize: 16,
  },
});