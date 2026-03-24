import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // สำหรับไอคอนลูกศร Dropdown
import MainLayout from '../../components/MainLayout';

const EditVisitorScreen = () => {
    const router = useRouter();

    // ส่วนสำหรับสร้าง Input ปกติ
    const EditField = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                defaultValue={value}
                placeholder={`กรอก${label}`}
            />
        </View>
    );

    // ส่วนสำหรับสร้าง Dropdown (จำลองดีไซน์)
    const DropdownField = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText}>{value}</Text>
                <Ionicons name="chevron-down" size={20} color="#1A2433" />
            </TouchableOpacity>
        </View>
    );

    const handleSave = () => {
        // ใส่ Logic การบันทึกข้อมูลที่นี่
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        router.back(); // บันทึกเสร็จแล้วย้อนกลับไปหน้า VisitorDetail
    };

    return (
        <MainLayout title="ประวัติ">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* ส่วนหัวหน้าแก้ไข */}
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitleAction}>แก้ไขข้อมูลผู้เยี่ยมชม</Text>
                </View>

                <View style={styles.formContent}>
                    <Text style={styles.subHeader}>18/08/2568 16:30 น.  ผู้เข้า : สมชาย ใจดี</Text>

                    <View style={styles.imagePlaceholder} />

                    <DropdownField label="คำนำหน้า" value="นาย" />
                    <EditField label="ชื่อ" value="สมชาย" />
                    <EditField label="นามสกุล" value="ใจดี" />
                    <EditField label="เลขประจำตัวประชาชน" value="1-2345-67890-12-3" />
                    <EditField label="ที่อยู่" value="111" />
                    <EditField label="เบอร์ติดต่อ" value="081-234-5678" />

                    <View style={styles.imagePlaceholder} />

                    <DropdownField label="ยี่ห้อรถ" value="toyota" />
                    <DropdownField label="สีรถ" value="ดำ" />
                    <EditField label="ทะเบียน" value="1กข1234" />
                    <DropdownField label="จังหวัด" value="กรุงเทพมหานคร" />
                    <DropdownField label="แผนกที่ติดต่อ" value="ฝ่ายขาย" />
                    <DropdownField label="ภารกิจเยี่ยมชม" value="ขายของ" />
                </View>

                {/* ปุ่มบันทึกและย้อนกลับด้านล่าง */}
                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                        <Text style={styles.cancelBtnText}>ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveBtnText}>บันทึก</Text>
                    </TouchableOpacity>
                </View>

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
    headerTitleAction: { fontSize: 16, fontWeight: 'bold', color: '#1A2433' },

    formContent: { width: '100%' },
    subHeader: { color: '#999', fontSize: 13, textAlign: 'center', marginBottom: 15 },
    imagePlaceholder: { width: '100%', height: 150, backgroundColor: '#D9D9D9', borderRadius: 4, marginBottom: 20 },

    inputGroup: { marginBottom: 15 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 12,
        borderRadius: 8,
        color: '#333',
        fontSize: 14
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    inputText: { color: '#333', fontSize: 14 },

    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20
    },
    cancelBtn: {
        borderWidth: 1,
        borderColor: '#1A2433',
        paddingVertical: 12,
        borderRadius: 12,
        width: '45%',
        alignItems: 'center'
    },
    cancelBtnText: { color: '#1A2433', fontWeight: 'bold' },
    saveBtn: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center'
    },
    saveBtnText: { color: '#fff', fontWeight: 'bold' },

    versionText: { textAlign: 'center', fontSize: 10, color: '#CCC', marginBottom: 30 }
});

export default EditVisitorScreen;