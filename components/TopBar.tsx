import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';

interface TopBarProps {
    title?: string;
    rightElement?: React.ReactNode;
    onBack?: () => void;
}

const TopBar = ({ title, rightElement, onBack }: TopBarProps) => {
    const router = useRouter();
    const handleBack = onBack || (() => router.back());

    return (
        <View style={styles.topRow}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <Text style={styles.backText}>‹ ย้อนกลับ</Text>
            </TouchableOpacity>
            
            <View style={styles.rightContainer}>
                {title && <Text style={styles.titleText}>{title}</Text>}
                {rightElement}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    backBtn: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    backText: { 
        fontSize: 18, 
        fontFamily: Typography.bold, 
        color: COLORS.main 
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleText: { 
        fontSize: 16, 
        fontFamily: Typography.bold, 
        color: COLORS.main 
    },
});

export default TopBar;
