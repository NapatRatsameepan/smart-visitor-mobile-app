import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';

interface CustomInfoFieldProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

export default function CustomInfoField({ label, value, style }: CustomInfoFieldProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.readOnlyInput}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: Typography.bold,
    color: COLORS.main,
    marginBottom: 8,
  },
  readOnlyInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputText: {
    color: '#64748B',
    fontSize: 16,
    fontFamily: Typography.regular,
  },
});
