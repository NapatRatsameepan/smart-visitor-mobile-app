import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MainLayout from '../../components/MainLayout';
import { Ionicons } from '@expo/vector-icons';

const DepartmentScreen = () => {
    const router = useRouter();

    // ข้อมูลตัวอย่างสำหรับแสดงในตาราง
    const departments = [
        { id: 1, name: 'ฝ่ายขาย' },
        { id: 2, name: 'ฝ่ายซ่อมบำรุง' },
    ];

    return (
        <MainLayout title="จัดการแผนก">
            <View style={styles.container}>
                {/* แถวบน: ปุ่มย้อนกลับและช่องค้นหา */}
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <View style={styles.searchBox}>
                        <Text style={styles.searchText}>ค้นหาที่นี่</Text>
                    </View>
                </View>

                {/* ส่วนหัวของตาราง */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCol, { width: 40 }]}>#</Text>
                    <Text style={[styles.headerCol, { flex: 1 }]}>แผนก</Text>
                    <Text style={[styles.headerCol, { width: 60, textAlign: 'right' }]}>เพิ่มเติม</Text>
                </View>

                {/* รายการแผนกในตาราง */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {departments.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={{ width: 40, color: '#333' }}>{item.id}</Text>
                            <Text style={{ flex: 1, color: '#333' }}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/DepartmentDetailScreen')}
                                style={{ width: 60, alignItems: 'flex-end' }}
                            >
                                <Ionicons name="document-text-outline" size={22} color="#1A2433" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>


            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15
    },
    backBtn: { flexDirection: 'row', alignItems: 'center' },
    backText: { fontSize: 18, fontWeight: 'bold', color: '#1A2433' },
    searchBox: {
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        minWidth: 100
    },
    searchText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#1A2433',
        padding: 12,
        borderRadius: 4
    },
    headerCol: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    tableRow: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center'
    },
    versionText: {
        textAlign: 'center',
        color: '#ccc',
        fontSize: 10,
        paddingVertical: 20
    }
});

export default DepartmentScreen;