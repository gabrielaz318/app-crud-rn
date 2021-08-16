import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { server } from '../config/server'
import { CommonActions } from '@react-navigation/native'

export default class Login extends Component {

    componentDidMount = async () => {
        const dadosDoAsyncStorage = await AsyncStorage.getItem('dadosAsync')
        let dadosDoUsuario = null

        try {
            dadosDoUsuario = JSON.parse(dadosDoAsyncStorage)
        } catch (e) {
            // userData está inválido
        }

        if (dadosDoUsuario && dadosDoUsuario.token) {
            axios.defaults.headers.common['authorization'] = `${dadosDoUsuario.token}`
            // this.props.navigation.navigate('Home', userData)
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'TelaConsulta',
                            params: dadosDoUsuario,
                        },
                    ],
                })
            );
        } else {
            // this.props.navigation.navigate('Auth')
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Login',
                        },
                    ],
                })
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='#fff'/>
                <Text style={styles.texto}>Carregando...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        marginTop: 10,
        fontSize: 20,
        color: '#FFF'
    },
})