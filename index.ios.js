'use strict'

import React, { Component } from 'react'

import { AppRegistry, View, StyleSheet, NavigatorIOS, Text } from 'react-native';

import ViewContainer from './app/components/ViewContainer'
import Main from './app/components/Main'
import SignUp from './app/components/SignUp'
var SocketView = require('./app/utils/sockets');


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
