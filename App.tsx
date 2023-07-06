import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import BottomTab from './Navigation/BottomTab';
import AppNavigator from './Navigation/AppNavigator';

export default function App() {
  const AppContainer = createAppContainer(AppNavigator);

  //const [isOnboarding, setOnboarding] = useState(true);

  return (
    //(isOnboarding) ?
    <NavigationContainer>
      <AppContainer/>
      </NavigationContainer>
      //:
      // <NavigationContainer>
      //   <BottomTab/>
      // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
