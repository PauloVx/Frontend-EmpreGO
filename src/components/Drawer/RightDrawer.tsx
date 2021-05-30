import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ListRenderItemInfo } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Foundation } from '@expo/vector-icons';
import { AppStorage } from '../../utils/Storage';
import { MaterialIcons } from '@expo/vector-icons';

const renderItem = (oldSearchs: ListRenderItemInfo<string>): JSX.Element => {
    const item: string = oldSearchs.item;
    return (
        <TouchableOpacity style={styles.listItemContainer}>
            <MaterialIcons name="history" size={18} color="#FF5F61" />
            <Text style={styles.listItemText}>{ item }</Text>
        </TouchableOpacity>
    )
}


const RightDrawer = (props: DrawerContentComponentProps): JSX.Element => {
    const [searchParam, setSearchParam] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<Array<string>>([]);

    async function getFlatListData(): Promise<void> {
        await AppStorage.readData('search_history').then(arr => setSearchHistory(arr));
    }

    useEffect(() => {
        getFlatListData();
    }, []);

    async function search() {
        if(!searchParam) return;


        let history: Array<string> = [];
        await AppStorage.readData('search_history').then(arr => history = arr);

        if(!history) {
            let params: Array<string> = [];
            params.push(searchParam);
            //Ainda não existe um histórico de pesquisa salvo.
            AppStorage.storeData('search_history', params);
        }
        else {
            if(!history.includes(searchParam)) {
                history.push(searchParam);
                AppStorage.storeData('search_history', history);
            }
        }

        //TODO: Enviar pesquisa para api.
    }

    return (
        <>
            <View style={ styles.redRectangle }>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        placeholder="Busque por trabalhos..."
                        style={styles.textInput}
                        placeholderTextColor="#666"
                        onChangeText={(text: string) => { setSearchParam(text) }}
                    ></TextInput>

                    <TouchableOpacity onPress={ search }>
                        <Foundation name="magnifying-glass" size={22} color="#FF5F61" />
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={styles.textContainer}>
                    <Text style={{ color: '#FF5F61', fontSize: 13, fontWeight: 'bold' }}>Histórico de Pesquisa</Text>
                </View>
                <View>
                    <FlatList
                        data={ searchHistory }
                        renderItem={ renderItem }
                        keyExtractor={(item, index) => item}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    redRectangle: {
        backgroundColor: '#FF5F61',
        height: '20%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },

    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        borderRadius: 5,
        textAlign: 'left',
        paddingHorizontal: 10,
    
        color: '#FFF',
        backgroundColor: '#FFF',
        minHeight: '25%'
    },

    textInput: {
        flex: 1,
        color: '#333',
        fontSize: 11
    },

    textContainer: {
        padding: 10
    },

    listItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 5
    },

    listItemText: {
        color: '#FF5F61',
        marginLeft: 10
    }
});

export { RightDrawer };