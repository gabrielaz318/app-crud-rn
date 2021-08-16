import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Keyboard } from 'react-native'

import axios from 'axios'
import { server } from '../config/server'
import { CommonActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

import fundo from '../images/login.jpg'

export default class Login extends Component {

    state = {
        email: 'gabriel@gmail.com',
        senha: '12345',
        carregando: false,
        botaoStatus: false,
        ip: '131.107.1.16'
    }

    logar = async () => {
        if(this.state.email.trim() === '' || this.state.senha.trim() === '') return Alert.alert('Dados inválidos', 'Insira seu e-mail e senha para logar.')
        Keyboard.dismiss()
        this.setState({ carregando: true })
        try {
        
            const res = await axios.post(`http://131.107.1.16:3333/acesso/login`, { email: this.state.email, senha: this.state.senha })
                if(res.data.auth === true) {
                axios.defaults.headers.common['authorization'] = `${res.data.token}`
                AsyncStorage.setItem('dadosAsync', JSON.stringify(res.data))
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'TelaConsulta',
                                params: res.data
                            },
                        ],
                    })
                )
                this.setState({ carregando: false })
                } else {
                    this.setState({ carregando: false })
                    Alert.alert(res.data.titulo, res.data.mensagem)
                }

            } catch (e) {
                Alert.alert('Erro', `${e}`)
                this.setState({ carregando: false })
            }
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#222"/>
                {this.state.carregando && <View style={styles.viewCarregamento}>
                    <ActivityIndicator size='large' color='#fff'/>
                    <Text style={styles.viewCarregamentoTexto}>Acessando informações...</Text>
                </View>}
                    
                    <View style={styles.containerForm}>

                        <Text style={styles.titulo}>Login</Text>

                        <TextInput value={this.state.email} style={styles.input} placeholderTextColor="#FFF" onChangeText={email => this.setState({ email })}  placeholder='E-mail'/>

                        <TextInput value={this.state.senha} style={styles.input} placeholderTextColor="#FFF" onChangeText={senha => this.setState({ senha })} placeholder='Senha' secureTextEntry={true}/>

                        <TextInput style={{color: '#fff'}} value={this.state.ip} placeholder='IP' placeholderTextColor="#FFF" onChangeText={(text) => this.setState({ip: text})}/>
                        
                        <TouchableOpacity disabled={false} activeOpacity={0.4} onPress={() => this.logar()} style={styles.botao}>
                            <Text style={styles.textoBotao}>Entrar</Text>
                            <Icon style={{marginLeft: 7}} name="sign-in" size={27} color="#000" />
                        </TouchableOpacity>

                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#222',
      position: 'relative',
      justifyContent: "center",
      alignItems: 'center',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems: 'center',
    },
    containerForm: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.1)',
        width: '80%',
        borderRadius: 25,
        padding: 10,
        paddingVertical: 20,
    },
    input: {
        width: '85%',
        borderColor: '#FFF',
        borderWidth: 3,
        borderRadius: 40,
        color: '#FFF',
        paddingLeft: 25,
        fontSize: 20,
        marginBottom: 25
    },
    titulo: {
        fontSize: 55,
        marginBottom: 40,
        fontFamily: 'OpenSans',
        fontWeight: 'bold',
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.55)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    },
    botao: {
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
        paddingVertical: 11,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textoBotao: {
        fontSize: 22,
        color: '#012d3a'
    },
    viewCarregamento: {
        position: 'absolute',
        zIndex: 10,
        left: 2,
        top: 2,
        backgroundColor: 'rgba(0,0,0,.9)',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCarregamentoTexto: {
        color: '#fff',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15

    }
  });