import React from 'react'

import { StatusBar, StyleSheet, View, Text } from 'react-native';

import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { globalColors } from '../../globalStyles';

const Header = (props: any) => {

    function openLeftDrawer() {
        props.scene.descriptor.navigation.dangerouslyGetParent().openDrawer();
    }

    function openRightDrawer() {
        props.scene.descriptor.navigation.openDrawer();
    }

    return (
        <View style={styles.header}>

          <TouchableOpacity>
            <View>
              <Entypo onPress={ openLeftDrawer } name="menu" size={30} color={globalColors.startGradientColor} />
            </View>
          </TouchableOpacity>

          <Text style={styles.headerText}>EmpreGÔ</Text>

          <TouchableOpacity>
            <View>
              <Entypo onPress={ openRightDrawer } name="magnifying-glass" size={28} color={globalColors.startGradientColor} />
            </View>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '9%',
        backgroundColor: '#FFF',
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
    
        alignItems: 'center',
        paddingHorizontal: 15
    },
    headerText: {
        color: globalColors.startGradientColor,
        fontWeight: 'bold'
    }
})

export { Header };