import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, Ionicons, Entypo, AntDesign, FontAwesome5, SimpleLineIcons   } from '@expo/vector-icons';
import { AppStorage } from '../../utils/Storage';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const CustomDrawer = (props: any) => {
  async function logout() {
    const navigation = useNavigation();
    await AppStorage.deleteData("token_jwt");
    navigation.navigate('Login');
  }
  

  const iconSize = 20;
  const activeColor = '#EF7562';
  const inactiveColor = '#555';

    return (
      <DrawerContentScrollView {...props} contentContainerStyle={ styles.container }>
        <View style={styles.topBtn}>
          <DrawerItem labelStyle={{ color: activeColor }} label="Perfil"        onPress={() => {}} icon={() => <FontAwesome5    name="user"            size={iconSize} color={activeColor} />} />
          <DrawerItem labelStyle={{ color: activeColor }} label="Mensagens"     onPress={() => {}} icon={() => <Ionicons        name="mail-outline"    size={iconSize} color={activeColor} />} />
          <DrawerItem labelStyle={{ color: activeColor }} label="Configurações" onPress={() => {}} icon={() => <Feather         name="settings"        size={iconSize} color={activeColor} />} />
          <DrawerItem labelStyle={{ color: activeColor }} label="Suporte"       onPress={() => {}} icon={() => <Entypo          name="lifebuoy"        size={iconSize} color={activeColor} />} />
          <DrawerItem labelStyle={{ color: activeColor }} label="FAQ"           onPress={() => {}} icon={() => <AntDesign       name="questioncircleo" size={iconSize} color={activeColor} />} />
        </View>

        <View style={styles.bottomBtn}>
          <DrawerItem labelStyle={{ color: activeColor }} label="Sair" onPress={logout} icon={() => <SimpleLineIcons name="logout" size={iconSize} color={activeColor} />} />
        </View>
      </DrawerContentScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },

    topBtn: {
      height: '90%'
    },

    bottomBtn: {
      height: '10%'
    }
  })

  export { CustomDrawer };