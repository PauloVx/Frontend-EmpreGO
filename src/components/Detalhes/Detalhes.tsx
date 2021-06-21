import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { globalColors } from "../../globalStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { User } from "../../models/User";
import { Job } from "../../models/Job";
import { useEffect } from "react";
import { API_CANDIDATAR_TRABALHO, API_GET_JOB_DETAILS, API_PERFIL_ENDPOINT, API_URL } from "../../config/config";
import { api } from "../../services/api";
import { AppStorage } from "../../utils/Storage";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { AxiosResponse } from "axios";

const Detalhes = ({route}): JSX.Element => {
    const navigation = useNavigation();
    const {jobId} = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [img, setImg] = useState<string>('');

    const [trabalho, setTrabalho] = useState<Job>();

    async function fetchTrabalho() {
        const jwt = await AppStorage.readData('token_jwt');

        await api.get(`${API_GET_JOB_DETAILS}/${jobId}`, { headers: { 'Authorization': `Bearer ${jwt}`}} ).then((job) => {
            setTrabalho(job.data);
            setImg(job.data.criadorUsuario?.imagemPefil.substring(7));
            setImg(API_URL + img);

            setLoading(false);
        });
    }

    async function candidatar() {
        const jwt = await AppStorage.readData('token_jwt');

        try {
            const responseData: AxiosResponse<any> = await api.get(API_PERFIL_ENDPOINT, { headers: { Authorization: 'bearer ' + jwt } });
            const { user } = await responseData.data;

            console.log("ID " + user.id)
            console.log("JOBID " + jobId)
            if(trabalho.criadorUsuario.id === user.id) {
                showMessage({
                    message: "Você não pode se candidatar à um trabalho criado por você mesmo!",
                    description: `Título: ${trabalho.titulo}`,
                    type: "danger",
                    icon: 'danger'
                });
                navigation.goBack();
                return;
            }
          }
          catch(e) {
            console.log(e);
          }

        try {
            await api.post(API_CANDIDATAR_TRABALHO, { id_trabalho: jobId }, { headers: { 'Authorization': `Bearer ${jwt}` }});
            showMessage({
                message: "Você se candidatou com sucesso!",
                description: `${trabalho.titulo}`,
                type: "success",
                icon: 'success'
            });
            navigation.goBack();
        }
        catch(err) {
            showMessage({
                message: "Alguem Já se candidatou a ese trabalho, ou ele não existe mais!",
                description: `Título: ${trabalho.titulo}`,
                type: "danger",
                icon: 'danger'
            });
            navigation.goBack();
        }
    }

    useEffect(() => {
        fetchTrabalho();
    }, [jobId])

    return (
        <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>


        <View style={styles.firstLine}>

            <View style={styles.imageColumn}>
                <View style={styles.imageView}>
                    {(loading) ? null : <Image style={styles.image} source={require('../../../assets/default.png')}/>}
                </View>
            </View>

            <View style={styles.titleContainer}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>{(loading) ? 'Carregando...' : trabalho.criadorUsuario?.nome_completo}</Text>
                <Text style={{ color: '#FFF', fontSize: 11 }}>{(loading) ? 'Carregando...' : trabalho.titulo}</Text>
            </View>

        </View>

        <View style={styles.descricaoContainer}>
            <Text style={{ color: '#FFF' }}>{(loading) ? 'Carregando...' : trabalho.descricao}</Text>

            <View>
                <Text style={ {color: '#FFF'} }>{(loading) ? 'Carregando...' : new Date(trabalho.dataCriacao).toLocaleTimeString() + ' - ' + new Date(trabalho.dataCriacao).toLocaleDateString() }</Text>
            </View>
        </View>

        <View style={styles.localizacaoContainer}>
            <View style={styles.outline}>
                <Text style={styles.localizacaoText}>CEP: {(loading) ? 'Carregando...' : trabalho.cep}</Text>
                <Text style={styles.localizacaoText}>Cidade: {(loading) ? 'Carregando...' : trabalho.cidade + trabalho.uf}</Text>
                <Text style={styles.localizacaoText}>Bairro: {(loading) ? 'Carregando...' : trabalho.bairro}</Text>
                <Text style={styles.localizacaoText}>Logradouro: {(loading) ? 'Carregando...' : trabalho.logradouro}</Text>
            </View>
        </View>

        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={candidatar}>
                <Text style={{ color: globalColors.endGradientColor, fontWeight: 'bold' }}>Candidatar-se</Text>
            </TouchableOpacity>
        </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },

      firstLine: {
          flexDirection: 'row',
          width: '100%',
          height: '13%',
          paddingHorizontal: 15,
      },

      imageColumn: {
        width: '25%',
        height: '100%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
      imageView: {
        width: '100%',
        height: '95%',
        overflow: 'hidden',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
      },
      image: {
        width: 100,
        height: 100
      },

      titleContainer: {
          padding: 15,
          justifyContent: 'center'
      },

      descricaoContainer: {
        padding: 15,
        height: '25%',
        width: '100%',

        justifyContent: 'space-evenly',

      },

      localizacaoContainer: {
          padding: 20,
          width: '100%',
          height: '30%',
      },
      outline: {
        padding: 25,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 40,
        height: '100%',
        justifyContent: 'space-evenly'
      },
      localizacaoText: {
          fontWeight: 'bold',
          color: '#FFF',
          fontSize: 15
      },

      btnContainer: {
        width: '100%', 
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '100%',
        height: '50%',
        borderRadius: 50
      }
    
})

export { Detalhes };