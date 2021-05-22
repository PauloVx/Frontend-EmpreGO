import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Cadastro } from '../components/Cadastro/Cadastro';
import { Login } from '../components/Login/Login';
import { InsideStackNavigator } from './InsideStackNavigator';

const OutsideStackNavigator = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro}></Stack.Screen>
        <Stack.Screen name="Logado" component={InsideStackNavigator}></Stack.Screen>
      </Stack.Navigator>
    )
}

export { OutsideStackNavigator };