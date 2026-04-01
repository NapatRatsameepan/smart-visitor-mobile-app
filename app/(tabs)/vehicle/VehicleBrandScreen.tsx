import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Pagination from '../../../components/Pagination';
import TopBar from '../../../components/TopBar';
import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';

const VehicleBrandScreen = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // State สำหรับเก็บคำค้นหา
    const itemsPerPage = 10;

    // สร้างข้อมูลจำลองทั้งหมด (Mock Data) เพื่อให้ค้นหาได้จากข้อมูลทั้งหมด
    const allBrands = useMemo(() => {
        return Array(50).fill(null).map((_, index) => {
            const id = index + 1;
            let name = `ยี่ห้อรถที่ ${id}`;
            if (id === 1) name = 'Toyota';
            if (id === 2) name = 'Honda';
            if (id === 3) name = 'Mazda';
            if (id === 4) name = 'Ford';
            return { id, name };
        });
    }, []);

    // ส่วนของ Logic การค้นหา (Filtering)
    const filteredBrands = useMemo(() => {
        return allBrands.filter(brand =>
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allBrands]);

    // คำนวณ Pagination จากข้อมูลที่ถูกกรองแล้ว
    const totalPages = Math.ceil(filteredBrands.length / itemsPerPage) || 1;
    const displayBrands = filteredBrands.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.tableRow}>
            <Text style={{ width: 40, color: COLORS.main, fontFamily: Typography.regular }}>{item.id}</Text>
            <Text style={{ flex: 1, color: COLORS.main, fontFamily: Typography.regular }}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => router.push('/(tabs)/vehicle/VehicleBrandDetailScreen')}
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
        <MainLayout title="จัดการยี่ห้อรถ">
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
                                    setCurrentPage(1); // รีเซ็ตหน้ากลับไปหน้า 1 เมื่อมีการค้นหา
                                }}
                            />
                        </View>
                    }
                />

                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCol, { width: 40 }]}>#</Text>
                    <Text style={[styles.headerCol, { flex: 1 }]}>ยี่ห้อรถ</Text>
                    <Text style={[styles.headerCol, { width: 60, textAlign: 'center' }]}>ดู</Text>
                </View>

                <FlatList
                    data={displayBrands}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, color: COLORS.greyFont, fontFamily: Typography.regular }}>ไม่พบข้อมูลที่ค้นหา</Text>
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

export default VehicleBrandScreen;