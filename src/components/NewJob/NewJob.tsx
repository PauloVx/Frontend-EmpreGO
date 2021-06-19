import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Textarea from 'react-native-textarea';
import { globalColors } from '../../globalStyles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const NewJob = (): JSX.Element => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
      <View style={styles.titleContainer}>
        <TextInput
          placeholder="Título"
          style={styles.titleInput}
          placeholderTextColor="#FFF"
          onChangeText={(text: string) => setTitle(text)}
        ></TextInput>
      </View>

      <View style={styles.descriptionContainer}>

          <Textarea
            style={styles.textArea}
            containerStyle={styles.textareaContainer}
            underlineColorAndroid="transparent"
            placeholder="Descrição"
            placeholderTextColor="#FFF"
            numberOfLines={10}
            multiline={true}
            onChangeText={(text: string) => setDescription(text)}
          />

      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('NewJobPart2')}>
          <Text style={styles.btnText}>Próximo</Text>
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
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },

  titleInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: '85%',
    height: '35%',
    paddingLeft: 15,
    borderRadius: 100,
    color: '#FFF'
  },

  descriptionContainer: {
    width: '100%',
    height: '65%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textareaContainer: {
    height: '70%',
    width: '90%',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 30,
  },
  textArea: {
    textAlignVertical: 'top',  // hack android
    height: '100%',
    justifyContent: "flex-start",
    width: '95%',
    paddingLeft: 15,
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

export { NewJob };