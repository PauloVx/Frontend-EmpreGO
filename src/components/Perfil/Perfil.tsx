import React from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { globalColors } from "../../globalStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { User } from "../../models/User";
import { AppStorage } from "../../utils/Storage";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../services/api";
import { API_PERFIL_ENDPOINT, API_URL } from "../../config/config";
import { View } from "react-native";
import { Avatar } from 'react-native-elements';
import { Input } from "react-native-elements/dist/input/Input";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
 
const LoadedComponent = ({ user }: { user: User }): JSX.Element => {
    return (
        <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>

            <View style={styles.userNameContainer}>
                <Avatar rounded source={{ uri: API_URL + user.imagemPefil.substring(21) }} size={80} renderPlaceholderContent={<ActivityIndicator color={globalColors.startGradientColor} />}>
                    <Avatar.Accessory style={{ backgroundColor: globalColors.startGradientColor }} size={30} containerStyle={{ borderRadius: 50, width: '100%' }} backgroundColor={ globalColors.startGradientColor }/>
                </Avatar>
                <View style={{ justifyContent: 'center', padding: 15 }}>
                    <Text style={styles.titleText}>{ user.nome_completo }</Text>
                    <Text style={ styles.subtitle }>{ user.email }</Text>
                </View>
            </View>

            <View>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Informações da Conta</Text>
                <View>
                    <Input
                        editable={false}
                        inputContainerStyle={{borderColor: '#FFF', padding: 5}}
                        placeholder={user.nome_completo}
                        placeholderTextColor="#FFF"
                        leftIcon={
                            <FontAwesome5 name="user" size={20} color="#FFF" />
                        }
                        leftIconContainerStyle={{ marginRight: 10 }}
                    />

                    <Input
                        editable={false}
                        inputContainerStyle={{borderColor: '#FFF', padding: 5}}
                        placeholder={user.email}
                        placeholderTextColor="#FFF"
                        leftIcon={
                            <Feather name="mail" size={20} color="#FFF" />
                        }
                        leftIconContainerStyle={{ marginRight: 10 }}
                    />

                    <Input
                        editable={false}
                        inputContainerStyle={{borderColor: '#FFF', padding: 5}}
                        placeholder={user.cpf_cnpj}
                        placeholderTextColor="#FFF"
                        leftIcon={
                            <AntDesign name="idcard" size={20} color="#FFF" />
                        }
                        leftIconContainerStyle={{ marginRight: 10 }}
                    />

                </View>
            </View>

        </LinearGradient>
    )
}

const Perfil = ({ route }): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);

    return ( (loading) ? <ActivityIndicator size={50} color={globalColors.startGradientColor} style={{ marginTop: 270 }}/> :  <LoadedComponent user={route.params.user}/>)
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1
    },

    userNameContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '15%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20
    },

    titleText: {
        color: globalColors.startGradientColor,
        fontWeight: 'bold',
        fontSize: 20
    },

    subtitle: {
        color: '#999',
        fontSize: 10
    }
});

export { Perfil };