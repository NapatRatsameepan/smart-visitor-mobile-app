import CustomButton from '@/components/CustomButton'
import CustomDivider from '@/components/CustomDivider'
import MainLayout from '@/components/MainLayout'
import StillOnSiteBadge from '@/components/StillOnSiteBadge'
import VisitCounter from '@/components/VisitCounter'
import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

const { width } = Dimensions.get('window');
const SCAN_BUTTON_SIZE = (width - 60) / 2;

export default function HomepageScreen() {
  return (
    <MainLayout title='SmartVisitor'>
      <View style={styles.chartContainer}>
        <VisitCounter count={10} />
        <View style={styles.badgeContainer}>
          <StillOnSiteBadge count={10} />
        </View>
      </View>

      <View style={styles.dividerContainer}>
        <CustomDivider />
      </View>

      <View style={styles.scanInOutContainer}>
        <CustomButton
          label='Scan In'
          icon={<Ionicons name="qr-code-outline" size={40} color={COLORS.white} />}
          onPress={() => { }}
          variant="green"
          style={styles.scanButton}
          textStyle={styles.scanButtonText}
        />
        <CustomButton
          label='Scan Out'
          icon={<Ionicons name="log-out-outline" size={40} color={COLORS.white} />}
          onPress={() => { }}
          variant="red"
          style={styles.scanButton}
          textStyle={styles.scanButtonText}
        />
      </View>
    </MainLayout >
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 90,
    marginTop: 40,
  },
  badgeContainer: {
    position: 'absolute',
    top: 140,
    right: 70,
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scanInOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  scanButton: {
    width: SCAN_BUTTON_SIZE,
    height: SCAN_BUTTON_SIZE,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanButtonText: {
    fontSize: 20,
    fontFamily: Typography.bold,
  }
})