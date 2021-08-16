import React from 'react'
import { Platform, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['authorization']
        
        AsyncStorage.removeItem('dadosAsync')
        props.navigation.dispatch(
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

    return (
        <DrawerContentScrollView style={{paddingHorizontal: 3}}>
            <View style={styles.header}>
                <Text style={styles.title}>Consulta Usuários</Text>
                <View style={styles.userInfo}>

                    <View style={styles.viewNome}>
                        <Icon style={{marginRight: 10}} name="user" size={27} color="#000" />
                        <Text style={styles.nome}>
                            {props.nome}
                        </Text>
                    </View>

                    <View style={styles.viewEmail}>
                        <Icon style={{marginRight: 10}} name="at" size={27} color="#000" />
                        <Text style={styles.email}>
                            {props.email}
                        </Text>
                    </View>

                </View>
                <TouchableOpacity style={styles.botaoSair} onPress={logout}>
                    <Text style={styles.textoSair}>Sair</Text>
                    <Icon style={{marginLeft: 7}} name="sign-out" size={27} color="#B40404" />
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10,
        fontWeight: 'bold'
    },
    userInfo: {
        marginLeft: 10,
    },
    viewNome: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewEmail: {

        flexDirection: 'row',
        alignItems: 'center',
    },
    nome: {
        fontSize: 22,
        color: '#000',
        marginBottom: 5,
        alignItems: 'center'
    },
    email: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
        alignItems: 'center'
    },
    botaoSair: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textoSair: {
        fontSize: 18,
        color: '#B40404',
        fontWeight: 'bold'
    }
})