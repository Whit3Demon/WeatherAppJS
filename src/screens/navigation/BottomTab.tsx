import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import ChatView from "../ChatView";
import WeatherView from "../WeatherView";

const Tab = createBottomTabNavigator();

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Погода"
        component={WeatherView}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'cloudy' : 'cloudy-outline'}
              size={24}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Чат"
        component={ChatView}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={24}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
