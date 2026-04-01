import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
// นำเข้า Pagination ที่แยกเป็น Component ไว้
import Pagination from '../../../components/Pagination';

const HistoryScreen = () => {
    const router = useRouter();

    // 1. สร้าง State สำหรับจัดการหน้าปัจจุบัน
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;
    const itemsPerPage = 10;

    // 2. สร้างข้อมูลจำลอง (Mock Data) ที่คำนวณตาม currentPage
    // เมื่อค่า currentPage เปลี่ยน ข้อมูลชื่อผู้ติดต่อ (visitor) จะเปลี่ยนตามทันที
    const DATA = Array(itemsPerPage).fill(null).map((_, index) => {
        const globalIndex = ((currentPage - 1) * itemsPerPage) + (index + 1);
        return {
            id: globalIndex.toString(),
            time: '16:30 น.',
            visitor: `นายสมชาย ใจดี (คนที่ ${globalIndex})`,
            department: 'ฝ่ายขาย',
            status: globalIndex % 2 === 0 ? 'เรียบร้อย' : '',
        };
    });

    // 3. ฟังก์ชันสำหรับวาดแต่ละแถวของตาราง (Render Row)
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={[styles.row, index % 2 === 1 ? styles.rowOdd : styles.rowEven]}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.time}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.visitor}</Text>
            <Text style={[styles.cell, { flex: 1.5 }]}>{item.department}</Text>
            <Text style={[styles.cell, { flex: 1.5, color: '#4CAF50' }]}>
                {item.status}
            </Text>

            {/* ปุ่มไอคอนสำหรับดูรายละเอียดเพิ่มเติม */}
            <TouchableOpacity
                style={styles.actionCell}
                onPress={() => router.push('/(tabs)/history/VisitorDetailScreen')}
            >
                <Image
                    source={require('../../../assets/Desk_alt.png')}
                    style={styles.viewIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <MainLayout title="ประวัติ">
            <View style={styles.container}>
                {/* ส่วนการจัดการด้านบน (ปุ่มย้อนกลับ และ ตัวกรองวันที่) */}
                <View style={styles.topActions}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>

                    <View style={styles.filterRow}>
                        <View style={styles.dateBox}>
                            <Text style={styles.filterText}>18/08/2568 📅</Text>
                        </View>
                        <View style={styles.dropdownBox}>
                            <Text style={styles.filterText}>ทั้งหมด</Text>
                            <Text style={styles.arrow}>⌄</Text>
                        </View>
                    </View>
                </View>

                {/* ส่วนหัวของตาราง (Table Header) */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, { flex: 1 }]}>เวลา ⇅</Text>
                    <Text style={[styles.headerCell, { flex: 2 }]}>ผู้ติดต่อ ⇅</Text>
                    <Text style={[styles.headerCell, { flex: 1.5 }]}>แผนก ⇅</Text>
                    <Text style={[styles.headerCell, { flex: 1.5 }]}>เช็คออก</Text>
                    <Text style={[styles.headerCell, { flex: 0.8 }]}>เพิ่มเติม</Text>
                </View>

                {/* รายการข้อมูลในรูปแบบรายการ (FlatList) */}
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                />

                {/* ส่วนควบคุมการเปลี่ยนหน้า (Pagination) */}
                <Pagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 },
    topActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    backBtn: { flexDirection: 'row', alignItems: 'center', paddingRight: 20 },
    backText: { fontSize: 18, fontWeight: 'bold', color: '#1A2433' },
    filterRow: { flexDirection: 'row' },
    dateBox: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    dropdownBox: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
    },
    filterText: { fontSize: 14, color: '#333' },
    arrow: { fontSize: 14, color: '#333' },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#1A2433',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    headerCell: { color: '#fff', fontSize: 12, textAlign: 'center', fontWeight: '600' },
    row: { flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 5, alignItems: 'center' },
    rowEven: { backgroundColor: '#fff' },
    rowOdd: { backgroundColor: '#F5F5F5' },
    cell: { fontSize: 11, color: '#333', textAlign: 'center' },
    actionCell: { flex: 0.8, alignItems: 'center' },
    viewIcon: { width: 18, height: 18 },
});

export default HistoryScreen;