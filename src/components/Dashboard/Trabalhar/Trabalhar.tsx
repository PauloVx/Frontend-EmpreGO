import React, { useState } from 'react';
import { 
  Text,
  FlatList,
  View,
  ListRenderItemInfo,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';

import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { globalColors } from '../../../globalStyles';
import { Job } from '../../../models/Job';
import { useEffect } from 'react';
import { api } from '../../../services/api';
import { API_GET_ALL_JOBS, API_URL } from '../../../config/config';
import { AppStorage } from '../../../utils/Storage';
import { useNavigation } from '@react-navigation/native';

export function Trabalhar() {
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const navigation = useNavigation();

  async function fetchJobs() {
    const jwt = await AppStorage.readData('token_jwt');

    api.get(API_GET_ALL_JOBS, { headers: { 'Authorization': `Bearer ${jwt}`}} ).then((jobs) => {
      setJobs(jobs.data);
    })
  }


  useEffect(() => {
    fetchJobs();
  }, []);

  function redirectToDetail(jobId: number) {
    navigation.navigate('Detalhes', { jobId });
  }

  const renderItem = (jobs: ListRenderItemInfo<Job>): JSX.Element => {
    const job: Job = jobs.item;

    const formattedContent: string = job.descricao.substr(0, 200);

    let gambi = job.criadorUsuario?.imagemPefil.substring(7);
    gambi = API_URL + gambi;

    return (
      
      <View style={ styles.job }>

        <View style={ styles.imageColumn }>
          <TouchableOpacity>
            <View style={ styles.imageView }>
              <Image style={ styles.image } source={ job.criadorUsuario?.imagemPefil ? { uri: gambi } : require('../../../../assets/default.png')} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={ styles.contentColumn }>
          <View style={ styles.jobHeader }>
            <TouchableOpacity>
              <Text style={ styles.authorName }>{job.criadorUsuario.nome_completo}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => redirectToDetail(job.id) }>
              <Text style={ styles.contentText }>{ formattedContent }</Text>
            </TouchableOpacity>
          </View>

        <View style={ styles.mapView }>
          <MapView style={ styles.map} />
        </View>

        <View style={ styles.jobFooter }>
          <View style={ styles.dateView }>
            <Text style={ styles.dateText }>{ new Date(job.dataCriacao).toLocaleDateString() + ' ' + new Date(job.dataCriacao).toLocaleTimeString() }</Text>
          </View>

          <View style={ styles.scoreView }>
            <AntDesign name="star" size={15} color="white" />
            <Text style={ styles.scoreText }>4.8 / 5.0</Text>
          </View>
        </View>

        </View>

      </View>
      
    )
  };

  return (
    <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>
      <FlatList
        data={ jobs }
        renderItem={ renderItem }
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  job: {

    height: 300,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10
  },

  imageColumn: {

    width: '17%',
    paddingRight: 5
  },

  contentColumn: {

    width: '83%'
  },

  jobHeader: {
    overflow: 'hidden',
    height: '28%'
  },

  authorName: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5
  },

  contentText: {
    color: '#FFF',
  },

  imageView: {
    width: '100%',
    height: '45%',
    overflow: 'hidden',
    borderRadius: 50
  },
  image: {
    width: '100%',
    height: '100%'
  },

  mapView: {
    height: '64%',
    borderRadius: 15,
    overflow: 'hidden',
    width: '95%'
  },
  map: {
    width: '100%',
    height: '100%',
  },

  jobFooter: {

    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,

    height: '8%',
  },

  dateView: {
    width: '76%',

  },
  dateText: {
    color: '#FFF'
  },

  scoreView: {
    flexDirection: 'row',
    width: '24%',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  scoreText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
});