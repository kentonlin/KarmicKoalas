'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight, AsyncStorage } from 'react-native';
import Chat from './chat'
import MapComponent from './Map.js'
import SignUp from './SignUp'

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}
const io = require('socket.io-client/socket.io');
import userAgent from '../utils/userAgent'

// import io from 'socket.io-client/socket.io'

const { width, height } = Dimensions.get('window')

class Main extends Component {

  constructor(props) {
    super(props);
    this.socket = io('https://wegoios.herokuapp.com',  {jsonp: false, transports:['websocket'], allowUpgrades:true});
    this.state = {
      eventId: '1',//eventId: props.eventId,   //this will come from group list view and pass to server
      socket:this.socket
    }
    AsyncStorage.setItem("signedUp", "false");
    AsyncStorage.getItem("signedUp").then((value) => {
      if(value !== "true"){
        this.renderSignUp();
      console.log("signedUp:", value)
      }
    });
  }

  renderSignUp(){
    this.props.navigator.push({
      component: SignUp,
      title: "Sign Up"
    });
  }

   componentDidMount() {
      this.state.socket = this.socket
      this.socket.emit('intitialize',{eventId:this.state.eventId})
 }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent socket={this.state.socket}/>
        <Chat socket={this.socket}/>
        <TouchableHighlight
          style={styles.button1}
          onPress={() => {alert('Hello1')}}>
          <Text>Create new pin</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button2}
          onPress={() => {alert('Hello2')}}>
          <Text>Create new pin</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button1: {
    flex: 1,
    bottom:0,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  button2: {
    flex: 1,
    bottom: 0,
    left: 120,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12
  }
})

module.exports = Main;
