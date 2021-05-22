import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './src/components/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { Cadastro } from './src/components/Cadastro/Cadastro';
import { Dashboard } from './src/components/Dashboard/Dashboard';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro}></Stack.Screen>
        <Stack.Screen name="Dashboard" component={BottomTabNavigator}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}