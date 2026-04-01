import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SubHeaderProps {
  onBack: () => void;
  title?: string;
  showProgress?: boolean;
  progressWidth?: any;
}

const SubHeader = ({
  onBack,
  title,
  showProgress = false,
  progressWidth
}: SubHeaderProps) => {
  return (
    <View style={styles.subHeader}>
      <View style={styles.subHeaderTop}>
        <TouchableOpacity onPress={onBack} style={styles.subHeaderBackButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          <Text style={styles.subHeaderBackText}>ย้อนกลับ</Text>
        </TouchableOpacity>

        {/* แสดง Title เฉพาะเมื่อมีการส่งค่ามา */}
        {title && <Text style={styles.stepNameText}>{title}</Text>}
      </View>

      {/* แสดง Progress Bar เฉพาะเมื่อตั้งค่าเป็น true */}
      {showProgress && (
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 20,
  },
  subHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  subHeaderBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeaderBackText: {
    fontFamily: Typography.bold,
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 4,
  },
  stepNameText: {
    fontFamily: Typography.bold,
    fontSize: 16,
    color: COLORS.white,
  },
  progressBarContainer: {
    height: 6,
    width: '50%',
    backgroundColor: COLORS.border,
    borderRadius: 4,
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.main,
    borderRadius: 4,
  },
});

export default SubHeader;