import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
  Keyboard
} from 'react-native';

import axios from 'axios'
import { server } from '../config/server'
import Icon from 'react-native-vector-icons/FontAwesome5'

import imgLupa from '../images/Lupa.png'

export default class Consulta extends Component {
  state = {
    usuarios: [],
    nome: '',
    buscador: ''
  }

  componentDidMount = async () => {
    try {

      await axios.get(`${server}/usuarios/selecionar/*/225tudo*`)
      .then(res => {
        const usuarios = res.data;
        this.setState({ usuarios })
      })
    } catch (e) {
      console.warn('ERRO'+e)
    }
    
  }


  carregar = async () => {

    if(this.state.buscador.trim() === '') {
      this.componentDidMount()
    } else {

      Keyboard.dismiss()
      try {

        await axios.get(`${server}/usuarios/selecionar/*/${this.state.buscador}`)
        .then(res => {
          const usuarios = res.data;
          this.setState({ usuarios })
        })
      } catch (e) {
        console.warn('ERRO'+e)
      }

      this.setState({ buscador: '' })
    }
  }

  apertouDemais() {
    Alert.alert('Ops!', 'Você apertou por muito tempo!')
  }

  avatar(nome) {
    let letra = `${nome.substr(0, 1)}`

    return <View style={styles.avatarView}><Text style={styles.avatarLetra}>{letra}</Text></View>
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewBusca}>

          <TouchableOpacity style={styles.botaoDrawer} activeOpacity={0.4} onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='bars' size={26} color='#fff'/>
          </TouchableOpacity>

          <Text style={styles.texto}>Consulta de usuários</Text>

          <TextInput value={this.state.buscador} placeholder='Digite sua busca' style={styles.inputBusca} onChangeText={(buscador) => this.setState({ buscador })} />

          <TouchableOpacity activeOpacity={0.4} onPress={() => this.carregar()} onLongPress={this.apertouDemais} style={styles.botao}>
            <Text style={styles.botaoText}>Pesquisar</Text>
            <Icon style={{marginRight: 13}} name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        

        
        {this.state.usuarios.length ? 
              <FlatList 
                data={this.state.usuarios}
                renderItem={({item}) => <View style={styles.itemLista}>{this.avatar(item.nome)}<View><Text style={styles.nomeLista}>{item.nome}</Text><Text style={styles.emailLista}>{item.email}</Text></View></View>}
              />
              :
              <View style={styles.viewSemResultados}>
                <ImageBackground source={imgLupa} style={styles.imgLupa}/>
                
                <Text style={styles.textSemResultados}>
                  Sem resultados
                </Text>
              </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  botaoDrawer: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: 15
  },
  texto: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 20
  },
  imgLupa: {
    width: 170,
    height: 170,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#444',
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  botaoText: {
    fontSize: 20,
    color: '#fff',
    padding: 15
  },
  viewBusca: {
    backgroundColor: '#222',
    alignItems: 'center',
    paddingVertical: 25
  },
  inputBusca: {
    backgroundColor: '#fff',
    width: '70%',
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  itemLista: {
    borderBottomColor: 'rgba(0,0,0,.35)',
    borderBottomWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  nomeLista: {
    fontSize: 22
  },
  emailLista: {
    fontSize: 18,
    color: '#555'

  },
  viewSemResultados: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSemResultados: {
    color: '#000',
    fontSize: 30
  },
  avatarView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#111'
  },
  avatarLetra: {
    fontSize: 27,
    color: '#fff'
  }
});
