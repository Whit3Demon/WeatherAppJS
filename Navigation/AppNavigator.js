import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Screen1 from '../Onboarding/ Screen1';
import Screen2 from '../Onboarding/ Screen2';
import Screen3 from '../Onboarding/ Screen3';
import BottomTab from './BottomTab';

export default AppNavigator = createStackNavigator(
  
  {
    Screen1: { screen: Screen1 },
    Screen2: { screen: Screen2 },
    Screen3: { screen: Screen3 },
    BottomTab: { screen: 
      BottomTab 
    }
  },
  {
    initialRouteName: 'Screen1',
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

