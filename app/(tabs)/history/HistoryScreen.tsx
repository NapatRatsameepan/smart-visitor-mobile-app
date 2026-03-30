import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';

// ข้อมูลจำลองตามดีไซน์
const DATA = Array(15).fill({
    time: '16:30 น.',
    visitor: 'นายสมชาย ใจดี',
    department: 'ฝ่ายขาย',
    status: 'เรียบร้อย',
});

const HistoryScreen = () => {
    const router = useRouter();

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={[styles.row, index % 2 === 1 ? styles.rowOdd : styles.rowEven]}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.time}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.visitor}</Text>
            <Text style={[styles.cell, { flex: 1.5 }]}>{item.department}</Text>
            <Text style={[styles.cell, { flex: 1.5, color: '#4CAF50' }]}>
                {item.status ? item.status : ''}
            </Text>

            <TouchableOpacity
                style={styles.actionCell}
                // เมื่อกดที่ไอคอนสมุดโน้ต ให้ไปหน้าแก้ไข
                onPress={() => router.push('/(tabs)/history/VisitorDetailScreen')}
            >
                <Image
                    // ใช้ Path ตามที่คุณวางไฟล์ไว้ใน assets/
                    source={require('../../../assets/Desk_alt.png')}
                    style={styles.viewIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <MainLayout title="HistoryScreen">
            <View style={styles.container}>
                {/* ส่วน Header ของเนื้อหา */}
                <View style={styles.topActions}>
                    {/* แก้ไขจุดนี้: ใส่ onPress ให้กับปุ่มย้อนกลับ */}
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

                {/* หัวตาราง */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, { flex: 1 }]}>เวลา ⇅</Text>
                    <Text style={[styles.headerCell, { flex: 2 }]}>ผู้ติดต่อ ⇅</Text>
                    <Text style={[styles.headerCell, { flex: 1.5 }]}>แผนก ⇅</Text>
                    <Text style={[styles.headerCell, { flex: 1.5 }]}>เช็คออก</Text>
                    <Text style={[styles.headerCell, { flex: 0.8 }]}>เพิ่มเติม</Text>
                </View>

                {/* รายการประวัติ */}
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

                {/* Pagination จำลองด้านล่าง */}
                <View style={styles.pagination}>
                    <Text style={styles.pageText}>Start</Text>
                    <View style={styles.activePage}><Text style={styles.activePageText}>1</Text></View>
                    <Text style={styles.pageText}>2  3  ...  5</Text>
                    <Text style={styles.pageText}>End</Text>
                </View>
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
    backBtn: { flexDirection: 'row', alignItems: 'center', paddingRight: 20 }, // เพิ่ม padding เพื่อให้กดง่ายขึ้น
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
    viewIcon: {
        width: 18,
        height: 18,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    pageText: { marginHorizontal: 10, color: '#999', fontSize: 14 },
    activePage: {
        backgroundColor: '#1A2433',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activePageText: { color: '#fff', fontSize: 12 },
});

export default HistoryScreen;