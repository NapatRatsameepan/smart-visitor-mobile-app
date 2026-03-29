import CustomButton from '@/components/CustomButton';
import MainLayout from '@/components/MainLayout';
import VehicleInfoSection from '@/components/review/VehicleInfoSection';
import VisitDetailsSection from '@/components/review/VisitDetailsSection';
import VisitorInfoSection from '@/components/review/VisitorInfoSection';
import { COLORS } from '@/constants/colors';
import { useRealTimeClock } from '@/hooks/useRealTimeClock';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Review() {

  const currentTime = useRealTimeClock();
  const router = useRouter();

  return (
    <MainLayout title={currentTime}>
      <ScrollView>
        <View style={styles.container}>
          <VisitorInfoSection />
          <VehicleInfoSection />
          <VisitDetailsSection />
          <View style={styles.buttonContainer}>
            <CustomButton
              label='ย้อนกลับ'
              onPress={() => router.back()}
              variant='outline'
              style={{ flex: 1, borderColor: COLORS.main }}
              textStyle={{ color: COLORS.main }}
            />
            <CustomButton
              label='บันทึก'
              onPress={() => { }}
              variant='green'
              style={{ flex: 2 }}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  }
})