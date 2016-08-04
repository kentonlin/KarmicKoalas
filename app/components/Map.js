'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight } from 'react-native';
import haversine from 'haversine'
import pick from 'lodash/pick'

const { width, height } = Dimensions.get('window')

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Konstantin-desktop',
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      users: [],
      groupOfUsers: {},
     }
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("CURRENT POSITION", position);
      //    this.props.socket.emit('location', {'title': 'Konstantin-desktop', 'latitude': position.coords.latitude, 'longitude': position.coords.longitude});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )

      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
        console.log(position);
        const { routeCoordinates, distanceTravelled } = this.state
        const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
        const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
        this.setState({
            routeCoordinates: routeCoordinates.concat(positionLatLngs),
            distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
            prevLatLng: newLatLngs
         })
        this.props.socket.emit('location', {'title': this.state.currentUser, 'latitude': this.state.prevLatLng.latitude, 'longitude': this.state.prevLatLng.longitude});
        this.props.socket.on('groupUpdate',(data) =>  {
          console.log("Group Data from server", data);
          if(data.title !== this.state.currentUser) this.state.groupOfUsers[data.title] = data;
        } );
        console.log('groupOfUsers', this.state.groupOfUsers);

        this.state.users = this.updateUsersLocations(this.state.groupOfUsers);
        console.log('Users!!!', this.state.users);
      },
      (error) => alert(error.message),
      {maximumAge: 1000, timeout: 3000, enableHighAccuracy: true}
    );3
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance(newLatLng) {
     const { prevLatLng } = this.state
     return (haversine(prevLatLng, newLatLng) || 0)
  }
  //function update user array for annotations
  updateUsersLocations(object){
    var newUsersArray = [];
    for(var key in object){
      newUsersArray.push(object[key]);
    }
    return newUsersArray
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          annotations={this.state.users}
          annotations={this.state.users}
          showsUserLocation={true}
          followUserLocation={false}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: 'red',
            lineWidth: 3,
          }]}
        />
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
   button: {
    padding: 10,
    width:70,
    left:320,
    right: 10,
    top: 0
  },
  navBar: {
    backgroundColor: 'grey',
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navBarText: {
    color: '#19B5FE',
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    paddingTop: 30
  },
  map: {
    flex: 0.7,
    width: width,
    height: height
  },
  bottomBar: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bottomBarGroup: {
    flex: 1
  },
  bottomBarHeader: {
    color: '#fff',
    fontWeight: "400",
    textAlign: 'center'
  },
  bottomBarContent: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
    color: '#19B5FE',
    textAlign: 'center'
  },
})

module.exports = MapComponent;
