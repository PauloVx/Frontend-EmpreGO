import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, Ionicons, Entypo, AntDesign, FontAwesome5, SimpleLineIcons   } from '@expo/vector-icons';
import { AppStorage } from '../../utils/Storage';
import { StyleSheet, View, Image, Text } from 'react-native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  async function logout() {
    await AppStorage.deleteData("token_jwt");
    props.navigation.navigate('Login');
  }
  

  const iconSize = 20;
  const activeColor = '#FF5F61';
  const inactiveColor = '#555';

    return (
      <>
        <View style={styles.profileContainer}>
          <View style={ styles.imageView }>
            <Image style={ styles.image } source={ require('../../../assets/techtips.png') } />
          </View>

          <View style={ styles.profileData }>
            <Text style={styles.userName}>Nome User Logado</Text>
            <Text style={styles.userEmail}>Email User Logado</Text>
            <View style={styles.userScoreContainer}>
              <AntDesign name="star" size={18} color="white" />
              <Text style={styles.userScoreText}>5.0</Text>
            </View>
          </View>
        </View>

        <DrawerContentScrollView {...props} contentContainerStyle={ styles.container }>
          <View style={styles.topBtn}>
            <DrawerItem labelStyle={{ color: activeColor }} label="Perfil"        onPress={() => {}} icon={() => <FontAwesome5 name="user"            size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Mensagens"     onPress={() => {}} icon={() => <Ionicons     name="mail-outline"    size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Configurações" onPress={() => {}} icon={() => <Feather      name="settings"        size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="Suporte"       onPress={() => {}} icon={() => <Entypo       name="lifebuoy"        size={iconSize} color={activeColor} />} />
            <DrawerItem labelStyle={{ color: activeColor }} label="FAQ"           onPress={() => {}} icon={() => <AntDesign    name="questioncircleo" size={iconSize} color={activeColor} />} />
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

  export { CustomDrawer };