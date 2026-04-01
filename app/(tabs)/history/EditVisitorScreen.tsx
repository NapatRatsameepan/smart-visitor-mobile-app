import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import CustomInput from '@/components/CustomInput';
import CustomDropdown from '@/components/CustomDropDown';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';
import TopBar from '@/components/TopBar';
import CustomButton from '@/components/CustomButton';

const EditVisitorScreen = () => {
    const router = useRouter();

    const [prefix, setPrefix] = useState('นาย');
    const [firstName, setFirstName] = useState('สมชาย');
    const [lastName, setLastName] = useState('ใจดี');
    const [idCard, setIdCard] = useState('1-2345-67890-12-3');
    const [address, setAddress] = useState('111');
    const [phone, setPhone] = useState('081-234-5678');
    const [carBrand, setCarBrand] = useState('toyota');
    const [carColor, setCarColor] = useState('ดำ');
    const [licensePlate, setLicensePlate] = useState('1กข1234');
    const [province, setProvince] = useState('กรุงเทพมหานคร');
    const [department, setDepartment] = useState('ฝ่ายขาย');
    const [purpose, setPurpose] = useState('ขายของ');

    const handleSave = () => {
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        router.back();
    };

    return (
        <MainLayout title="ประวัติ">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TopBar title="แก้ไขข้อมูลผู้เยี่ยมชม" />

                <View style={styles.formContent}>
                    <Text style={styles.subHeader}>18/08/2568 16:30 น.  ผู้เข้า : สมชาย ใจดี</Text>

                    <View style={styles.imagePlaceholder} />

                    <CustomDropdown
                        label="คำนำหน้า"
                        data={[{ label: 'นาย', value: 'นาย' }, { label: 'นาง', value: 'นาง' }, { label: 'นางสาว', value: 'นางสาว' }]}
                        value={prefix}
                        placeholder="เลือกคำนำหน้า"
                        onChange={(item) => setPrefix(item.value)}
                        style={styles.field}
                    />
                    <CustomInput label="ชื่อ" value={firstName} onChangeText={setFirstName} placeholder="กรอกชื่อ" style={styles.field} />
                    <CustomInput label="นามสกุล" value={lastName} onChangeText={setLastName} placeholder="กรอกนามสกุล" style={styles.field} />
                    <CustomInput label="เลขประจำตัวประชาชน" value={idCard} onChangeText={setIdCard} placeholder="กรอกเลขประจำตัวประชาชน" style={styles.field} />
                    <CustomInput label="ที่อยู่" value={address} onChangeText={setAddress} placeholder="กรอกที่อยู่" style={styles.field} />
                    <CustomInput label="เบอร์ติดต่อ" value={phone} onChangeText={setPhone} placeholder="กรอกเบอร์ติดต่อ" style={styles.field} />

                    <View style={styles.imagePlaceholder} />

                    <CustomDropdown
                        label="ยี่ห้อรถ"
                        data={[{ label: 'toyota', value: 'toyota' }, { label: 'honda', value: 'honda' }]}
                        value={carBrand}
                        placeholder="เลือกยี่ห้อรถ"
                        onChange={(item) => setCarBrand(item.value)}
                        style={styles.field}
                    />
                    <CustomDropdown
                        label="สีรถ"
                        data={[{ label: 'ดำ', value: 'ดำ' }, { label: 'ขาว', value: 'ขาว' }]}
                        value={carColor}
                        placeholder="เลือกสีรถ"
                        onChange={(item) => setCarColor(item.value)}
                        style={styles.field}
                    />
                    <CustomInput label="ทะเบียน" value={licensePlate} onChangeText={setLicensePlate} placeholder="กรอกทะเบียน" style={styles.field} />
                    <CustomDropdown
                        label="จังหวัด"
                        data={[{ label: 'กรุงเทพมหานคร', value: 'กรุงเทพมหานคร' }]}
                        value={province}
                        placeholder="เลือกจังหวัด"
                        onChange={(item) => setProvince(item.value)}
                        style={styles.field}
                    />
                    <CustomDropdown
                        label="แผนกที่ติดต่อ"
                        data={[{ label: 'ฝ่ายขาย', value: 'ฝ่ายขาย' }]}
                        value={department}
                        placeholder="เลือกแผนก"
                        onChange={(item) => setDepartment(item.value)}
                        style={styles.field}
                    />
                    <CustomDropdown
                        label="ภารกิจเยี่ยมชม"
                        data={[{ label: 'ขายของ', value: 'ขายของ' }]}
                        value={purpose}
                        placeholder="เลือกภารกิจ"
                        onChange={(item) => setPurpose(item.value)}
                        style={styles.field}
                    />
                </View>

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
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    formContent: { width: '100%' },
    subHeader: { color: COLORS.greyFont, fontSize: 13, textAlign: 'center', marginBottom: 15, fontFamily: Typography.regular },
    imagePlaceholder: { width: '100%', height: 150, backgroundColor: COLORS.grey, borderRadius: 4, marginBottom: 20 },

    field: { marginBottom: 15 },

    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20
    },
});

export default EditVisitorScreen;