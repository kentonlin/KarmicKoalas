'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, StatusBarIOS, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import haversine from 'haversine'
import pick from 'lodash/pick'
import pin from '../icons/pin.png'

const { width, height } = Dimensions.get('window')

class MapComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      routeCoordinates: this.props.routeCoordinates,
      distanceTravelled: 0,
      prevLatLng: {},
      users: [],
      region: this.props.start,
      toggle: false,
      test: [{title: "TEST", latitude: 37.55992988, longitude: -122.3826562}],
      route: [{latitude: 37.33756603, longitude: -122.02681114}, {latitude: 37.34756603, longitude: -122.02581114}],
      groupOfUsers: {},
     }
     this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  componentDidMount() {
    //  this.playEvent(this.props.eventId);
      // this.setState({
      //     region: this.props.start
      //  })
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
        console.log('PIN START', this.props.pinStart)
        const { routeCoordinates, distanceTravelled } = this.state
        const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
        const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
        //console.log('target', positionLatLngs);
        if(this.state.toggle){
          this.setState({
              routeCoordinates: routeCoordinates.concat(positionLatLngs)
           })
        }
        this.setState({
            distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
            prevLatLng: newLatLngs
         })
         console.log(this.props.username);
        this.props.socket.emit('location', {'title': this.props.username, 'eventId': this.props.eventId, 'latitude': this.state.prevLatLng.latitude, 'longitude': this.state.prevLatLng.longitude})
        this.props.socket.on('groupUpdate',(data) =>  {
          console.log("Server Data", data);
          this.updateUsersArray(data)
          // this.state.users[0][data.title] = data;
          // this.setState({})
        } );
        console.log('Users!!!', this.state.users);
      },
      (error) => alert(error.message),
      {maximumAge: 1000, timeout: 200000000, enableHighAccuracy: true}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance(newLatLng) {
     const { prevLatLng } = this.state
     return (haversine(prevLatLng, newLatLng) || 0)
  }
  // playEvent(eventId){
  //   console.log('Event ID', eventId);
  //    fetch("http://localhost:8000/getRouteById", {method: "POST", headers: {'Content-Type': 'application/json'} ,body: JSON.stringify({event_id: eventId})})
  //    .then((response) => response.json())
  //    .then((responseData) => {
  //      console.log('SERVER', responseData);
  //      this.setState({routeCoordinates: JSON.parse(responseData.route_object)});
  //      this.props.initializesEvent(eventId)
  //    })
  //    .done();
  //  }
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
    this.props.informParent(e)
  }

  render() {
    return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.props.start}
            showsUserLocation={true}
            followUserLocation={false}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
          {this.state.users.map(user => (
            <MapView.Marker
              key={user.title}
              title={user.title}
              coordinate={{latitude: user.latitude, longitude:user.longitude}}
            />
          ))}
            <MapView.Marker
              title={'Start'}
              image={pin}
              coordinate={this.props.pinStart}
            />
            <MapView.Marker
              title={'Finish'}
              coordinate={this.props.pinEnd}
            />
          <MapView.Polyline
           coordinates={this.props.routeCoordinates}
           strokeColor="rgba(0,0,200,0.5)"
           strokeWidth={3}
           lineDashPattern={[5, 2, 3, 2]}
         />
          </MapView>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {this.setState({routeCoordinates: [], toggle: true})}}>
          <Text>Route</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonStop}
          onPress={() => {this.setState({routeCoordinates: [], toggle: false})}}>
          <Text>Clear</Text>
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
  buttonStop: {
    flex: 1,
    bottom:100,
    left: 150,
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
