import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import IconIo from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { server } from '../config/server'

export default class App extends Component {
    state = {
        qtdUsuarios: '',
        ultimoUsuario: '',
        top1Emai: '',
        top2Email: '',
        top3Email: '',
        btnCarregar: true
    }

    componentDidMount = async () => {
        this.setState({btnCarregar: false})
        try {
            
          await axios.get(`${server}/usuarios/infousers`)
          .then(res => {

            const qtdUsuarios = res.data[0][0].id
            const ultimoUsuario = res.data[1][0]
            const emails = res.data[2][0]

            this.setState({qtdUsuarios, ultimoUsuario})

            emails

          })
        } catch (e) {
          console.warn('ERRO'+e)
        }

        this.setState({btnCarregar: true})

      }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.viewTitulo}>
                    <TouchableOpacity style={styles.botaoDrawer} activeOpacity={0.4} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars' size={26} color='#fff'/>
                    </TouchableOpacity>
                    <Text style={styles.textoTitulo}>Home</Text>
                </View>

                <View style={styles.viewDados}>

                    <View style={styles.viewQtdUser}>
                        <Text style={styles.tituloQtdUser}>Quantidade de usuários</Text>
                        <Text style={styles.qtdUser}>{this.state.qtdUsuarios}</Text>
                    </View>

                    <View style={styles.viewUltUser}>
                        <Text style={styles.viewUltUserTitulo}>Último usuário cadastrado</Text>
                        <Text style={styles.viewUltUserNome}>{this.state.ultimoUsuario.nome}</Text>
                        <Text style={styles.viewUltUserEmail}>{this.state.ultimoUsuario.email}</Text>
                    </View>

                    {/* <View style={styles.viewTop}>
                        <Text style={styles.tituloTop}>TOP 3 servidores de e-mail</Text>
                        <Text style={styles.top1}>1 - @gmail.com</Text>
                        <Text style={styles.top2}>2 - @hotmail.com</Text>
                        <Text style={styles.top3}>3 - @betocarrero.com.br</Text>
                    </View> */}

                    <TouchableOpacity onPress={() => this.componentDidMount()} activeOpacity={0.4} disabled={!this.state.btnCarregar} style={[styles.botaoSincronizar, this.state.btnCarregar ? {} : { backgroundColor: '#AAA' }]}>
                        <Text style={styles.textoBotao}>Recarregar Informações</Text>
                        <Icon style={[styles.iconeBotao, {marginLeft: 15}]} name='sync' color='#222'/>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    viewTitulo: {
        backgroundColor: '#222',
        alignItems: 'center'
    },
    textoTitulo: {
        color: '#fff',
        fontSize: 25,
        marginVertical: 10
    },
    botaoDrawer: {
      position: 'absolute',
      zIndex: 10,
      top: 13,
      left: 15
    },
    viewDados: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },


    viewQtdUser: {
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 10,
        alignItems: 'center'
    },
    tituloQtdUser: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#222',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    qtdUser: {
        fontSize: 35,
        paddingVertical: 20,
        color: '#222'
    },


    viewUltUser: {
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 10,
        alignItems: 'center'
    },
    viewUltUserTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#222',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    viewUltUserNome: {
        marginTop: 20,
        fontSize: 28,
        color: '#222'
    },
    viewUltUserEmail: {
        fontSize: 20,
        color: '#555',
        marginBottom: 20
    },


    viewTop: {
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 10,
        alignItems: 'center'
    },
    tituloTop: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#222',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    top1: {
        marginTop: 20,
        fontSize: 26,
        marginBottom: 10,
        color: '#222'
    },
    top2: {
        fontSize: 22,
        marginBottom: 10,
        color: '#222'
    },
    top3: {
        fontSize: 19.5,
        marginBottom: 10,
        marginBottom: 20,
        color: '#222'
    },
    botaoSincronizar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#32b106',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10
    },
    textoBotao: {
        fontSize: 18,
        color: '#fff'
    },  
    iconeBotao: {
        fontSize: 22,
        color: '#fff'
    }
})