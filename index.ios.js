var Main = require('./app/components/Main');
<<<<<<< 7d18257a638eb7c87392486bb5ebd41d3cf66712
var SocketView = require ('./app/utils/sockets')
=======
var SignUp = require('./app/components/SignUp');
>>>>>>> Need to rebase

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  TextInput,
  AlertIOS,
  View
} from 'react-native';

class KarmicKoalas extends Component {
  render() {
    return (
      <NavigatorIOS
          initialRoute={{
            component: Main,
<<<<<<< b66356dcea859ba8f137e74b22dfdd3dc12070e7
            title: 'Killa Koala',
            component: Main,
=======
>>>>>>> foo
            title: 'My Initial App View',
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
