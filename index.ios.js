'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS, View, Text, TouchableHighlight, TextInput, TabBarIOS, AlertIOS } from 'react-native';

import Main from './app/components/Main'
import Welcome from './welcome.ios'
import More from './more.ios'
import SignUp from './app/components/SignUp'
import SocketView from './app/utils/sockets'
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'

class KarmicKoalas extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
      <TabBarIOS.Item 
        selected={this.state.selectedTab === 'welcome'}
        icon={{uri: 'featured'}}
        onPress={() => {
            this.setState({
              selectedTab: 'welcome',
            });
        }}>
        <Welcome />
      </TabBarIOS.Item>

      <TabBarIOS.Item 
        selected={this.state.selectedTab === 'more'}
        icon={{uri: 'contacts'}}
        onPress={() => {
            this.setState({
              selectedTab: 'more',
            });
        }}>
        <More />
      </TabBarIOS.Item>

      <TabBarIOS.Item 
        selected={this.state.selectedTab === 'SignUp'}
        icon={{uri: './app/assets/google_maps_icon'}}
        onPress={() => {
            this.setState({
              selectedTab: 'SignUp',
            });
        }}>
        <SignUp />
      </TabBarIOS.Item>

      <TabBarIOS.Item 
        selected={this.state.selectedTab === 'Main'}
        icon={{uri: 'contacts'}}
        onPress={() => {
            this.setState({
              selectedTab: 'Main',
            });
        }}>
        <Main />
      </TabBarIOS.Item>
      </TabBarIOS>
      
    );
  }
}

          // NavigatorIOS
          // initialRoute={{
          //   component: Main,
          //   title: 'Killa Koala',
          // }}
          // style={{flex: 1}}
        
          // initialRoute={{
          //   component: SignUp,
          //   title: 'Sign Up and Enjoy Killa Koala',
          //   // component: Main,
          //   // title: 'Killa Koala',
          // }}
          // style={{flex: 1}}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   welcome: {
//     fontSize: 20,
//     color:'#fff',
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('KarmicKoalas', () => KarmicKoalas);
