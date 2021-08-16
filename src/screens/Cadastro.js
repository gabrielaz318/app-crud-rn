import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { server } from '../config/server'

const estadoInicial = {
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
    visuSenha: true,
    visuConfirmSenha: true,
    cadastrar: false
}

export default class App extends Component {
    state = {   
        ...estadoInicial
    }

    mostrarConfirmSenha() {
        if(this.state.visuConfirmSenha){
            this.setState({visuConfirmSenha: false})
        } else {
            this.setState({visuConfirmSenha: true})
        }
    }

    mostrarSenha() {
        if(this.state.visuSenha){
            this.setState({visuSenha: false})
        } else {
            this.setState({visuSenha: true})
        }
    }

    cadastrar = async () => {
        try {
            const res = await axios.post(`${server}/acesso/cadastro`, { 
                nome: this.state.nome, 
                email: this.state.email, 
                senha: this.state.senha })

            if(res.data === 'Sucesso'){
                Keyboard.dismiss()
                Alert.alert('Sucesso!', `Usuário ${this.state.nome} cadastrado com sucesso.`)
                this.setState({...estadoInicial})
            } else {
                Alert.alert('Erro', 'Ocorreu um erro com o cadastro.')
                console.warn()
            }
        } catch (e) {
            console.warn(e)
        }
    }

    render() {

        const validacoes = []
        validacoes.push(this.state.nome.trim())
        validacoes.push(this.state.email && this.state.email.includes('@'))
        validacoes.push(this.state.senha && this.state.senha.length >= 5)
        validacoes.push(this.state.senha === this.state.confirmSenha)

        const fomularioValido = validacoes.reduce((t, a) => t && a)

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.viewTitulo}>
                    <TouchableOpacity style={styles.botaoDrawer} activeOpacity={0.4} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars' size={26} color='#fff'/>
                    </TouchableOpacity>
                    <Text style={styles.textoTitulo}>Cadastro de Usuários</Text>
                </View>
                <View style={styles.viewForm}>
                    <View style={styles.form}>
                        <Text style={styles.textoForm}>Insira todas as informações</Text>
                        <TextInput style={styles.inputNome} placeholder='Insira o nome' value={this.state.nome} onChangeText={(nome) => this.setState({ nome })}/>
                        <TextInput style={styles.inputEmail} placeholder='Insira o email' value={this.state.email} onChangeText={(email) => this.setState({ email })}/>


                        <View style={styles.senha}>

                            <TextInput secureTextEntry={this.state.visuSenha} style={styles.inputSenha} placeholder='Insira a senha' value={this.state.senha} onChangeText={(senha) => this.setState({ senha })}/>

                            <TouchableOpacity activeOpacity={0.4} onPress={() => this.mostrarSenha()}>
                                <Icon style={{marginRight: 10}} name={this.state.visuSenha ? 'eye' : 'eye-slash'} size={21} color='#222'/>
                            </TouchableOpacity>

                        </View>


                        <View style={styles.senha}>

                            <TextInput secureTextEntry={this.state.visuConfirmSenha} style={styles.inputConfirmSenha} placeholder='Confirme a senha' value={this.state.confirmSenha} onChangeText={(confirmSenha) => this.setState({ confirmSenha })}/>

                            <TouchableOpacity activeOpacity={0.4} onPress={() => this.mostrarConfirmSenha()}>
                                <Icon style={{marginRight: 10}} name={this.state.visuConfirmSenha ? 'eye' : 'eye-slash'} size={21} color='#222'/>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={() => this.cadastrar()} activeOpacity={0.4} disabled={!fomularioValido} 
                        style={[styles.botaoCadastrar, fomularioValido ? {} : { backgroundColor: '#AAA' }]}>

                            <Text style={styles.textoCadastrar}>Cadastrar</Text>

                        </TouchableOpacity>

                    </View>
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
    viewForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    form: {
        borderWidth: 1,
        borderColor: '#111',
        borderRadius: 15,
        padding: 15,
        width: '85%',
        alignItems: 'center',
    },
    textoForm: {
        fontSize: 23,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#222',
    },
    inputNome: {
        width: '87%',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 15
    },
    inputEmail: {
        width: '87%',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 15
    },
    inputSenha: {
        flex: 1,
        paddingLeft: 15,
        fontSize: 14.3,
    },
    inputConfirmSenha: {
        flex: 1,
        paddingLeft: 15,
        fontSize: 14.3,
        fontFamily: 'OpenSans-Regular'
    },
    senha: {
        width: '87%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15

    },
    confirmSenha: {
        width: '87%',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'

    },
    botaoCadastrar: {
        
        paddingHorizontal: 25,
        paddingVertical: 15,
        backgroundColor: '#32b106',
        borderRadius: 15
    },
    textoCadastrar: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }

})