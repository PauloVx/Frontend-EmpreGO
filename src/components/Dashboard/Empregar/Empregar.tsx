import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { Text, StyleSheet, View, ListRenderItemInfo } from 'react-native';
import { globalColors } from '../../../globalStyles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { Job } from '../../../models/Job';
import { useNavigation } from '@react-navigation/core';

const placeholderData: Array<Job> = [
  { id: 1, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 2, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 3, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 4, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 5, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 6, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 7, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 8, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 9, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },
  { id: 10, author: 'Gabriel Neves', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas consequat justo, in mattis eros feugiat quis. Nullam eu ante accumsan, venenatis ex et, accumsan sem. Nulla eu faucibus leo, eget laoreet sapien. Sed nisi sapien, suscipit eget est rhoncus, pellentesque mollis tellus. Suspendisse facilisis nisi facilisis, sollicitudin dui sed, dignissim erat. Duis elementum turpis ipsum. Suspendisse a sem leo. Nam sed volutpat neque. Proin nec tincidunt dui. Mauris euismod nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus metus purus, consequat sit amet laoreet vel, viverra eget nunc. Fusce sollicitudin ex nec est faucibus maximus. In maximus pretium dolor, sit amet lobortis nibh laoreet non.' },

]

const listItem = (jobs: ListRenderItemInfo<Job>): JSX.Element => {
  const job: Job = jobs.item;
  const contentLimitado: string = job.content.substring(0, 50);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.btnItem}>
        <View>
          <Text style={styles.itemTitle}>Placeholder</Text>
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

  function navigateToNewJob() {
    navigation.navigate('NewJob');
  }

  return (
    <LinearGradient colors={[globalColors.startGradientColor, globalColors.endGradientColor ]} style={styles.gradientContainer}>

      <FlatList 
        data={ placeholderData }
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
    height: 70,
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