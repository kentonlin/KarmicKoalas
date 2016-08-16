'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight, AsyncStorage } from 'react-native';
import Chat from './chat'
import MapComponent from './Map.js'
import searchRoutes from './searchRoutes'
import createRoute from './createRoute'
import myEvents from './myEvents'
import permissions from 'react-native-permissions'

import Contacts from 'react-native-contacts';

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}

const io = require('socket.io-client/socket.io');
import userAgent from '../utils/userAgent'


const { width, height } = Dimensions.get('window')

class Main extends Component {

  constructor(props) {
    super(props);
    // this.navToSearchRoutes = this.navToSearchRoutes.bind(this);
    // this.navToMyEvents = this.navToMyEvents.bind(this);
    // this.navToCreateRoute = this.navToCreateRoute.bind(this);

    this.setEventId = this.setEventId.bind(this);
    this.initializesEvent = this.initializesEvent.bind(this);

    this.socket = io('https://wegotoo.herokuapp.com',  {jsonp: false, transports:['websocket'], allowUpgrades:true});
    this.state = {
      routeCoordinates: [],
      start: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      userId: this.props.userId,
      username: this.props.username,
      eventId: '1',//eventId: props.eventId,   //this will come from group list view and pass to server
      socket: this.socket
    }
    console.log("MAIN:");
    console.log("  eventId:", this.state.eventId);
    console.log("  userId:", this.state.userId);
  }

  setEventId(eventId){
    console.log('Event Id has been changed', eventId);
    this.setState({
      eventId: eventId
    });
    this.playEvent(eventId);
  }

  navToSearchRoutes(){
    this.props.navigator.push({
      component: searchRoutes,
      title: "Search Routes",
      passProps: {
        userId: this.props.userId
      }
    });
  }

  navToMyEvents(){
    this.props.navigator.push({
      component: myEvents,
      title: "Events",
      passProps: {
        setEventId: this.setEventId,
        userId: this.props.userId
      }
    });
  }

  navToCreateRoute(){
    this.props.navigator.push({
      component: createRoute,
      title: "Create Route",
      passProps: {
        userId: this.props.userId,
        username: this.props.username,
        setEventId: this.setEventId
      }
    });
  }
  onRegionChangeComplete(e) {
    console.log(e);
    this.setState({
        start: e
     })
  }

  initializesEvent(eventId){
    //console.log('Connected to Main', eventId, this.state.userId, this.state.username)
    //this.socket.emit('initialize',{eventId: eventId, userId: this.state.userId, username: this.state.username})
    this.socket.emit('initialize',{eventId: eventId})
  }
  playEvent(eventId){
    console.log('Event ID', eventId);
     fetch("http://localhost:8000/getRouteById", {method: "POST", headers: {'Content-Type': 'application/json'} ,body: JSON.stringify({event_id: eventId})})
     .then((response) => response.json())
     .then((responseData) => {
       console.log('SERVER', JSON.parse(responseData.start));
       var parseStart = JSON.parse(responseData.start);
       var newStart = {
         latitude: parseStart.latitude,
         longitude: parseStart.longitude,
         latitudeDelta: 0.020300188024080512,
         longitudeDelta: 0.016093256407543777
       }
       this.setState({
         routeCoordinates: JSON.parse(responseData.route_object),
         start: newStart
       });
       console.log('New Start',this.state.start)
       this.initializesEvent(eventId);
     })
     .done();
   }

  componentDidMount() {
    //this.playEvent(48);
    AsyncStorage.multiGet(["username", "userId"]).then((data) => {
      console.log("Multi Get from Async:", data)
      this.setState({
        username : data[0][1],
        userId: data[1][1]
      })
      //this.socket.emit('initialize',{eventId: this.state.eventId, userId: data[1][1], username: data[0][1]})

    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent informParent={(e)=>this.setState({start: e })} socket={this.state.socket} eventId={this.state.eventId} username={this.state.username} initializesEvent={this.initializesEvent} routeCoordinates={this.state.routeCoordinates} start={this.state.start}/>
        <Chat socket={this.socket} eventId={this.state.eventId}/>
        <TouchableHighlight
          style={styles.searchRoutesBtn}
          onPress={() => this.navToSearchRoutes()}>
          <Text>Search</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.eventsBtn}
          onPress={() => this.navToMyEvents()}>
          <Text>Events</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.createRouteBtn}
          onPress={() => this.navToCreateRoute()}>
          <Text>Create Route</Text>
        </TouchableHighlight>
        <Text style={styles.welcome}>
        </Text>
        <MapView
          style={styles.map}
          annotations={this.state.users}
          showsUserLocation={true}
          followUserLocation={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: 'blue',
            lineWidth: 8,
          }]}
        />
        <View style={styles.navBar}><Text style={styles.navBarText}>WeGoToo</Text></View>
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
  searchRoutesBtn: {
    flex: 1,
    bottom:0,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    bottom: 15
  },
  eventsBtn: {
    flex: 1,
    bottom: 0,
    left: 75,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    bottom: 15
  },
  createRouteBtn: {
    flex: 1,
    bottom: 0,
    left: 150,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    bottom: 15
  }
});

module.exports = Main;
