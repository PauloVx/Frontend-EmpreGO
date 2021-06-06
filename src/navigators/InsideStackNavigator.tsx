import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './BottomTabNavigator';
import { LeftDrawer } from '../components/Drawer/LeftDrawer';
import { DefaultHeader } from '../Headers/DefaultHeader/Header';
import { RightDrawer } from '../components/Drawer/RightDrawer';
import { NewJob } from '../components/NewJob/NewJob';
import { NamedHeader } from '../Headers/NamedHeader/NamedHeader';

  const RightDrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
  
    return (
        <Drawer.Navigator drawerPosition="right" drawerContent={(props) => <RightDrawer {...props} />} screenOptions={{ headerShown: true, header: (props) => DefaultHeader(props) }} >
            <Drawer.Screen name="Início" component={BottomTabNavigator}></Drawer.Screen>
            <Drawer.Screen name="NewJob" component={NewJob} options={{ header: (props) => NamedHeader(props, "Novo Trabalho") }}></Drawer.Screen>
        </Drawer.Navigator>
    )
  }
  

const InsideStackNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerPosition="left" drawerContent={(props) => <LeftDrawer {...props} /> } >
            <Drawer.Screen name="RightDrawer" component={RightDrawerNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export { InsideStackNavigator };