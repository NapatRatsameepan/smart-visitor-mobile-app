import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface CustomDropdownProps {
  label?: string;
  data: { label: string; value: string }[];
  value: string;
  placeholder: string;
  onChange: (item: { label: string; value: string }) => void;
  style?: StyleProp<ViewStyle>;
}

export default function CustomDropdown({
  label,
  data,
  value,
  placeholder,
  onChange,
  style,
}: CustomDropdownProps) {
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: COLORS.main }
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Image
            source={require('@/assets/icon/Expand_left.svg')}
            style={{ width: 18, height: 18, transform: [{ rotate: isFocus ? '270deg' : '90deg' }] }}
            tintColor={isFocus ? COLORS.main : "#64748B"}
          />
        )}
        renderItem={renderItem}
      />
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
    marginBottom: 8,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Typography.regular,
    color: '#64748B',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: Typography.regular,
    color: COLORS.main,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: Typography.regular,
    color: COLORS.main,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
});