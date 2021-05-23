import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { globalColors } from '../../globalStyles';
import { AppStorage } from '../../utils/Storage';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

import { Entypo, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

//REMOVER
export function Dashboard() {
  const navigation = useNavigation();

  const [trabalharSelected, setTrabalharSelected] = useState(true);
  const [colorTrabalhar, setColorTrabalhar] = useState(globalColors.btnTextColorSelected);

  const [empregarSelected, setEmpregarSelected] = useState(false);
  const [colorEmpregar, setColorEmpregar] = useState('#555');

  function handleTrabalharClick() {
    setTrabalharSelected(true);
    setEmpregarSelected(false);

    setColorTrabalhar(globalColors.btnTextColorSelected);
    setColorEmpregar('#555');
  }

  function handleEmpregarClick() {
    setTrabalharSelected(false);
    setEmpregarSelected(true);

    setColorEmpregar(globalColors.btnTextColorSelected);
    setColorTrabalhar('#555');
  }

  async function logout() {
    await AppStorage.deleteData("token_jwt");
    navigation.navigate('Login');
  }

  return (
    <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
      <View style={ styles.contentContainer }>

      </View>
    </LinearGradient>
  )
}