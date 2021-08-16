import React from 'react';
import { SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Consulta from './screens/Consultar'
import Login from './screens/Login'
import Cadastro from './screens/Cadastro'
import Home from './screens/Home'
import Menu from './screens/Menu'
import LoginOuHome from './screens/LoginOuHome'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const menuConfig = {
  labelStyle: {
      fontWeight: 'normal',
      fontSize: 20
  },
  activeTintColor: '#111',
}

const TelaConsulta = props => {
  const { nome, email } = props.route.params
  return (
      <Drawer.Navigator drawerContentOptions={menuConfig} drawerContent={(props) => <Menu {...props} email={email} nome={nome} />}>
          <Drawer.Screen name="Home" options={{ title: 'Home' }}>
              {props => <Home {...props} title='Home' />}
          </Drawer.Screen>
          <Drawer.Screen name="Cadastro" options={{ title: 'Cadastro de Usuários' }}>
              {props => <Cadastro {...props} title='Cadastro' />}
          </Drawer.Screen>
          <Drawer.Screen name="Consulta" options={{ title: 'Consulta de Usuários' }}>
              {props => <Consulta {...props} title='Consulta' />}
          </Drawer.Screen>
      </Drawer.Navigator>
  );
};

const TelaLogin = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="LoginOuHome" component={LoginOuHome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TelaConsulta" component={TelaConsulta} />

    </Stack.Navigator>
  )
}

const Navegacao = () => {
  return (
      <NavigationContainer>
        <TelaLogin />
      </NavigationContainer>
  )
}

export default Navegacao