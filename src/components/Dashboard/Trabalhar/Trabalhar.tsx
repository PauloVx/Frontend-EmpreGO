import React, { useState, useEffect } from 'react';
import { 
  Text,
  FlatList,
  View,
  ListRenderItemInfo,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import { ListItem } from 'react-native-elements';

import MapView from 'react-native-maps';

import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { globalColors } from '../../../globalStyles';
import { Job } from '../../../models/Job';
import { api } from '../../../services/api';
import { API_GET_ALL_JOBS, API_URL } from '../../../config/config';
import { AppStorage } from '../../../utils/Storage';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

export function Trabalhar() {
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigation = useNavigation();

  async function fetchJobs() {
    setLoading(true);
    const jwt = await AppStorage.readData('token_jwt');

    api.get(API_GET_ALL_JOBS, { headers: { 'Authorization': `Bearer ${jwt}`}} )
    .then((jobs) => {
      setJobs(jobs.data.reverse());
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
    });
  }


  useEffect(() => {
    fetchJobs();
  }, []);

  function redirectToDetail(jobId: number) {
    navigation.navigate('Detalhes', { jobId });
  }

  const renderItem = ({item}): JSX.Element => {
    const job: Job = item;

    const formattedContent: string = job.descricao.substr(0, 200);

    let gambi = job.criadorUsuario?.imagemPefil.substring(7);
    gambi = API_URL + gambi;

    return (
      <ListItem
        bottomDivider
        linearGradientProps={{
          colors: [globalColors.startGradientColor, globalColors.endGradientColor],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 5 },
        }}
        ViewComponent={LinearGradient}
        onPress={() => {redirectToDetail(job.id)}}
      >
        <Avatar rounded source={{ uri: gambi }} size={50} renderPlaceholderContent={<ActivityIndicator />}/>
        <ListItem.Content>
          <ListItem.Title style={{color: '#FFF', fontWeight: 'bold'}} >{job.criadorUsuario.nome_completo}</ListItem.Title>
          <ListItem.Subtitle  style={{color: '#FFF', fontWeight: '100'}}>{job.titulo}</ListItem.Subtitle>
          <ListItem.Subtitle  style={{color: '#FFF', fontWeight: '100', fontSize: 10}}>{job.descricao.substr(0, 40) + '...'}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="#FFF" size={25}/>
      </ListItem>
    )
  };

  return (
    (loading && !refreshing) ? <ActivityIndicator size={50} color={globalColors.startGradientColor} style={{ marginTop: 270 }}/> :
      <FlatList
        data={ jobs }
        renderItem={ renderItem }
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={fetchJobs} /> }
        keyExtractor={(job: Job, index: number) => job.id.toString() }
      />
  )
}

const styles = StyleSheet.create({
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