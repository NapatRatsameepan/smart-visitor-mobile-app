import {
  NotoSansThai_400Regular,
  NotoSansThai_700Bold
} from '@expo-google-fonts/noto-sans-thai';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {

  const [loaded, error] = useFonts({
    'NotoSansThai-Regular': NotoSansThai_400Regular,
    'NotoSansThai-Bold': NotoSansThai_700Bold,
  });

  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}