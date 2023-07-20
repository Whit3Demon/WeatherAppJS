import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/screens/navigation/AppNavigator';


export default function App() {
  const AppContainer = createAppContainer(AppNavigator);
  return (
    <NavigationContainer>
      <AppContainer/>
      </NavigationContainer>

  )
}
