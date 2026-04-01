import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Pagination from '../../../components/Pagination';
import TopBar from '../../../components/TopBar';

const VisitPurposeScreen = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // State สำหรับเก็บคำค้นหา
    const itemsPerPage = 10;

    // 1. สร้างข้อมูลจำลองทั้งหมด (Mock Data)
    const allPurposes = useMemo(() => {
        return Array(50).fill(null).map((_, index) => {
            const id = index + 1;
            let name = `ภารกิจที่ ${id}`;
            if (id === 1) name = 'วางบิล';
            if (id === 2) name = 'เสนอราคา';
            if (id === 3) name = 'ซ่อมบำรุง';
            if (id === 4) name = 'ส่งของ';
            return { id, name };
        });
    }, []);

    // 2. Logic การค้นหา (Filtering) รองรับไทย-อังกฤษ
    const filteredPurposes = useMemo(() => {
        return allPurposes.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allPurposes]);

    // 3. คำนวณ Pagination จากข้อมูลที่ถูกกรองแล้ว
    const totalPages = Math.ceil(filteredPurposes.length / itemsPerPage) || 1;
    const displayData = filteredPurposes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.tableRow}>
            <Text style={{ width: 40, color: COLORS.main, fontFamily: Typography.regular }}>{item.id}</Text>
            <Text style={{ flex: 1, color: COLORS.main, fontFamily: Typography.regular }}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => router.push('/(tabs)/mission/VisitPurposeDetailScreen')}
                style={{ width: 60, alignItems: 'center' }}
            >
                <Image
                    source={require('../../../assets/Desk_alt.png')}
                    style={{ width: 22, height: 22 }}
                    resizeMode="contain"
                    tintColor={COLORS.main}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <MainLayout title="จัดการภารกิจเยี่ยมชม">
            <View style={styles.container}>
                <TopBar
                    rightElement={
                        <View style={styles.searchBox}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="ค้นหาที่นี่"
                                placeholderTextColor={COLORS.greyFont}
                                value={searchQuery}
                                onChangeText={(text) => {
                                    setSearchQuery(text);
                                    setCurrentPage(1); // เมื่อค้นหาให้กลับไปเริ่มหน้า 1 ใหม่
                                }}
                            />
                        </View>
                    }
                />

                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCol, { width: 40 }]}>#</Text>
                    <Text style={[styles.headerCol, { flex: 1 }]}>ภารกิจเยี่ยมชม</Text>
                    <Text style={[styles.headerCol, { width: 60, textAlign: 'center' }]}>ดู</Text>
                </View>

                <FlatList
                    data={displayData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, color: COLORS.greyFont, fontFamily: Typography.regular }}>ไม่พบข้อมูลภารกิจ</Text>
                    }
                />

                <Pagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    searchBox: {
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        borderRadius: 8,
        minWidth: 150,
        height: 40,
        justifyContent: 'center',
        backgroundColor: COLORS.white
    },
    searchInput: {
        color: COLORS.main,
        fontSize: 14,
        padding: 0,
        fontFamily: Typography.regular
    },
    tableHeader: { flexDirection: 'row', backgroundColor: COLORS.main, padding: 12, borderRadius: 8 },
    headerCol: { color: COLORS.white, fontFamily: Typography.bold, fontSize: 14 },
    tableRow: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.border, alignItems: 'center' },
    versionText: { textAlign: 'center', color: COLORS.greyFont, fontSize: 10, paddingVertical: 20, fontFamily: Typography.regular }
});

export default VisitPurposeScreen;