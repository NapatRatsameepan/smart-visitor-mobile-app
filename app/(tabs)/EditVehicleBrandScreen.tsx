import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import MainLayout from '../../components/MainLayout';

const EditVehicleBrandScreen = () => {
    const router = useRouter();

    return (
        <MainLayout title="จัดการยี่ห้อรถ">
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerActionText}>แก้ไขข้อมูลยี่ห้อรถ</Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ยี่ห้อรถ</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue="Toyota"
                    />
                </View>

                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                        <Text style={styles.cancelBtnText}>ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
                        <Text style={styles.saveBtnText}>บันทึก</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    backBtn: { flexDirection: 'row', alignItems: 'center' },
    backText: { fontSize: 18, fontWeight: 'bold', color: '#1A2433' },
    headerActionText: { fontSize: 16, fontWeight: 'bold', color: '#1A2433' },
    inputGroup: { marginTop: 20 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, color: '#333' },
    footerButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', marginBottom: 30 },
    cancelBtn: { borderWidth: 1, borderColor: '#1A2433', paddingVertical: 15, borderRadius: 12, width: '45%', alignItems: 'center' },
    cancelBtnText: { color: '#1A2433', fontWeight: 'bold' },
    saveBtn: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 12, width: '50%', alignItems: 'center' },
    saveBtnText: { color: '#fff', fontWeight: 'bold' },
    footer: { marginBottom: 10 },
    versionText: { textAlign: 'center', color: '#ccc', fontSize: 10 }
});

export default EditVehicleBrandScreen;