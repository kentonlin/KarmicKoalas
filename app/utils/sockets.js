import React, { Component } from 'react';
var userAgent = require ('./userAgent');
var io = require ('socket.io-client/socket.io');
import {
  Text,
  View,
  MapView,
  StyleSheet, 
  TextInput,
  TouchableHighlight
} from 'react-native';

console.log('loadin  g')
class Sockets extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('ws://localhost:3000');
    this.socket.emit('location', { my: 'data' });
    this.socket.on('location', function (data) { console.log('data',data) })
    this.state = {
      location: "Baltimore"
    }
   }
  ComponentDidMount(){
    this.socket.emit('location', 'foo');
  }
  handleChange(e){
    this.setState({
        location:e.nativeEvent.text
    })
    //for speed testing.. not ona button  this.state.location
      this.socket.emit('location', 'foo');
  }

  render(){
    return (
      <View>
        
        <TextInput
            style={styles.searchInput}
            value={this.state.location}
            onChange={this.handleChange.bind(this)} ></TextInput>
        <TouchableHighlight onPress={() => {
            this.socket.emit('location', this.state.location);
            this.setState({location:''}) 
        }}><Text>Location: {this.state.location}</Text></TouchableHighlight>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  searchInput: {
    fontSize: 20,
    height: 50,
    backgroundColor: '#000',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});

module.exports = Sockets;  
