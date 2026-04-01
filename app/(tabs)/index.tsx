import CustomButton from '@/components/CustomButton'
import CustomDivider from '@/components/CustomDivider'
import MainLayout from '@/components/MainLayout'
import StillOnSiteBadge from '@/components/StillOnSiteBadge'
import VisitCounter from '@/components/VisitCounter'
import { COLORS } from '@/constants/colors'
import { Typography } from '@/constants/fonts'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { Dimensions, StyleSheet, View, Alert, PermissionsAndroid, Platform, Linking } from 'react-native'
import { BLEPrinter } from 'react-native-thermal-receipt-printer-image-qr'
import QRCode from 'react-native-qrcode-svg'

const { width } = Dimensions.get('window');
const SCAN_BUTTON_SIZE = (width - 60) / 2;
const NAV_BUTTON_SIZE = (width - 40 - 36) / 4;

export default function HomepageScreen() {
  const router = useRouter();
  const qrRef = useRef<any>(null);

  const handleScanIn = () => {
    router.push('/(tabs)/scanin/ScanInPage');
  }

  const handleScanOut = () => {
    router.push('/(tabs)/scanout/ScanOutPage');
  }

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      if (Number(Platform.Version) >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const connectGranted = result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED;
        const scanGranted = result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED;
        const locationGranted = result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED;

        if (!connectGranted || !scanGranted || !locationGranted) {
          Alert.alert("Permissions Required", "Bluetooth and Location permissions are required.");
          return false;
        }
        return true;
      } else {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  const mockQrData = "VISITOR-123456789";

  const handleTestPrint = async () => {
    try {
      const hasPermission = await requestBluetoothPermissions();
      if (!hasPermission) return;

      if (!qrRef.current) {
        Alert.alert("Error", "QR Generator not ready");
        return;
      }

      await BLEPrinter.init();
      const devices = await BLEPrinter.getDeviceList();

      if (!devices || devices.length === 0) {
        Alert.alert("ไม่พบเครื่องพิมพ์", "กรุณาเปิดบลูทูธและเชื่อมต่อเครื่องพิมพ์ก่อนครับ");
        return;
      }

      const printer = devices[0];
      await BLEPrinter.connectPrinter(printer.inner_mac_address);

      const toThaiCP874 = (str: string) => {
        if (!str) return '';
        let result = '';
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          if (code >= 0x0e01 && code <= 0x0e5b) {
            result += String.fromCharCode(code - 0x0e00 + 0xa0);
          } else {
            result += str[i];
          }
        }
        return result;
      };

      const now = new Date();
      const formattedDate = now.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' น.';

      const SET_THAI_CP = '\x1b\x74\xff';

      // 1. Generate QR Base64 then Print
      qrRef.current.toDataURL(async (dataURL: string) => {
        try {
          // --- ส่วนหัว ---
          let header = SET_THAI_CP;
          header += "<C><B>บัตรเยี่ยมชม</B></C>\n";
          header += "<C>" + formattedDate + "</C>\n";
          header += "<C>--------------------------------</C>\n";
          header += "ผู้มาติดต่อ: นายทดสอบ ระบบ\n";
          header += "ทะเบียนรถ:  1กข 9999 กทม."; // **ลบ \n ออกเพื่อให้ QR ชิดขึ้น**

          await BLEPrinter.printBill(toThaiCP874(header), { encoding: 'latin1' });

          // --- ส่วนรูปภาพ QR Code ---
          // ปรับขนาดลงเหลือ 180 เพื่อลดขอบขาว (Margin) ในตัวรูปภาพเอง
          await BLEPrinter.printImageBase64(dataURL, {
            imageWidth: 250,
            imageHeight: 250,
            paddingX: 85 // ปรับ padding ให้รูปอยู่กึ่งกลาง (สำหรับกระดาษ 58mm)
          });

          // --- ส่วนท้าย ---
          // ไม่ต้องมี \n นำหน้า เพราะการพิมพ์ภาพเสร็จจะขึ้นบรรทัดใหม่ให้อัตโนมัติอยู่แล้ว
          let footer = "--------------------------------";
          footer += "\n"; // เว้นระยะท้ายสุดเพื่อให้ฉีกกระดาษพ้นใบมีด

          await BLEPrinter.printBill(toThaiCP874(footer), { encoding: 'latin1' });

          Alert.alert("สำเร็จ", `เชื่อมต่อ ${printer.device_name} เรียบร้อยแล้ว`);
        } catch (err: any) {
          Alert.alert("Print Error", err.message);
        }
      });

    } catch (error: any) {
      console.error("Test Print Error:", error);
      Alert.alert("พิมพ์ไม่สำเร็จ", error.message || "ไม่สามารถเชื่อมต่อเครื่องพิมพ์ได้");
    }
  }

  return (
    <MainLayout title='SmartVisitor'>
      {/* Hidden QR Generator */}
      <View style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        <QRCode
          value={mockQrData}
          size={200}
          getRef={(ref) => (qrRef.current = ref)}
        />
      </View>

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

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <CustomButton
          label='ทดสอบพิมพ์ (Bluetooth)'
          onPress={handleTestPrint}
          variant="outline"
          style={{ width: '100%', height: 50 }}
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