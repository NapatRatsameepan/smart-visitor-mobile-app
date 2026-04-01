import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Pagination from '../../../components/Pagination';
import TopBar from '../../../components/TopBar';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';

const HistoryScreen = () => {
    const router = useRouter();

    // 1. State สำหรับจัดการหน้าและการกรอง
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState(18); // วันที่เลือก (Default เป็น 18)
    const [filterStatus, setFilterStatus] = useState('ทั้งหมด'); // สถานะที่เลือก

    const totalPages = 5;
    const itemsPerPage = 10;

    // ข้อมูลวันที่สำหรับแถบเลือก (Date Strip)
    const days = [14, 15, 16, 17, 18, 19, 20];

    // 2. ข้อมูลจำลอง (Mock Data)
    const ALL_DATA = useMemo(() => {
        return Array(itemsPerPage * totalPages).fill(null).map((_, index) => {
            const id = (index + 1).toString();
            // สุ่มสถานะให้ข้อมูลดูสมจริง
            const statuses = ['เรียบร้อย', 'ยังไม่เช็คออก', 'ยกเลิก'];
            const status = statuses[index % 3];

            return {
                id,
                time: '16:30 น.',
                visitor: `นายสมชาย ใจดี (คนที่ ${id})`,
                department: 'ฝ่ายขาย',
                status: status,
                date: 18 // สมมติว่าเป็นของวันที่ 18 ทั้งหมดเพื่อทดสอบการกรอง
            };
        });
    }, []);

    // 3. Logic การกรองข้อมูล (Filter Logic)
    const filteredData = useMemo(() => {
        let data = ALL_DATA;

        // กรองตามสถานะ
        if (filterStatus !== 'ทั้งหมด') {
            data = data.filter(item => item.status === filterStatus);
        }

        // แบ่งหน้า (Pagination)
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [filterStatus, currentPage, ALL_DATA]);

    // 4. ฟังก์ชันจัดการการกดปุ่มปฏิทิน (ที่วงแดงไว้)
    const handleCalendarPress = () => {
        Alert.alert("เลือกวันที่", "เปิดหน้าต่างปฏิทินเพื่อเลือกวันที่อื่นๆ (ฟีเจอร์นี้จะเชื่อมต่อกับ DatePicker ในอนาคต)");
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={[styles.row, index % 2 === 1 ? styles.rowOdd : styles.rowEven]}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.time}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.visitor}</Text>
            <Text style={[styles.cell, { flex: 1.5 }]}>{item.department}</Text>
            <Text style={[
                styles.cell,
                { flex: 1.5, fontFamily: Typography.bold },
                item.status === 'เรียบร้อย' ? { color: COLORS.green } :
                    item.status === 'ยังไม่เช็คออก' ? { color: '#EF6C00' } : { color: COLORS.red }
            ]}>
                {item.status}
            </Text>

            <TouchableOpacity
                style={styles.actionCell}
                onPress={() => router.push('/(tabs)/history/VisitorDetailScreen')}
            >
                <Image
                    source={require('../../../assets/Desk_alt.png')}
                    style={styles.viewIcon}
                    resizeMode="contain"
                    tintColor={COLORS.main}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <MainLayout title="ประวัติ">
            <View style={styles.container}>
                <TopBar />

                {/* ส่วนเลือกวันที่: เน้นความชัดเจนสำหรับผู้สูงอายุ */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionLabel}>เลือกวันที่ดูประวัติ</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateList}>
                        {days.map((day) => (
                            <TouchableOpacity
                                key={day}
                                style={[styles.dateCard, selectedDate === day && styles.dateCardActive]}
                                onPress={() => {
                                    setSelectedDate(day);
                                    setCurrentPage(1); // รีเซ็ตหน้าเมื่อเปลี่ยนวันที่
                                }}
                            >
                                <Text style={[styles.dateNum, selectedDate === day && styles.whiteText]}>{day}</Text>
                                <Text style={[styles.dateMonth, selectedDate === day && styles.whiteText]}>ส.ค.</Text>
                            </TouchableOpacity>
                        ))}
                        {/* ปุ่มปฏิทินที่วงแดงไว้ในรูป */}
                        <TouchableOpacity style={styles.calendarPickerBtn} onPress={handleCalendarPress}>
                            <Image
                                source={require('../../../assets/Desk_alt.png')} // หรือไอคอนปฏิทินที่มีใน assets
                                style={{ width: 24, height: 24, tintColor: COLORS.main }}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* ส่วนกรองสถานะ: กดแล้วข้อมูลจะเปลี่ยนทันที */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionLabel}>สถานะ</Text>
                    <View style={styles.filterButtonGroup}>
                        {['ทั้งหมด', 'เรียบร้อย', 'ยังไม่เช็คออก'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[styles.statusTab, filterStatus === status && styles.statusTabActive]}
                                onPress={() => {
                                    setFilterStatus(status);
                                    setCurrentPage(1); // รีเซ็ตหน้าเมื่อกรองข้อมูลใหม่
                                }}
                            >
                                <Text style={[styles.statusTabText, filterStatus === status && styles.whiteText]}>{status}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, { flex: 1 }]}>เวลา</Text>
                    <Text style={[styles.headerCell, { flex: 2 }]}>ผู้ติดต่อ</Text>
                    <Text style={[styles.headerCell, { flex: 1.5 }]}>แผนก</Text>
                    <Text style={[styles.headerCell, { flex: 1.5 }]}>สถานะ</Text>
                    <Text style={[styles.headerCell, { flex: 0.8 }]}>ดู</Text>
                </View>

                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.emptyText}>ไม่พบข้อมูลในหมวดที่เลือก</Text>}
                />

                <Pagination
                    current={currentPage}
                    total={Math.ceil(filterStatus === 'ทั้งหมด' ? (totalPages * itemsPerPage) / itemsPerPage : 2)}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    sectionContainer: { marginBottom: 15 },
    sectionLabel: { fontSize: 14, fontFamily: Typography.bold, color: '#444', marginBottom: 10, marginLeft: 5 },
    dateList: { paddingLeft: 5, paddingRight: 15 },
    dateCard: {
        width: 60,
        height: 70,
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 2, // เพิ่มเงาให้ดูมีมิติสำหรับคนแก่
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    dateCardActive: { backgroundColor: COLORS.main, borderColor: COLORS.main },
    dateNum: { fontSize: 22, fontFamily: Typography.bold, color: '#333' },
    dateMonth: { fontSize: 12, color: '#777', fontFamily: Typography.regular },
    calendarPickerBtn: {
        width: 60,
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.main,
        borderStyle: 'dashed',
    },
    filterButtonGroup: { flexDirection: 'row', paddingLeft: 5 },
    statusTab: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#F0F2F5',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#DCDFE3',
    },
    statusTabActive: { backgroundColor: COLORS.main, borderColor: COLORS.main },
    statusTabText: { fontSize: 14, color: '#555', fontFamily: Typography.bold },
    whiteText: { color: '#FFF' },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.main,
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 8,
    },
    headerCell: { color: '#fff', fontSize: 13, textAlign: 'center', fontFamily: Typography.bold },
    row: { flexDirection: 'row', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', alignItems: 'center' },
    rowEven: { backgroundColor: '#fff' },
    rowOdd: { backgroundColor: '#F8F9FA' },
    cell: { fontSize: 12, color: '#333', textAlign: 'center', fontFamily: Typography.regular },
    actionCell: { flex: 0.8, alignItems: 'center' },
    viewIcon: { width: 22, height: 22 },
    emptyText: { textAlign: 'center', marginTop: 20, color: '#999', fontSize: 16, fontFamily: Typography.regular },
});

export default HistoryScreen;

