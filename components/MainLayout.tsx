import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
    children?: React.ReactNode;
    title: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
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
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        width: '100%',
    },
});

export default MainLayout;