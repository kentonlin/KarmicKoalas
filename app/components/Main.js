'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight } from 'react-native';
import Chat from './chat'
import MapComponent from './Map.js'
//import haversine from 'haversine'
//import pick from 'lodash/pick'
//import socket from '../utils/sockets'

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}
const io = require('socket.io-client/socket.io');
// import userAgent from '../utils/userAgent'
// import io from 'socket.io-client/socket.io'


const { width, height } = Dimensions.get('window')

class Main extends Component {

  constructor(props) {
    super(props);
    //this.socket = io.connect('https://wegoios.herokuapp.com',  {jsonp: false, transports:['websocket'], allowUpgrades:true});
    this.socket = io('https://wegoios.herokuapp.com',  {jsonp: false, transports:['websocket'], allowUpgrades:true});
    this.state = {
      // routeCoordinates: [],
      // distanceTravelled: 0,
      // prevLatLng: {},
      // users: [],
      // tweets: [],
      groupId: '1',//groupId: props.groupId,   //this will come from group list view and pass to server
      // message: " ",
      socket:this.socket
      // groupOfUsers: {},
      // incomingMessage: " "
     }
  }

   componentDidMount() {
//       console.log('mounted')
      this.state.socket = this.socket
//       // StatusBarIOS.setStyle('light-content')
       this.socket.emit('intitialize',{groupId:this.state.groupId})
//       console.log('intialaze client side')
//       navigator.geolocation.getCurrentPosition(
//         (position) => console.log(position),
//         (error) => alert(error.message),
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//       )
//       this.watchID = navigator.geolocation.watchPosition((position) => {
//         console.log(position);
//         const { routeCoordinates, distanceTravelled } = this.state
//         const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
//         const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
//         this.setState({
//             routeCoordinates: routeCoordinates.concat(positionLatLngs),
//             distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
//             prevLatLng: newLatLngs
//          })
//         console.log('ROUT OBJECT', this.state.routeCoordinates);
//         this.socket.emit('location', {'title': 'Konstantin-mobile', 'latitude': this.state.prevLatLng.latitude, 'longitude': this.state.prevLatLng.longitude});
//         //this.state.users = [this.state.prevLatLng];
//
//         this.socket.on('groupUpdate',(data) =>  {
//           console.log("Group Data from server", data);
//           this.state.groupOfUsers[data.title] = data;
//         } );
//         //this.state.users = [{'latitude': this.state.prevLatLng.latitude, 'longitude': this.state.prevLatLng.longitude, 'title': 'Konst' }, {'latitude': this.state.prevLatLng.latitude + 0.0008, 'longitude': this.state.prevLatLng.longitude, 'title': 'Bo' }];
//         console.log('groupOfUsers', this.state.groupOfUsers);
//         //function update user array for annotations
//         function updateUsersLocations(object){
//           var newUsersArray = [];
//           for(var key in object){
//             newUsersArray.push(object[key]);
//           }
//           return newUsersArray
//         }
//         this.state.users = updateUsersLocations(this.state.groupOfUsers);
//         console.log('Users!!!', this.state.users);
//       });
 }
//
//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }
//
//   calcDistance(newLatLng) {
//      const { prevLatLng } = this.state
//      return (haversine(prevLatLng, newLatLng) || 0)
//   }



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
