import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import TopBar from '@/components/TopBar';

const VehicleBrandDetailScreen = () => {
    const router = useRouter();

    return (
        <MainLayout title="จัดการยี่ห้อรถ">
            <View style={styles.container}>
                <TopBar 
                    rightElement={
                        <TouchableOpacity onPress={() => router.push('/(tabs)/vehicle/EditVehicleBrandScreen')}>
                            <Text style={styles.editText}>แก้ไข</Text>
                        </TouchableOpacity>
                    }
                />

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ยี่ห้อรถ</Text>
                    <View style={styles.readOnlyInput}>
                        <Text style={styles.inputText}>Toyota</Text>
                    </View>
                </View>


            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    editText: { fontSize: 16, color: COLORS.red, fontFamily: Typography.bold },
    inputGroup: { marginTop: 20 },
    label: { fontSize: 14, fontFamily: Typography.bold, color: COLORS.main, marginBottom: 10 },
    readOnlyInput: { borderWidth: 1, borderColor: COLORS.border, padding: 12, borderRadius: 8, backgroundColor: COLORS.white },
    inputText: { color: COLORS.main, fontSize: 14, fontFamily: Typography.regular },
    footer: { position: 'absolute', bottom: 20, left: 0, right: 0 },
    versionText: { textAlign: 'center', color: COLORS.greyFont, fontSize: 10, fontFamily: Typography.regular }
});

export default VehicleBrandDetailScreen;