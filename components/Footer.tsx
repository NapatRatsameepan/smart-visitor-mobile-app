import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        backgroundColor: '#fff',
    },
    versionText: {
        fontSize: 10,
        color: '#A0A0A0',
    },
});

export default Footer;