import React, { useEffect, useState } from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, Ionicons, Entypo, AntDesign, FontAwesome5, SimpleLineIcons   } from '@expo/vector-icons';
import { AppStorage } from '../../utils/Storage';
import { StyleSheet, View, Image, Text } from 'react-native';
import { User } from '../../models/User';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../../services/api';
import { API_PERFIL_ENDPOINT, API_URL } from '../../config/config';
import { useFocusEffect } from '@react-navigation/core';

const LeftDrawer = (props: DrawerContentComponentProps) => {
  const [user, setUser] = useState<User>();

  async function logout() {
    await AppStorage.deleteData("token_jwt");
    props.navigation.navigate('Login');
  }

  function redirectToMinhasCandidaturas() {
    props.navigation.navigate('Candidaturas');
  }

  async function getUserData() {
    await AppStorage.readData("token_jwt").then(async jwt => {
      try {
        const responseData: AxiosResponse<any> = await api.get(API_PERFIL_ENDPOINT, { headers: { Authorization: 'bearer ' + jwt } });
        const { user } = await responseData.data;
        console.log(user)
        setUser(user);
      }
      catch(e) {
        const error: AxiosError = e;
        console.log(error.message)
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );
  
  const iconSize = 20;
  const activeColor = '#FF5F61';
  const inactiveColor = '#555';

  let gambi = user?.imagemPefil.substring(21);
  gambi = API_URL + gambi;

    return (
      <>
        <View style={styles.profileContainer}>
          <View style={ styles.imageView }>
            <Image style={ styles.image } source={ user?.imagemPefil ? { uri: gambi } : require('../../../assets/default.png') } />
          </View>

          <View style={ styles.profileData }>
            <Text style={styles.userName}>{ user?.nome_completo }</Text>
            <Text style={styles.userEmail}>{ user?.email }</Text>
            <View style={styles.userScoreContainer}>
              <AntDesign name="star" size={18} color="white" />
              <Text style={styles.userScoreText}>5.0</Text>
            </View>
          </View>
        </View>

        <DrawerContentScrollView {...props} contentContainerStyle={ styles.container }>
          <View style={styles.topBtn}>
            <DrawerItem labelStyle={{ color: activeColor }} label="Perfil"              onPress={() => {}} icon={() => <FontAwesome5 name="user"                     size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Mensagens"           onPress={() => {}} icon={() => <Ionicons     name="mail-outline"             size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Minhas Candidaturas" onPress={redirectToMinhasCandidaturas} icon={() => <Ionicons     name="checkmark-circle-outline" size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Configurações"       onPress={() => {}} icon={() => <Feather      name="settings"                 size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Suporte"             onPress={() => {}} icon={() => <Entypo       name="lifebuoy"                 size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="FAQ"                 onPress={() => {}} icon={() => <AntDesign    name="questioncircleo"          size={iconSize} color={activeColor} />} />
          </View>

          <View style={styles.bottomBtn}>
            <DrawerItem labelStyle={{ color: activeColor }} label="Sair" onPress={logout} icon={() => <SimpleLineIcons name="logout" size={iconSize} color={activeColor} />} />
          </View>
        </DrawerContentScrollView>
      </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },

    profileContainer: {
      backgroundColor: '#FF5F61',
      height: '20%',
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
    },

    imageView: {
      width: 65,
      height: 65,
      overflow: 'hidden',
      borderRadius: 500,
      marginRight: 5
    },

    image: {
      width: '100%',
      height: '100%'
    },

    profileData: {
      width: '70%',
    },

    userName: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 17
    },

    userEmail: {
      color: '#DDD',
      fontSize: 10
    },

    userScoreContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingVertical: 5
    },
    userScoreText: {
      color: '#FFF',
      marginLeft: 5
    },

    topBtn: {
      height: '90%'
    },

    bottomBtn: {
      height: '10%'
    }
  })

  export { LeftDrawer };