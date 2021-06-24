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
import { ActivityIndicator } from "react-native-paper";
import { Avatar } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import MapView from 'react-native-maps';

const Detalhes = ({route}): JSX.Element => {
    const {jobId} = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [img, setImg] = useState<string>('');

    const [trabalho, setTrabalho] = useState<Job>();

    async function fetchTrabalho() {
        setLoading(true);
        const jwt = await AppStorage.readData('token_jwt');

        await api.get(`${API_GET_JOB_DETAILS}/${jobId}`, { headers: { 'Authorization': `Bearer ${jwt}`}} ).then((job) => {
            setTrabalho(job.data);
            setImg(job.data.criadorUsuario?.imagemPefil.substring(7));
            setImg(API_URL + img);

            setLoading(false);
        });
    }

    useEffect(() => {
        fetchTrabalho();
    }, [jobId])
    

    return ( (loading) ? <ActivityIndicator size={50} color={globalColors.startGradientColor} style={{ marginTop: 270 }}/> : <LoadedView trabalho={ trabalho }  jobId={ jobId }/> )
}

const LoadedView = ({trabalho, jobId}: {trabalho: Job, jobId: number}): JSX.Element => {
    const fakeCoords: Array<{latitude: number, longitude: number}> = [
        { latitude: -22.1183168, longitude: -41.611518 },
        { latitude: -16.8345499, longitude: -49.2493613 },
        { latitude: -22.8509198, longitude: -43.2663982 },
        { latitude: -22.8541405, longitude: -43.2662192 },
        { latitude: -22.8534758, longitude: -43.2714456 },
        { latitude: -22.8509198, longitude: -43.2663982 },
        { latitude: -22.8134112, longitude: -43.3092641 },
        { latitude: -22.8509198, longitude: -43.2663982 },
        { latitude: -22.8437505, longitude: -43.2632509 },
        { latitude: -22.8533709, longitude: -43.2469424 },
        { latitude: -22.8669984, longitude: -43.2541663 },
    ];


    const navigation = useNavigation();
    async function candidatar() {
        const jwt = await AppStorage.readData('token_jwt');

        try {
            const responseData: AxiosResponse<any> = await api.get(API_PERFIL_ENDPOINT, { headers: { Authorization: 'bearer ' + jwt } });
            const { user } = await responseData.data;


            if(trabalho.criadorUsuario.id === user.id) {
                showMessage({
                    message: "Você não pode se candidatar à um trabalho criado por você mesmo!",
                    description: `Título: ${trabalho.titulo}`,
                    type: "danger",
                    icon: 'danger',
                    style: { borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }
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
                icon: 'success',
                style: { borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }
            });
            navigation.goBack();
        }
        catch(err) {
            showMessage({
                message: "Alguem Já se candidatou a ese trabalho, ou ele não existe mais!",
                description: `Título: ${trabalho.titulo}`,
                type: "danger",
                icon: 'danger',
                style: { borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }
            });
            navigation.goBack();
        }
    }

    return (
        <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>

            <View style={ styles.mapView }>
                <MapView style={ styles.map} initialRegion={ { latitude: fakeCoords[Math.floor(Math.random() * fakeCoords.length)].latitude, longitude: fakeCoords[Math.floor(Math.random() * fakeCoords.length)].longitude, latitudeDelta: 0.002, longitudeDelta: 0.002 } }/> 
            </View>

            <View style={styles.contentView}>
                <View>
                    <View>
                        <Text style={[styles.textDestaque, styles.titulo]}>{ trabalho.titulo }</Text>
                        <Text style={[styles.textDescricao]}>{ trabalho.descricao }</Text>
                    </View>

                    <View>
                        <Text style={[styles.textDestaque, styles.txtSubtitle]}>Endereço</Text>
                        <Text style={styles.txtEndereco}>{ trabalho.logradouro }</Text>
                        <Text style={styles.txtEndereco}>{ trabalho.bairro }</Text>
                        <Text style={styles.txtEndereco}>CEP { trabalho.cep }</Text>
                        <Text style={styles.txtEndereco}>{ `${trabalho.cidade} - ${trabalho.uf}` }</Text>
                    </View>
                </View>

                <View style={styles.creatorCard}>
                    <Avatar
                        rounded
                        size={55}
                        source={{
                            uri: `${API_URL}/${trabalho.criadorUsuario.imagemPefil.substring(8)}`,
                        }}
                    />

                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: globalColors.startGradientColor, fontSize: 9, marginBottom: 5 }}>Criado por</Text>
                        <Text style={{ color: globalColors.endGradientColor, fontWeight: 'bold', fontSize: 15 }}>{ trabalho.criadorUsuario.nome_completo }</Text>
                        <Text style={{ color: globalColors.startGradientColor, fontSize: 10, marginTop: 2 }}>{ trabalho.criadorUsuario.email }</Text>
                    </View>
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

      mapView: {
        height: '30%',
        borderRadius: 5,
        overflow: 'hidden',
        width: '90%'
      },
      map: {
        width: '100%',
        height: '100%',
      },

      contentView: {
        height: '50%',
        width: '100%',
        padding: 23,
        justifyContent: 'space-around',
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
      },

      titulo: {
        fontSize: 25,
        marginBottom: 5
      },

      txtSubtitle: {
        marginBottom: 5
      },

      textDestaque: {
          fontWeight: 'bold',
          color: '#FFF'
      },

      textDescricao: {
        marginBottom: 20,
        color: globalColors.textSecondary,
      },

      txtEndereco: {
          color: globalColors.textSecondary,
          fontSize: 10
      },

      creatorCard: {
          flexDirection: 'row',
          backgroundColor: '#FFF',
          width: '100%',
          height: '25%',
          borderRadius: 5,
          alignItems: 'center',
          paddingHorizontal: 15
      }

    //   firstLine: {
    //       flexDirection: 'row',
    //       width: '100%',
    //       height: '13%',
    //       paddingHorizontal: 15,
    //   },

    //   imageColumn: {
    //     width: '25%',
    //     height: '100%',
    //     borderRadius: 50,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    //   },
    //   imageView: {
    //     width: '100%',
    //     height: '95%',
    //     overflow: 'hidden',
    //     borderRadius: 50,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //   },
    //   image: {
    //     width: 100,
    //     height: 100
    //   },

    //   titleContainer: {
    //       padding: 15,
    //       justifyContent: 'center'
    //   },

    //   descricaoContainer: {
    //     padding: 15,
    //     height: '25%',
    //     width: '100%',

    //     justifyContent: 'space-evenly',

    //   },

    //   localizacaoContainer: {
    //       padding: 20,
    //       width: '100%',
    //       height: '30%',
    //   },
    //   outline: {
    //     padding: 25,
    //     borderColor: '#fff',
    //     borderWidth: 2,
    //     borderRadius: 40,
    //     height: '100%',
    //     justifyContent: 'space-evenly'
    //   },
    //   localizacaoText: {
    //       fontWeight: 'bold',
    //       color: '#FFF',
    //       fontSize: 15
    //   },
})

export { Detalhes };