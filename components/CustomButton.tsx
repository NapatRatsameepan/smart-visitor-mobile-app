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
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
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
    borderColor: COLORS.main,
  },
  text: {
    fontFamily: Typography.bold,
    color: COLORS.white,
    fontSize: 16,
  },
});