import React, { useRef, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import CustomButton from './CustomButton';
import CustomDivider from './CustomDivider';
import QRCode from 'react-native-qrcode-svg';
import { BLEPrinter } from 'react-native-thermal-receipt-printer-image-qr';

interface Props {
  visible: boolean;
  qrToken: string;
  visitorName: string;
  licensePlate: string;
  onClose: () => void;
}

// สีน้ำเงินเข้มตามรูปตัวอย่าง
const NAVY_DARK = '#0a1c3e';

export default function QrCodeSlipModal({ visible, qrToken, visitorName, licensePlate, onClose }: Props) {
  const qrRef = useRef<any>(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  // จัดการเรื่องวันที่และเวลาให้เป็นแบบไทย (พ.ศ.)
  useEffect(() => {
    if (visible) {
      const updateTime = () => {
        const now = new Date();
        const formatted = now.toLocaleDateString('th-TH', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' น.';
        setCurrentDateTime(formatted);
      };
      updateTime();
    }
  }, [visible]);

  const handlePrint = async () => {
    try {
      await BLEPrinter.init();
      const devices = await BLEPrinter.getDeviceList();
      if (!devices || devices.length === 0) {
        Alert.alert("ไม่พบเครื่องพิมพ์", "กรุณาเปิดบลูทูธและเชื่อมต่อเครื่องพิมพ์ก่อนครับ");
        return;
      }

      const printer = devices[0];
      await BLEPrinter.connectPrinter(printer.inner_mac_address);

      if (qrRef.current && qrToken) {
        qrRef.current.toDataURL(async (dataURL: string) => {
          try {
            const thai = { encoding: 'GBK' }; // สำหรับพิมพ์ภาษาไทย

            // --- ส่วนการสั่งพิมพ์ (Print Logic) ---
            BLEPrinter.printText("<C><B>บัตรเยี่ยมชม</B></C>\n", thai);
            BLEPrinter.printText("<C>" + currentDateTime + "</C>\n", thai);
            BLEPrinter.printText("<C>--------------------------------</C>\n", {});

            BLEPrinter.printText("ผู้มาติดต่อ: " + visitorName + "\n", thai);
            BLEPrinter.printText("ทะเบียนรถ:  " + licensePlate + "\n", thai);
            BLEPrinter.printText("\n", {});

            BLEPrinter.printImageBase64(dataURL, {
              imageWidth: 200,
              imageHeight: 200,
              paddingX: 50
            });

            BLEPrinter.printText("\n", {});
            BLEPrinter.printText("<C>--------------------------------</C>\n", {});
            BLEPrinter.printText("<C><B>ขอบคุณที่ใช้บริการ</B></C>\n", thai);
            BLEPrinter.printText("\n\n\n", {}); // ฟีดกระดาษ

            Alert.alert("สำเร็จ", "กำลังพิมพ์บัตรเยี่ยมชม...");
          } catch (err) {
            console.error(err);
          }
        });
      }
    } catch (error: any) {
      Alert.alert("พิมพ์ไม่สำเร็จ", error.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>

          {/* Header ตามรูปตัวอย่าง */}
          <Text style={styles.headerTitle}>บัตรเยี่ยมชม</Text>
          <Text style={styles.headerTime}>{currentDateTime}</Text>

          <View style={styles.divider} />

          {/* ข้อมูลผู้มาติดต่อ */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ผู้มาติดต่อ: </Text>
            <Text style={styles.infoValue}>{visitorName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ทะเบียนรถ: </Text>
            <Text style={styles.infoValue}>{licensePlate}</Text>
          </View>

          {/* QR Code Section */}
          <View style={styles.qrWrapper}>
            {qrToken ? (
              <QRCode
                value={qrToken}
                size={180}
                color={NAVY_DARK}
                backgroundColor="white"
                getRef={(ref) => (qrRef.current = ref)}
              />
            ) : (
              <View style={styles.qrPlaceholder}>
                <Text style={{ color: COLORS.grey }}>QR Code ไม่พร้อมใช้งาน</Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.footerText}>ขอบคุณที่ใช้บริการ</Text>

          {/* ปุ่มกด */}
          <View style={styles.buttonGroup}>
            <CustomButton
              label="พิมพ์บัตร"
              onPress={handlePrint}
              variant="outline"
              style={{ flex: 1 }}
            />
            <CustomButton
              label="เสร็จสิ้น"
              onPress={onClose}
              variant="green"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: Typography.bold,
    color: NAVY_DARK,
  },
  headerTime: {
    fontSize: 16,
    fontFamily: Typography.regular,
    color: NAVY_DARK,
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Typography.regular,
    color: NAVY_DARK,
  },
  infoValue: {
    fontSize: 18,
    fontFamily: Typography.bold,
    color: NAVY_DARK,
  },
  qrWrapper: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginVertical: 15,
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    fontFamily: Typography.bold,
    color: NAVY_DARK,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  }
});