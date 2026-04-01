import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';
import CustomInfoField from '@/components/CustomInfoField';
import CustomButton from '@/components/CustomButton';
import TopBar from '@/components/TopBar';

const VisitorDetailScreen = () => {
    const router = useRouter();

    return (
        <MainLayout title="ประวัติ">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TopBar 
                    rightElement={
                        <TouchableOpacity onPress={() => router.push('/(tabs)/history/EditVisitorScreen')}>
                            <Text style={styles.editText}>แก้ไข</Text>
                        </TouchableOpacity>
                    }
                />

                <View style={styles.infoContent}>
                    <Text style={styles.subHeader}>18/08/2568 16:30 น.  ผู้เข้า : สมชาย ใจดี</Text>

                    {/* ส่วนรูปภาพผู้เยี่ยมชม */}
                    <View style={styles.imagePlaceholder} />

                    <CustomInfoField label="คำนำหน้า" value="นาย" />
                    <CustomInfoField label="ชื่อ" value="สมชาย" />
                    <CustomInfoField label="นามสกุล" value="ใจดี" />
                    <CustomInfoField label="เลขประจำตัวประชาชน" value="1-2345-67890-12-3" />
                    <CustomInfoField label="ที่อยู่" value="111" />
                    <CustomInfoField label="เบอร์ติดต่อ" value="081-234-5678" />

                    {/* ส่วนรูปภาพรถ */}
                    <View style={styles.imagePlaceholder} />

                    <CustomInfoField label="ยี่ห้อรถ" value="toyota" />
                    <CustomInfoField label="สีรถ" value="ดำ" />
                    <CustomInfoField label="ทะเบียน" value="1กข1234" />
                    <CustomInfoField label="จังหวัด" value="กรุงเทพมหานคร" />
                    <CustomInfoField label="แผนกที่ติดต่อ" value="ฝ่ายขาย" />
                    <CustomInfoField label="ภารกิจเยี่ยมชม" value="ขายของ" />
                </View>

                {/* ปุ่มด้านล่าง */}
                <View style={styles.footerButtons}>
                    <CustomButton
                        label="ย้อนกลับ"
                        onPress={() => router.back()}
                        variant="outline"
                        style={{ width: '45%' }}
                        textStyle={{ color: COLORS.main }}
                    />

                    <CustomButton
                        label="ปริ้นใบเยี่ยมชม"
                        onPress={() => router.back()}
                        variant="green"
                        style={{ width: '50%' }}
                    />
                </View>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    editText: { fontSize: 16, color: COLORS.red, fontFamily: Typography.bold },

    infoContent: { width: '100%' },
    subHeader: {
        color: COLORS.greyFont,
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: Typography.regular
    },
    imagePlaceholder: {
        width: '100%',
        height: 150,
        backgroundColor: COLORS.grey,
        borderRadius: 8,
        marginBottom: 20
    },

    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20
    },
});


export default VisitorDetailScreen;