import { COLORS } from '@/constants/colors';
import { Typography } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.versionText}>
                v 0.0.1 - ME Group Enterprise Co., Ltd. 2025
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    versionText: {
        fontSize: 10,
        color: COLORS.main,
        fontFamily: Typography.regular,
    },
});

export default Footer;