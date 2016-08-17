'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight } from 'react-native';
if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}
const { width, height } = Dimensions.get('window')

class Chat extends Component {

  constructor(props) {
    super(props);
    this.socket = props.socket
    this.eventId = props.eventId
    this.state = {
      username: props.username,
      eventId: props.eventId,
      message: props.message,
      socket:props.socket,
      incomingMessage: props.incomingMessage
     }
  }

  componentDidMount() {
    console.log('mounted socket, eventid',this.state.socket, this.eventId)
    //this.state.socket = props.socket

    //this.socket.emit('intitialize',{eventId:this.state.eventId})
    console.log('intialaze client side')


    this.socket.on('tweet', (data) => {
      console.log("Chat message from server", data);
       this.setState({
         incomingMessage: data
       });
    });
   }

  handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
      var message = this.state.message + ' -' + this.state.username;
      console.log('sending tweet', message, this.props.eventId)
    this.socket.emit('tweet', {'text':message, 'eventId': this.props.eventId})
    this.state.message = "";
    }
  }

  render() {
    return (
        <View style={styles.navBar}>
          <TextInput
             onKeyPress={this.handleKeyDown.bind(this)}
             placeholder="Send a Message to the Group"
             autoFocus = {true}
             style={styles.chat}
             onChangeText={(message) => this.setState({message})}
             value={this.state.message}/>
           <Text style={styles.chatIn}>
               {this.state.incomingMessage}
           </Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
    chatIn: {
    width: width-20,
    padding:5,
    marginLeft:10,
    marginRight:10,
    backgroundColor: 'white',
    top:40,
    color: '#19B5FE',
    padding: 8,
  },
  chat: {
    marginLeft:10,
    marginRight:10,
    height: 40,
    width: width-4,
    padding: 5,
    marginTop:5,
    marginLeft:2,
    marginRight:2,
    color: "#3498db",
    backgroundColor: '#fff',
    borderColor: "#3498db",
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  navBar: {
    width: width,
    position: 'absolute',
    top: 40
  }
})

module.exports = Chat;
