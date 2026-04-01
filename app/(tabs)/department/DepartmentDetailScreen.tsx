import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';
import CustomInfoField from '@/components/CustomInfoField';
import TopBar from '@/components/TopBar';

const DepartmentDetailScreen = () => {
    const router = useRouter();

    return (
        <MainLayout title="จัดการแผนก">
            <View style={styles.container}>
                <TopBar 
                    rightElement={
                        <TouchableOpacity onPress={() => router.push('/(tabs)/department/EditDepartmentScreen')}>
                            <Text style={styles.editText}>แก้ไข</Text>
                        </TouchableOpacity>
                    }
                />

                {/* ฟิลด์ข้อมูลแบบอ่านอย่างเดียว */}
                <CustomInfoField label="ชื่อแผนก" value="ฝ่ายขาย" style={{ marginTop: 20 }} />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    editText: { fontSize: 16, color: COLORS.red, fontFamily: Typography.bold },
});

export default DepartmentDetailScreen;