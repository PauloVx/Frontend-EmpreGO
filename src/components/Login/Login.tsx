import React, { useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import {LinearGradient} from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { globalColors } from '../../globalStyles';
import { api } from '../../services/api';
import { API_LOGIN_ENDPOINT } from '../../config/config';
import { AxiosError, AxiosResponse } from 'axios';

import { AppStorage } from '../../utils/Storage';
import { AuthResponse } from '../../models/AuthResponse';

import { Snackbar } from 'react-native-paper';

interface LoginData {
  email: string,
  senha: string
}

export function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextToggle, setSecureTextToggle] = useState<boolean>(true);
  const [eyePasswordIcon, setEyePasswordIcon] = useState<any>('eye');

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Erro desconhecido');

  async function login(): Promise<void> {
    if(!email || !password) {
      setErrorMessage('Preencha todos os campos');
      setErrorVisible(true);
      return;
    }

    const loginData: LoginData = {
      email,
      senha: password
    }

    try {
      const responseData: AxiosResponse<any> = await api.post(API_LOGIN_ENDPOINT, loginData);
      const authData: AuthResponse = await responseData.data;
  
      if(authData.auth) {
        await AppStorage.storeData("token_jwt", authData.token);
        navigation.navigate('Logado');
        console.info("LOGADO COM SUCESSO");
      }
    }
    catch(err) {
      const typedError: AxiosError = err;
        console.log(typedError.response?.status);
        if(typedError.response?.status == 401) {
          setErrorMessage('Email ou senha incorretos');
          setErrorVisible(true);
          return;
        }

        if(!typedError.response?.status) {
          setErrorMessage('A conexão com o servidor falhou.');
          setErrorVisible(true);
          return;
        }
    }
  }

  async function redirectToCadastro() {
    navigation.navigate('Cadastro');
  }

  function toggleShowPassword() {
    if(secureTextToggle) {
      setEyePasswordIcon('eye-with-line');
      setSecureTextToggle(!secureTextToggle);
    }
    else {
      setEyePasswordIcon('eye')
      setSecureTextToggle(!secureTextToggle);
    }
  }

  return (
      <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="height">
        
            <View style={styles.imageView}>

            </View>

          <View style={styles.fieldsView}>
            <Text style={styles.title}>Faça seu Login!</Text>

            <View style={ styles.inputFieldContainer }>
              <View style={ styles.iconContainer }>
                <Ionicons name="mail-outline" size={22} color="#EF7562" />
              </View>

              <TextInput
                placeholder="Email"
                style={styles.iconTextInput}
                placeholderTextColor="#FFF"
                onChangeText={(text: string) => setEmail(text)}
              >
              </TextInput>
            </View>

            <View style={ styles.inputFieldContainer }>
              <View style={ styles.iconContainer }>
                <MaterialIcons name="lock-outline" size={24} color="#EF7562" />
              </View>

              <TextInput
                placeholder="Senha"
                style={styles.iconTextInput}
                placeholderTextColor="#FFF"
                secureTextEntry={ secureTextToggle }
                onChangeText={(text: string) => setPassword(text)}
              ></TextInput>

              <TouchableOpacity onPress={ toggleShowPassword }>
                <Entypo name={eyePasswordIcon} size={22} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={ styles.forgotPasswordBtn }>
              <Text style={ styles.forgotPasswordBtnText }>Esqueceu sua senha?</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.btnsView}>
            <TouchableOpacity style={styles.btnGO} onPress={login}>
              <Text style={styles.btnGoText}>GO!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSignUp} onPress={redirectToCadastro}>
              <Text style={styles.btnSignUpText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <Snackbar
            visible={errorVisible}
            onDismiss={() => {}}
            action={{
              label: 'OK',
              onPress: () => {
                setErrorVisible(false)
              },
            }}
            style={{backgroundColor: "white"}}
          >
          <View><Text>{errorMessage}</Text></View>
        </Snackbar>

          
        </KeyboardAvoidingView>
      </LinearGradient>
  );
}


