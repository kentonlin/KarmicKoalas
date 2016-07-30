'use strict'

import React, { Component } from 'react'

import { AppRegistry, View, StyleSheet, NavigatorIOS, Text } from 'react-native';

import ViewContainer from './app/components/ViewContainer'
import Main from './app/components/Main'
import SignUp from './app/components/SignUp'
<<<<<<< 5fa5c18bf979df24db749e72fc17c0a3a11f68fb
import Socketview from './app/utils/sockets'

=======
import StatusBarBackground from './app/components/StatusBarBackground'
>>>>>>> Socket Changes - Need to Rebase

class KarmicKoalas extends Component {
  render() {
    return (
      <NavigatorIOS
          initialRoute={{
            component: Main,
            title: 'Killa Koala',
            component: Main,
            title: 'My Initial App View',
          }}
          style={{flex: 1}}
        />
      <ViewContainer>
        <StatusBarBackground />
        <Text>{`Hello from Inside the ViewContainer`}</Text> 
      </ViewContainer>
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
