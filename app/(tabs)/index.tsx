import CustomButton from '@/components/CustomButton'
import CustomDivider from '@/components/CustomDivider'
import MainLayout from '@/components/MainLayout'
import StillOnSiteBadge from '@/components/StillOnSiteBadge'
import VisitCounter from '@/components/VisitCounter'
import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

const { width } = Dimensions.get('window');
const SCAN_BUTTON_SIZE = (width - 60) / 2;
const NAV_BUTTON_SIZE = (width - 40 - 36) / 4;


export default function HomepageScreen() {

  const router = useRouter();

  const handleScanIn = () => {
    router.push('/(tabs)/scanin/ScanInPage');
  }

  const handleScanOut = () => {
    router.push('/(tabs)/scanout/ScanOutPage');
  }

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
          label='สแกนเข้า'
          icon={
            <Image
              source={require('@/assets/icon/User_scan.svg')}
              style={{ width: 80, height: 80 }}
              tintColor={COLORS.white}
              contentFit="contain"
            />
          }
          onPress={handleScanIn}
          variant="green"
          style={styles.scanButton}
          textStyle={styles.scanButtonText}
        />
        <CustomButton
          label='สแกนออก'
          icon={
            <Image
              source={require('@/assets/icon/Export.svg')}
              style={{ width: 80, height: 80 }}
              tintColor={COLORS.white}
              contentFit="contain"
            />
          }
          onPress={handleScanOut}
          variant="red"
          style={styles.scanButton}
          textStyle={styles.scanButtonText}
        />
      </View>

      <View style={styles.navigationContainer}>
        <CustomButton
          label='ประวัติ'
          icon={
            <Image
              source={require('@/assets/icon/File_dock_search.svg')}
              style={{ width: 24, height: 24 }}
              tintColor={COLORS.white}
              contentFit="contain"
            />
          }
          onPress={() => { }}
          style={styles.navButton}
          textStyle={styles.navButtonText}
        />
        <CustomButton
          label='แผนก'
          icon={
            <Image
              source={require('@/assets/icon/Direction.svg')}
              style={{ width: 24, height: 24 }}
              tintColor={COLORS.white}
              contentFit="contain"
            />
          }
          onPress={() => { }}
          style={styles.navButton}
          textStyle={styles.navButtonText}
        />
        <CustomButton
          label='ยี่ห้อรถ'
          icon={
            <Image
              source={require('@/assets/icon/Img.svg')}
              style={{ width: 24, height: 24 }}
              tintColor={COLORS.white}
              contentFit="contain"
            />
          }
          onPress={() => { }}
          style={styles.navButton}
          textStyle={styles.navButtonText}
        />
        <CustomButton
          label='ภารกิจ'
          icon={
            <Image
              source={require('@/assets/icon/Flag_finish_alt.svg')}
              style={{ width: 24, height: 24 }}
              tintColor={COLORS.white}
              contentFit="contain"
            />
          }
          onPress={() => { }}
          style={styles.navButton}
          textStyle={styles.navButtonText}
        />
      </View>
    </MainLayout >
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    marginTop: 40,
  },
  badgeContainer: {
    position: 'absolute',
    top: 180,
    right: 40,
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  scanInOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
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
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  navButton: {
    width: NAV_BUTTON_SIZE,
    height: NAV_BUTTON_SIZE,
    borderRadius: 15,
    backgroundColor: COLORS.main,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: Typography.bold,
  }
})