import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        backgroundColor: COLORS.white,
        shadowColor: COLORS.main,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    leftContainer: {
        width: 80,
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
        fontFamily: Typography.bold,
        color: COLORS.main,
        textAlign: 'center',
    },
    rightContainer: {
        width: 80,
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
    },
    profileCircle: {
        width: 35,
        height: 35,
        backgroundColor: COLORS.grey,
        borderRadius: 17.5,
    },
});

export default Header;