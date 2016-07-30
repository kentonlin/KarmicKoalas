'use strict'

import {AppRegistry, Component, View, StyleSheet, NavigatorIOS, Text} from 'react-native';

import ViewContainer from './app/components/ViewContainer'
import Main from './app/components/Main'
import SignUp from './app/components/SignUp'
import Socketview from './app/utils/sockets'


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
