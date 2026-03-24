import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MainLayout from '../../components/MainLayout';

const VisitPurposeDetailScreen = () => {
    const router = useRouter();

    return (
        <MainLayout title="จัดการภารกิจเยี่ยมชม">
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>‹ ย้อนกลับ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/EditVisitPurposeScreen')}>
                        <Text style={styles.editText}>แก้ไข</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ภารกิจเยี่ยมชม</Text>
                    <View style={styles.readOnlyInput}>
                        <Text style={styles.inputText}>วางบิล</Text>
                    </View>
                </View>


            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    backBtn: { flexDirection: 'row', alignItems: 'center' },
    backText: { fontSize: 18, fontWeight: 'bold', color: '#1A2433' },
    editText: { fontSize: 16, color: 'red', fontWeight: 'bold' },
    inputGroup: { marginTop: 20 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    readOnlyInput: { borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8, backgroundColor: '#fff' },
    inputText: { color: '#666', fontSize: 14 },
    footer: { position: 'absolute', bottom: 20, left: 0, right: 0 },
    versionText: { textAlign: 'center', color: '#ccc', fontSize: 10 }
});

export default VisitPurposeDetailScreen;