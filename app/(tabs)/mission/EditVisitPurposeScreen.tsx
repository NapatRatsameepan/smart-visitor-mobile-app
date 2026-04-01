import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import TopBar from '@/components/TopBar';

const EditVisitPurposeScreen = () => {
    const router = useRouter();
    const [purpose, setPurpose] = useState("วางบิล");

    return (
        <MainLayout title="จัดการภารกิจเยี่ยมชม">
            <View style={styles.container}>
                <TopBar title="แก้ไขข้อมูลภารกิจเยี่ยมชม" />

                <View style={styles.inputGroup}>
                    <CustomInput
                        label="ภารกิจเยี่ยมชม"
                        placeholder="กรอกภารกิจเยี่ยมชม"
                        value={purpose}
                        onChangeText={setPurpose}
                    />
                </View>

                <View style={styles.footerButtons}>
                    <CustomButton
                        label="ย้อนกลับ"
                        onPress={() => router.back()}
                        variant="outline"
                        style={styles.cancelBtn}
                        textStyle={{ color: COLORS.main }}
                    />
                    <CustomButton
                        label="บันทึก"
                        onPress={() => router.back()}
                        variant="green"
                        style={styles.saveBtn}
                    />
                </View>


            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    inputGroup: { marginTop: 20 },
    footerButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', marginBottom: 30 },
    cancelBtn: { width: '45%', height: 50, borderRadius: 12 },
    saveBtn: { width: '50%', height: 50, borderRadius: 12 },
    versionText: { textAlign: 'center', color: COLORS.greyFont, fontSize: 10, fontFamily: Typography.regular }
});

export default EditVisitPurposeScreen;