import CustomButton from '@/components/CustomButton';
import MainLayout from '@/components/MainLayout';
import SubHeader from '@/components/SubHeader';
import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { useRealTimeClock } from '@/hooks/useRealTimeClock';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

export default function ScanOutPage() {
  const router = useRouter();
  const currentTime = useRealTimeClock();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <MainLayout title={currentTime}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      </MainLayout>
    );
  }

  if (!permission.granted) {
    return (
      <MainLayout title={currentTime}>
        <View style={styles.center}>
          <Text style={styles.text}>ต้องการสิทธิ์การใช้งานกล้อง</Text>
          <CustomButton label="ขอสิทธิ์การใช้งาน" onPress={requestPermission} style={{ width: 200, marginTop: 10 }} />
        </View>
      </MainLayout>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    
    Alert.alert(
      "สแกนสำเร็จ",
      `ข้อมูล: ${data}`,
      [{ text: "ตกลง", onPress: () => setScanned(false) }]
    );
  };

  return (
    <MainLayout title={currentTime}>
      {/* Sub Header - Only Back Button */}
      <SubHeader onBack={() => router.back()} />

      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />

        {/* QR Skeleton Overlay */}
        <View style={styles.overlayContainer} pointerEvents="none">
          <Text style={styles.skeletonText}>วาง QR Code ให้ตรงกรอบห้ามมีอะไรบดบัง</Text>
          <View style={styles.qrFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Typography.bold,
    fontSize: 16,
    color: COLORS.white,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFrame: {
    width: '70%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  skeletonText: {
    color: COLORS.white,
    fontFamily: Typography.regular,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: COLORS.white,
    borderTopLeftRadius: 24,
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: COLORS.white,
    borderTopRightRadius: 24,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: COLORS.white,
    borderBottomLeftRadius: 24,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: COLORS.white,
    borderBottomRightRadius: 24,
  },
});