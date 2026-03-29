import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';

const VehicleBrandScreen = () => {
    const router = useRouter();

    const brands = [
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
    ];

    return (
        <MainLayout title="จัดการยี่ห้อรถ">
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <View style={styles.searchBox}>
                        <Text style={styles.searchText}>ค้นหาที่นี่</Text>
                    </View>
                </View>

                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCol, { width: 40 }]}>#</Text>
                    <Text style={[styles.headerCol, { flex: 1 }]}>ยี่ห้อรถ</Text>
                    <Text style={[styles.headerCol, { width: 60, textAlign: 'right' }]}>เพิ่มเติม</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {brands.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={{ width: 40, color: '#333' }}>{item.id}</Text>
                            <Text style={{ flex: 1, color: '#333' }}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/vehicle/VehicleBrandDetailScreen')}
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
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    backBtn: { flexDirection: 'row', alignItems: 'center' },
    backText: { fontSize: 18, fontWeight: 'bold', color: '#1A2433' },
    searchBox: { borderWidth: 1, borderColor: '#eee', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, minWidth: 100 },
    searchText: { color: '#ccc', fontSize: 12 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#1A2433', padding: 12, borderRadius: 4 },
    headerCol: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    tableRow: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
    footer: { paddingVertical: 20 },
    versionText: { textAlign: 'center', color: '#ccc', fontSize: 10 }
});

export default VehicleBrandScreen;