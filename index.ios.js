'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS, View, Text, TouchableHighlight, TextInput, AlertIOS } from 'react-native';

import Main from './app/components/Main'
import SignUp from './app/components/SignUp'
import SocketView from './app/utils/sockets'
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'

class KarmicKoalas extends Component {
  render() {
    return (
      <NavigatorIOS
          initialRoute={{
            component: Main,
            title: 'Killa Koala',
          }}
          style={{flex: 1}}
        
        initialRoute={{
           component: Main,
           title: 'Killa Koala'
        initialRoute={{
          component: SignUp,
          title: 'Sign Up and Enjoy Killa Koala',
          // component: Main,
          // title: 'Killa Koala',
        }}
        style={{flex: 1}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    color:'#fff',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('KarmicKoalas', () => KarmicKoalas);
