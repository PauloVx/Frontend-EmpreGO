import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { Text, StyleSheet, View, ListRenderItemInfo } from 'react-native';
import { globalColors } from '../../../globalStyles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { Job } from '../../../models/Job';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../../services/api';
import { API_JOBS_I_CREATED } from '../../../config/config';
import { AppStorage } from '../../../utils/Storage';


const listItem = (jobs: ListRenderItemInfo<Job>): JSX.Element => {
  const job: Job = jobs.item;
  const contentLimitado: string = job.descricao.substring(0, 40);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.btnItem}>
        <View>
          <Text style={styles.itemTitle}>{job.titulo}</Text>
          <Text style={styles.itemContent}>{ contentLimitado }</Text>
        </View>

        <View>
          <Entypo name="chevron-right" size={28} color="#EF7562" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const Empregar = (): JSX.Element => {
  const navigation =  useNavigation();
  const [jobs, setJobs] = useState<Array<Job>>([]);

  function navigateToNewJob() {
    navigation.navigate('NewJob');
  }

  async function fetchJobs() {
    const jwt = await AppStorage.readData('token_jwt');

    await api.get(API_JOBS_I_CREATED, { headers: { 'Authorization': `bearer ${jwt}`}}).then((jobs) => {
      setJobs(jobs.data)
      console.log(jobs)
    });
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  return (
    <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>

      <FlatList 
        data={ jobs }
        renderItem={ listItem }
        style={styles.flatList}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity>
          <View style={styles.shadowBtn}>
            <View style={styles.btnNew}>
              <Entypo name="plus" size={52} color="#EF7562" onPress={ navigateToNewJob }/>
            </View>
          </View>
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

  shadowBtn: {
    borderRadius: 500,
  },

  btnNew: {
    backgroundColor: '#FFF',
    borderRadius: 500,

    alignItems: 'center',
    justifyContent: 'center',

    height: 60,
    width: 60,

    borderColor: '#EF7562',
    borderWidth: 1
  },

  btnContainer: {
    width: '100%',
    height: '10%',

    flexDirection: 'row',
    justifyContent: 'flex-end',

    alignItems: 'center',

    padding: 25,
  },

  flatList: {
    width: '100%',
    height: '90%',
    overflow: 'visible'
  },

  itemContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    height: 85,
  },

  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },

  itemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#444'
  },

  itemContent: {
    fontSize: 11,
    color: '#777'
  }
})

export { Empregar };