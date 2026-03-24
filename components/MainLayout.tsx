import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children?: React.ReactNode;
    title: string; // 1. เพิ่มให้ Layout รับค่า title ได้
}

// 2. รับค่า title เข้ามาในฟังก์ชัน
const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* 3. ส่งค่า title ต่อไปให้ Header */}
                <Header title={title} />

                <View style={styles.content}>
                    {children}
                </View>

                <Footer />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // สีพื้นหลังของ SafeArea
        // สำหรับ Android บางรุ่น SafeAreaView อาจไม่ทำงานเอง ต้องช่วยดัน PaddingTop นิดนึง
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    wrapper: {
        flex: 1, // ให้หุ้มเนื้อหาทั้งหมดข้างใน
    },
    content: {
        flex: 1,
        width: '100%',
    },
});

export default MainLayout;