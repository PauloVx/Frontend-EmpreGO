import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { globalColors } from "../../globalStyles";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Picker } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useEffect } from "react";
import { UF } from "../../models/UF";
import { ufsApi } from "../../services/ufsApi";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { API_CREATE_JOB_ENDPOINT } from "../../config/config";
import { useNavigation } from "@react-navigation/native";
import { AppStorage } from "../../utils/Storage";
import { showMessage } from "react-native-flash-message";

const NewJobPart2 = ({route}): JSX.Element => {
  const navigation = useNavigation();

  const { title, description } = route.params;
  const [cep, setCEP] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('Cidade');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');

  const [ufs, setUfs] = useState<Array<UF>>([]);

  async function publicar() {
    const job = {
      titulo: title,
      descricao: description,
      cep,
      uf,
      cidade,
      bairro,
      logradouro
    }

    if(!title || !cep || !uf || !cidade || !bairro || !logradouro) {
      showMessage({
        message: "Preencha todos os campos!",
        type: "danger",
        icon: 'danger'
      });
      return;
    }

    const jwt = await AppStorage.readData('token_jwt');

    await api.post(API_CREATE_JOB_ENDPOINT, job, { headers: { 'Authorization': `Bearer ${jwt}`} }).then(() => {
      navigation.navigate('Início');
    });
  }

  useEffect(() => {
    ufsApi.get('')
    .then(async (response: AxiosResponse<any>) => {
      setUfs(response.data)
    })
    .catch((data) => {
      console.log('Um erro ocorreu ao fazer uma requisição a api de ufs: ', data)
    });
  }, [])

  return (
      <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Localização</Text>
        </View>

        <View style={styles.inputsContainer}>

            <TextInput
              placeholder="CEP"
              style={styles.input}
              placeholderTextColor="#FFF"
              onChangeText={(text: string) => setCEP(text)}
            ></TextInput>

          <View style={styles.inputGroup}>
            <View style={styles.ufContainer}>

              <Picker
                selectedValue={uf}
                style={styles.inputUf}
                onValueChange={(itemValue, itemIndex) => setUf(itemValue)}
              >
                {ufs.map((uf: UF, index: number) => {
                    return (<Picker.Item label={uf.sigla} value={uf.sigla} key={uf.id}/>)
                })}
                
              </Picker>
              <Entypo name="triangle-down" size={22} color="white" />
            </View>

            <View style={styles.cidadeContainer}>
              <TextInput
                placeholder="Cidade"
                style={styles.inputCidade}
                placeholderTextColor="#FFF"
                onChangeText={(text: string) => setCidade(text)}
              ></TextInput>
            </View>
          </View>

            <TextInput
              placeholder="Bairro"
              style={styles.input}
              placeholderTextColor="#FFF"
              onChangeText={(text: string) => setBairro(text)}
            ></TextInput>

            <TextInput
              placeholder="Logradouro"
              style={styles.input}
              placeholderTextColor="#FFF"
              onChangeText={(text: string) => setLogradouro(text)}
            ></TextInput>

        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={publicar}>
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

  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },

  inputsContainer:{
    width: '100%',
    height: '75%',
    alignItems: 'center',

  },

  inputGroup: {
    flexDirection: 'row',
    width: '100%',
    height: '9%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 30,

  },
  ufContainer: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 50
  },
  cidadeContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 50
  },
  inputUf: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    color: '#fff'
  },
  inputCidade: {
    height: 50,
    width: 200,
    borderRadius: 100,
    color: '#FFF'
  },

  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: '85%',
    height: '9%',
    paddingLeft: 15,
    marginVertical: 10,
    borderRadius: 100,
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