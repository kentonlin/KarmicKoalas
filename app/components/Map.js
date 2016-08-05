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
      route: [{latitude: 37.33756603, longitude: -122.02681114}, {latitude: 37.34756603, longitude: -122.02581114}],
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
          console.log("Data from server", data);
          this.updateUsersArray(data)
        } );

        console.log('Users!!!', this.state.users);
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
  updateUsersArray(object){
    var exist = false;
    if(this.state.users.length){
      for(var x = 0; x < this.state.users.length; x++){
        if(this.state.users[x].title === object.title){
          this.state.users[x].latitude = object.latitude;
          this.state.users[x].longitude = object.longitude;
          exist = true;
        }
      }
      if(!exist) this.state.users.push(object);
    } else {
      this.state.users.push(object);
    }
    this.setState({
        users: this.state.users
     })
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
