import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Empregar } from '../components/Dashboard/Empregar/Empregar';
import { Trabalhar } from '../components/Dashboard/Trabalhar/Trabalhar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { globalColors } from '../globalStyles';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
    
          switch (route.name) {
            case 'Trabalhar':
              return <FontAwesome5 color={ color } name="user-tie" size={size}/>
            case 'Empregar':
              return <Ionicons color={ color } name="briefcase" size={ size }></Ionicons>
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: globalColors.btnTextColorSelected,
        inactiveTintColor: '#555',
        showLabel: true,
        allowFontScaling: true,
        keyboardHidesTabBar: true
      }}
    >
      <Tab.Screen name="Trabalhar" component={Trabalhar} />
      <Tab.Screen name="Empregar" component={Empregar} />
    </Tab.Navigator>
  );
}

export { BottomTabNavigator };