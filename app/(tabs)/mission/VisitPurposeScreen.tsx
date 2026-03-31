import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Pagination from '../../../components/Pagination';

const VisitPurposeScreen = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;
    const itemsPerPage = 10;

    const purposes = Array(itemsPerPage).fill(null).map((_, index) => {
        const globalIndex = ((currentPage - 1) * itemsPerPage) + (index + 1);
        return {
            id: globalIndex,
            name: globalIndex === 1 ? 'วางบิล' : globalIndex === 2 ? 'เสนอราคา' : `ภารกิจที่ ${globalIndex}`
        };
    });

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.tableRow}>
            <Text style={{ width: 40, color: '#333' }}>{item.id}</Text>
            <Text style={{ flex: 1, color: '#333' }}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => router.push('/(tabs)/mission/EditVisitPurposeScreen')}
                style={{ width: 60, alignItems: 'flex-end' }}
            >
                <Ionicons name="document-text-outline" size={22} color="#1A2433" />
            </TouchableOpacity>
        </View>
    );

    return (
        <MainLayout title="จัดการภารกิจเยี่ยมชม">
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
                    <Text style={[styles.headerCol, { flex: 1 }]}>ภารกิจเยี่ยมชม</Text>
                    <Text style={[styles.headerCol, { width: 60, textAlign: 'right' }]}>เพิ่มเติม</Text>
                </View>

                <FlatList
                    data={purposes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />

                <Pagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />

                <Text style={styles.versionText}>v 0.0.1 - ME Group Enterprise Co., Ltd. 2025</Text>
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
    searchText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#1A2433', padding: 12, borderRadius: 4 },
    headerCol: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    tableRow: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
    versionText: { textAlign: 'center', color: '#ccc', fontSize: 10, paddingVertical: 20 }
});

export default VisitPurposeScreen;