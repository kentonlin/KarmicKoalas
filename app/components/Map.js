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
      region: {
        latitude: 0,
        longitude: 0,
      },
      users: [],
      test: [{title: "TEST", latitude: 37.55992988, longitude: -122.3826562}],
      route: [{latitude: 37.33756603, longitude: -122.02681114}],
      groupOfUsers: {},
     }
     this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("CURRENT POSITION", position);
          this.setState({
              region: { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.020300188024080512, longitudeDelta: 0.016093256407543777 }
           })
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
        //console.log('target', positionLatLngs);
        this.setState({
            routeCoordinates: routeCoordinates.concat(positionLatLngs),
            distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
            prevLatLng: newLatLngs
         })
        this.props.socket.emit('location', {'tintColor': MapView.PinColors.PURPLE,'title': this.state.currentUser, 'latitude': this.state.prevLatLng.latitude, 'longitude': this.state.prevLatLng.longitude});
        this.props.socket.on('groupUpdate',(data) =>  {
          console.log("Group Data from server", data);
        //  if(data.title !== this.state.currentUser)
           this.state.groupOfUsers[data.title] = data;
           this.setState({
               users: this.updateUsersLocations(this.state.groupOfUsers)
            })
        } );
        console.log('groupOfUsers', this.state.groupOfUsers);

        //this.state.users = this.updateUsersLocations(this.state.groupOfUsers);
        console.log('Users!!!', this.state.users);
        console.log('ROUT', this.state.routeCoordinates);
          console.log('region', this.state.region);
      },
      (error) => alert(error.message),
      {maximumAge: 1000, timeout: 3000, enableHighAccuracy: true}
    );
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
  onRegionChangeComplete(e) {
    console.log(e);
    this.setState({
        region: e
     })
  }

  render() {
    return (
        <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          annotations={this.state.users}
          showsUserLocation={true}
          followUserLocation={false}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: 'red',
            lineWidth: 3,
          },
          {
            coordinates: this.state.route,
            strokeColor: '#f007',
            lineWidth: 10,
          }]}

        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {alert('Hello')}}>
          <Text>Create new pin</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  button: {
    flex: 1,
    bottom:100,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  map: {
    flex: 1,
    width: width,
    height: height
  }
})

module.exports = MapComponent;
