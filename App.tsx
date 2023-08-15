import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer } from "react-navigation";
import { Platform, StatusBar } from "react-native";
import AppNavigator from "./src/screens/navigation/AppNavigator";

export default function App() {
  //StatusBar.setBarStyle("dark-content");
  const AppContainer = createAppContainer(AppNavigator);
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <AppContainer />
    </NavigationContainer>
  );
}
