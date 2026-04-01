import CustomButton from '@/components/CustomButton';
import MainLayout from '@/components/MainLayout';
import VehicleInfoSection from '@/components/review/VehicleInfoSection';
import VisitDetailsSection from '@/components/review/VisitDetailsSection';
import VisitorInfoSection from '@/components/review/VisitorInfoSection';
import QrCodeSlipModal from '@/components/QrCodeSlipModal';
import { COLORS } from '@/constants/colors';
import { useRealTimeClock } from '@/hooks/useRealTimeClock';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { apiService } from '@/services/api';

export default function Review() {
  const currentTime = useRealTimeClock();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrToken, setQrToken] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [missions, setMissions] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    visitor: {
      prefix: '',
      firstName: '',
      lastName: '',
      personalId: '',
      address: '',
      phone: '',
      idCardImageUrl: ''
    },
    vehicle: {
      carId: '',
      colorId: '',
      licensePlate: '',
      provinceId: '',
      vehicleImageUrl: ''
    },
    visit: {
      departmentId: '',
      missionId: ''
    }
  });

  const [localIdUri, setLocalIdUri] = useState('');
  const [localCarUri, setLocalCarUri] = useState('');

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [p, b, c, m, d] = await Promise.all([
          apiService.master.getProvinces(),
          apiService.master.getCarBrands(),
          apiService.master.getCarColors(),
          apiService.master.getMissions(),
          apiService.master.getDepartments(),
        ]);
        setProvinces(p.map(x => ({ label: x.nameTh, value: x.id })));
        setCarBrands(b.map(x => ({ label: x.name, value: x.id })));
        setCarColors(c.map(x => ({ label: x.nameTh, value: x.id })));
        setMissions(m.map(x => ({ label: x.name, value: x.id })));
        setDepartments(d.map(x => ({ label: x.name, value: x.id })));
      } catch (e) {
        console.error("Failed to fetch master data", e);
      }
    };
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (params.data) {
      try {
        const parsed = JSON.parse(params.data as string);
        setFormData(prev => ({
          ...prev,
          visitor: { 
            ...parsed.visitor, 
            idCardImageUrl: parsed.idCloudinaryUrl || '' 
          },
          vehicle: { 
            ...parsed.vehicle, 
            vehicleImageUrl: parsed.carCloudinaryUrl || '' 
          }
        }));
        
        setLocalIdUri(parsed.idImage || '');
        setLocalCarUri(parsed.carImage || '');
      } catch (e) {
        console.error("Failed to parse initial data", e);
      }
    }
  }, [params.data]);

  const handleUpdateVisitor = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      visitor: { ...prev.visitor, [field]: value }
    }));
  };

  const handleUpdateVehicle = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      vehicle: { ...prev.vehicle, [field]: value }
    }));
  };

  const handleUpdateVisit = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      visit: { ...prev.visit, [field]: value }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        visitor: formData.visitor,
        visitData: {
          ...formData.vehicle,
          ...formData.visit,
        }
      };

      const result = await apiService.visits.checkIn(payload);
      setQrToken(result.qrCodeToken);
      setModalVisible(true);
    } catch (error: any) {
      Alert.alert("เกิดข้อผิดพลาด", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setModalVisible(false);
    router.replace('/(tabs)');
  };

  return (
    <MainLayout title={currentTime}>
      <ScrollView>
        <View style={styles.container}>
          <VisitorInfoSection 
            data={formData.visitor} 
            onChange={handleUpdateVisitor} 
            imageUri={localIdUri || formData.visitor.idCardImageUrl}
          />
          <VehicleInfoSection 
            data={formData.vehicle} 
            onChange={handleUpdateVehicle}
            imageUri={localCarUri || formData.vehicle.vehicleImageUrl}
            provinces={provinces}
            carBrands={carBrands}
            carColors={carColors}
          />
          <VisitDetailsSection 
            data={formData.visit} 
            onChange={handleUpdateVisit}
            missions={missions}
            departments={departments}
          />
          
          <View style={styles.buttonContainer}>
            <CustomButton
              label='ย้อนกลับ'
              onPress={() => router.back()}
              variant='outline'
              style={{ flex: 1, borderColor: COLORS.main }}
              textStyle={{ color: COLORS.main }}
            />
            <CustomButton
              label={loading ? 'กำลังบันทึก...' : 'บันทึก'}
              onPress={handleSave}
              variant='green'
              style={{ flex: 2 }}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>

      <QrCodeSlipModal 
        visible={modalVisible}
        qrToken={qrToken}
        visitorName={`${formData.visitor.firstName} ${formData.visitor.lastName}`}
        licensePlate={formData.vehicle.licensePlate}
        onClose={handleFinish}
      />
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      )}
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
    marginBottom: 40,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
