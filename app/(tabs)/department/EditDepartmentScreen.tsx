import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';
import TopBar from '@/components/TopBar';

const EditDepartmentScreen = () => {
    const router = useRouter();
    const [name, setName] = useState("ฝ่ายขาย");

    const handleSave = () => {
        router.back();
    };

    return (
        <MainLayout title="จัดการแผนก">
            <View style={styles.container}>
                <TopBar title="แก้ไขข้อมูลแผนก" />

                {/* ฟิลด์สำหรับแก้ไขข้อมูล */}
                <CustomInput
                    label="ชื่อแผนก"
                    value={name}
                    onChangeText={setName}
                    placeholder="กรอกชื่อแผนก"
                    style={styles.inputGroup}
                />

                {/* ปุ่มกดย้อนกลับ และ บันทึก ด้านล่าง */}
                <View style={styles.footerButtons}>
                    <CustomButton
                        label="ย้อนกลับ"
                        onPress={() => router.back()}
                        variant="outline"
                        style={{ width: '45%' }}
                        textStyle={{ color: COLORS.main }}
                    />
                    <CustomButton
                        label="บันทึก"
                        onPress={handleSave}
                        variant="green"
                        style={{ width: '50%' }}
                    />
                </View>

            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    inputGroup: { marginTop: 20 },
    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
        marginBottom: 30
    },
});

export default EditDepartmentScreen;