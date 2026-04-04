import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { LogBox } from "react-native";

WebBrowser.maybeCompleteAuthSession();
if (__DEV__) {
  LogBox.ignoreLogs([
    "SafeAreaView has been deprecated and will be removed in a future release",
  ]);
}

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  )
}

