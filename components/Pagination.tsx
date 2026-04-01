import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';

interface PaginationProps {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ current, total, onPageChange }: PaginationProps) => {
    return (
        <View style={styles.container}>
            {/* ปุ่มก่อนหน้า */}
            <TouchableOpacity
                style={[styles.button, current <= 1 && styles.disabled]}
                disabled={current <= 1} // ล็อคปุ่มไม่ให้กดได้ถ้าอยู่หน้า 1 หรือน้อยกว่า
                onPress={() => {
                    if (current > 1) {
                        onPageChange(current - 1);
                    }
                }}
            >
                <Text style={styles.buttonText}>ก่อนหน้า</Text>
            </TouchableOpacity>

            {/* แสดงเลขหน้า (เช็คไม่ให้แสดงค่าติดลบ) */}
            <Text style={styles.info}>
                หน้า {current < 1 ? 1 : current} / {total}
            </Text>

            {/* ปุ่มถัดไป */}
            <TouchableOpacity
                style={[styles.button, current >= total && styles.disabled]}
                disabled={current >= total} // ล็อคปุ่มไม่ให้กดได้ถ้าถึงหน้าสุดท้ายแล้ว
                onPress={() => {
                    if (current < total) {
                        onPageChange(current + 1);
                    }
                }}
            >
                <Text style={styles.buttonText}>ถัดไป</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#EEE',
        backgroundColor: '#fff' // เพิ่มพื้นหลังสีขาวเพื่อให้เห็นชัดเจน
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: COLORS.main,
        borderRadius: 6
    },
    disabled: {
        backgroundColor: COLORS.grey
    },
    buttonText: {
        color: '#FFF',
        fontFamily: Typography.bold,
    },
    info: {
        fontSize: 14,
        color: '#666',
        fontFamily: Typography.regular,
    }
});

export default Pagination;