import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { View, Text } from 'react-native';
import { globalColors } from '../../globalStyles';

const NewJob = (): JSX.Element => {
  return (
    <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export { NewJob };