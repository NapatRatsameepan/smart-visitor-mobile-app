import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';

const VisitorDetailScreen = () => {
    const router = useRouter();

    // ฟังก์ชันช่วยสร้างแถวข้อมูลแบบอ่านอย่างเดียว
    const InfoField = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.readOnlyInput}>
                <Text style={styles.inputText}>{value}</Text>
            </View>
        </View>
    );

    return (
        <MainLayout title="ประวัติ">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* แถวบนสุด: ย้อนกลับ และ แก้ไข */}
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/history/EditVisitorScreen')}>
                        <Text style={styles.editText}>แก้ไข</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContent}>
                    <Text style={styles.subHeader}>18/08/2568 16:30 น.  ผู้เข้า : สมชาย ใจดี</Text>

                    {/* ส่วนรูปภาพผู้เยี่ยมชม */}
                    <View style={styles.imagePlaceholder} />

                    <InfoField label="คำนำหน้า" value="นาย" />
                    <InfoField label="ชื่อ" value="สมชาย" />
                    <InfoField label="นามสกุล" value="ใจดี" />
                    <InfoField label="เลขประจำตัวประชาชน" value="1-2345-67890-12-3" />
                    <InfoField label="ที่อยู่" value="111" />
                    <InfoField label="เบอร์ติดต่อ" value="081-234-5678" />

                    {/* ส่วนรูปภาพรถ */}
                    <View style={styles.imagePlaceholder} />

                    <InfoField label="ยี่ห้อรถ" value="toyota" />
                    <InfoField label="สีรถ" value="ดำ" />
                    <InfoField label="ทะเบียน" value="1กข1234" />
                    <InfoField label="จังหวัด" value="กรุงเทพมหานคร" />
                    <InfoField label="แผนกที่ติดต่อ" value="ฝ่ายขาย" />
                    <InfoField label="ภารกิจเยี่ยมชม" value="ขายของ" />
                </View>

                {/* ปุ่มด้านล่าง */}
                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
                        <Text style={styles.closeBtnText}>ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.printBtn}>
                        <Text style={styles.printBtnText}>ปริ้นใบเยี่ยมชม</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer ข้อความเล็กๆ ด้านล่างสุด */}
                <Text style={styles.versionText}>v 0.0.1 - ME Group Enterprise Co., Ltd. 2025</Text>
            </ScrollView>
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
    editText: { fontSize: 16, color: 'red', fontWeight: 'bold' },

    infoContent: { width: '100%' },
    subHeader: {
        color: '#999',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15
    },
    imagePlaceholder: {
        width: '100%',
        height: 150,
        backgroundColor: '#D9D9D9',
        borderRadius: 4,
        marginBottom: 20
    },

    inputGroup: { marginBottom: 15 },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8
    },
    readOnlyInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    inputText: { color: '#666', fontSize: 14 },

    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20
    },
    closeBtn: {
        borderWidth: 1,
        borderColor: '#1A2433',
        paddingVertical: 12,
        borderRadius: 12,
        width: '45%',
        alignItems: 'center'
    },
    closeBtnText: { color: '#1A2433', fontWeight: 'bold' },
    printBtn: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center'
    },
    printBtnText: { color: '#fff', fontWeight: 'bold' },

    versionText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#CCC',
        marginBottom: 30
    }
});

export default VisitorDetailScreen;