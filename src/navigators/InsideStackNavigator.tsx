import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './BottomTabNavigator';
import { LeftDrawer } from '../components/Drawer/LeftDrawer';
import { Header } from '../components/Header/Header';
import { RightDrawer } from '../components/Drawer/RightDrawer';

  const RightDrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
  
    return (
        <Drawer.Navigator drawerPosition="right" drawerContent={(props) => <RightDrawer {...props} />} screenOptions={{ headerShown: true, header: (props) => Header(props) }} >
            <Drawer.Screen name="Início" component={BottomTabNavigator}></Drawer.Screen>
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