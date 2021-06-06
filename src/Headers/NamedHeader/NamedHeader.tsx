import React from 'react';
import { Text, StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { Ionicons } from '@expo/vector-icons';
import { globalColors } from '../../globalStyles';
import { useNavigation } from '@react-navigation/core';

const NamedHeader = (props: DrawerHeaderProps, name: string) => {

  function navigateBack() {
    props.scene.descriptor.navigation.goBack();
  }

  return (
    <View style={styles.header}>

      <TouchableOpacity>
        <View>
          <Ionicons name="arrow-back" size={22} color={ globalColors.startGradientColor } onPress={navigateBack }/>
        </View>
      </TouchableOpacity>

      <View style={ styles.textContainer }>
        <Text style={ styles.text }>{ name }</Text>
      </View>
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

  textContainer: {
    width: '85%',
    justifyContent: 'flex-start'
  },
  text: {
    fontWeight: 'bold',
    color: globalColors.startGradientColor
  }
});

export { NamedHeader };