import CustomButton from '@/components/CustomButton';
import MainLayout from '@/components/MainLayout';
import SubHeader from '@/components/SubHeader';
import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { useCameraWorkflow } from '@/hooks/useCameraWorkflow';
import { useRealTimeClock } from '@/hooks/useRealTimeClock';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanInPage() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const currentTime = useRealTimeClock();

  const {
    step,
    idImage,
    carImage,
    isPreview,
    isLoading,
    stepName,
    progressWidth,
    handleTakePhoto,
    handleOK,
    handleBottomLeftAction,
    handleBack,
  } = useCameraWorkflow({
    cameraRef,
    onComplete: (data) => {
      router.push({
        pathname: '/(tabs)/scanin/Review',
        params: { data: JSON.stringify(data) }
      });
    },
    onExit: () => router.back(),
  });

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

  return (
    <MainLayout title={currentTime}>
      {/* Sub Header */}
      <SubHeader
        onBack={handleBack}
        title={stepName}
        showProgress={true}
        progressWidth={progressWidth}
      />

      <View style={styles.container}>
        {/* Camera or Preview View */}
        {!isPreview ? (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
          />
        ) : (
          <View style={StyleSheet.absoluteFill}>
            <Image
              source={{ uri: step === 2 ? idImage : carImage }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            {isLoading && (
              <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
                <ActivityIndicator size="large" color={COLORS.white} />
                <Text style={styles.loadingText}>กำลังประมวลผล OCR...</Text>
              </View>
            )}
          </View>
        )}


        {/* ID Skeleton Overlay (Only Step 1) */}
        {step === 1 && (
          <View style={styles.overlayContainer} pointerEvents="none">
            <Text style={styles.skeletonText}>วางบัตรประชาชนให้ตรงกรอบห้ามมีอะไรบดบัง</Text>
            <View style={styles.skeletonFrame}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
          </View>
        )}

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <CustomButton
            label={isPreview ? "อีกครั้ง" : "ข้าม"}
            onPress={handleBottomLeftAction}
            variant="outline"
            style={styles.sideButton}
          />

          {isPreview ? (
            <CustomButton
              label="ตกลง"
              onPress={handleOK}
              variant="green"
              style={styles.okButton}
            />
          ) : (
            <TouchableOpacity
              onPress={handleTakePhoto}
              activeOpacity={0.8}
              style={styles.captureButtonOuter}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          )}
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
    padding: 20,
  },
  text: {
    fontFamily: Typography.regular,
    fontSize: 16,
    color: COLORS.main,
    textAlign: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonFrame: {
    width: '85%',
    aspectRatio: 1.58,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
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
    borderTopLeftRadius: 12,
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
    borderTopRightRadius: 12,
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
    borderBottomLeftRadius: 12,
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
    borderBottomRightRadius: 12,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButton: {
    position: 'absolute',
    left: 30,
    minWidth: 80,
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  okButton: {
    width: 150,
  },
});