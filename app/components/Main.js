'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight } from 'react-native';
import Chat from './chat'
import MapComponent from './Map.js'

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
  }
})

module.exports = Main;
