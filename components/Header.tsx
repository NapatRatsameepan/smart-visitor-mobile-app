import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Platform } from 'react-native';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View style={styles.header}>
            {/* 1. ฝั่งซ้าย: โลโก้ */}
            <View style={styles.leftContainer}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* 2. ส่วนกลาง: ชื่อหน้าจอ (ขยับมาอยู่กึ่งกลางหน้าจอพอดี) */}
            <View style={styles.centerContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {/* 3. ฝั่งขวา: ไอคอนโลก และ โปรไฟล์ */}
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Image
                        source={require('../assets/world_2.png')}
                        style={styles.worldIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                {/* รูปโปรไฟล์วงกลมสีเทา */}
                <View style={styles.profileCircle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        // จัดการระยะห่างด้านบนสำหรับ Android
        marginTop: Platform.OS === 'android' ? 30 : 0,
    },
    leftContainer: {
        width: 80, // กำหนดความกว้างให้เท่ากับฝั่งขวา เพื่อให้ส่วนกลางอยู่กลางจริงๆ
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 35,
        height: 35,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A2433',
        textAlign: 'center',
    },
    rightContainer: {
        width: 80, // ต้องเท่ากับ leftContainer เพื่อความสมดุล
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconButton: {
        padding: 5,
        marginRight: 10,
    },
    worldIcon: {
        width: 22,
        height: 22,
        tintColor: '#1A2433',
    },
    profileCircle: {
        width: 35,
        height: 35,
        backgroundColor: '#D9D9D9',
        borderRadius: 17.5,
    },
});

export default Header;