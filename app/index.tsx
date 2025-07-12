import { StyleSheet, Text, View } from "react-native";

import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "../src/navigation/AppNavigator";
import { TimerProvider } from "../src/context/TimerContext";
import * as Notifications from "expo-notifications";

export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <TimerProvider>
      {/* <NavigationContainer> */}
      <AppNavigator />
      {/* </NavigationContainer> */}
    </TimerProvider>
  );
}
