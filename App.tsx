import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './src/components/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { Cadastro } from './src/components/Cadastro/Cadastro';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { OutsideStackNavigator } from './src/navigators/OutsideStackNavigator';
import { InsideStackNavigator } from './src/navigators/InsideStackNavigator';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <OutsideStackNavigator />
    </NavigationContainer>
  )
}