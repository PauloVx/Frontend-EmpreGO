import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { globalColors } from "../../globalStyles";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const NewJobPart2 = (): JSX.Element => {
    return (
      <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Localização</Text>
        </View>

        <View>

        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#f00',
    borderWidth: 1
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },

  btnContainer: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '85%',
    borderRadius: 100,
    backgroundColor: '#FFF',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: globalColors.endGradientColor,
    fontWeight: 'bold'
  }
})

export { NewJobPart2 };