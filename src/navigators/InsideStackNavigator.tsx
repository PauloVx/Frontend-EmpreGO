import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './BottomTabNavigator';
import { CustomDrawer } from '../components/Drawer/CustomDrawer';

const InsideStackNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} /> }>
            <Drawer.Screen name="Início" component={BottomTabNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export { InsideStackNavigator };