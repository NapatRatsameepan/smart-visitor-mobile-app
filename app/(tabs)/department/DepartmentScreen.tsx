import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Pagination from '../../../components/Pagination';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';

const DepartmentScreen = () => {
    const router = useRouter();

    // ส่วนจัดการหน้าและคำค้นหา
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // State สำหรับเก็บคำค้นหา
    const itemsPerPage = 10;

    // 1. ข้อมูลจำลองทั้งหมด (Mock Data) เพื่อให้ค้นหาได้ครอบคลุม
    const allDepartments = useMemo(() => {
        return Array(50).fill(null).map((_, index) => {
            const id = index + 1;
            let name = `แผนกที่ ${id}`;
            if (id === 1) name = 'ฝ่ายขาย';
            if (id === 2) name = 'ฝ่ายซ่อมบำรุง';
            if (id === 3) name = 'ฝ่ายบัญชี';
            if (id === 4) name = 'ฝ่ายบุคคล';
            return { id, name };
        });
    }, []);

    // 2. Logic การค้นหา (Filtering) รองรับทั้งไทยและอังกฤษ
    const filteredDepartments = useMemo(() => {
        return allDepartments.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allDepartments]);

    // 3. คำนวณ Pagination จากข้อมูลที่กรองแล้ว
    const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage) || 1;
    const displayData = filteredDepartments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.tableRow}>
            <Text style={{ width: 40, color: '#333', fontFamily: Typography.regular }}>{item.id}</Text>
            <Text style={{ flex: 1, color: '#333', fontFamily: Typography.regular }}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => router.push('/(tabs)/department/DepartmentDetailScreen')}
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
        <MainLayout title="จัดการแผนก">
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>

                    {/* เปลี่ยนเป็น TextInput เพื่อให้พิมพ์ค้นหาได้จริง */}
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="ค้นหาที่นี่"
                            placeholderTextColor="#ccc"
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                setCurrentPage(1); // เมื่อค้นหาให้กลับไปเริ่มที่หน้า 1
                            }}
                        />
                    </View>
                </View>

                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCol, { width: 40 }]}>#</Text>
                    <Text style={[styles.headerCol, { flex: 1 }]}>แผนก</Text>
                    <Text style={[styles.headerCol, { width: 60, textAlign: 'center' }]}>ดู</Text>
                </View>

                <FlatList
                    data={displayData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, color: '#999', fontFamily: Typography.regular }}>ไม่พบข้อมูลแผนก</Text>
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
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    backBtn: { flexDirection: 'row', alignItems: 'center' },
    backText: { fontSize: 18, fontFamily: Typography.bold, color: COLORS.main },
    searchBox: {
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        borderRadius: 6,
        minWidth: 120,
        height: 35,
        justifyContent: 'center'
    },
    searchInput: {
        color: '#333',
        fontSize: 12,
        padding: 0,
        fontFamily: Typography.regular
    },
    tableHeader: { flexDirection: 'row', backgroundColor: COLORS.main, padding: 12, borderRadius: 4 },
    headerCol: { color: '#fff', fontFamily: Typography.bold, fontSize: 12 },
    tableRow: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
    versionText: { textAlign: 'center', color: '#ccc', fontSize: 10, paddingVertical: 20, fontFamily: Typography.regular }
});

export default DepartmentScreen;


