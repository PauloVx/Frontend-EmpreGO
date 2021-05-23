import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './BottomTabNavigator';
import { CustomDrawer } from '../components/Drawer/CustomDrawer';
import { Header } from '../components/Header/Header';
import { View } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';

  const RightDrawerNavigator = () => {
    const RightDrawer = createDrawerNavigator()
  
    return (
        <RightDrawer.Navigator drawerPosition="right" drawerContent={(props) => <View {...props} />} screenOptions={{ headerShown: true, header: (props) => Header(props) }} >
            <RightDrawer.Screen name="Início" component={BottomTabNavigator}></RightDrawer.Screen>
        </RightDrawer.Navigator>
    )
  }
  

const InsideStackNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerPosition="left" drawerContent={(props) => <CustomDrawer {...props} /> } >
            <Drawer.Screen name="RightDrawer" component={RightDrawerNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export { InsideStackNavigator };