
import React, { Component } from 'react'
import haversine from 'haversine'
import pick from 'lodash/pick'
var socket = require ('../utils/sockets')
var userAgent = require ('./userAgent');
var io = require ('socket.io-client/socket.io');

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  MapView,
  Dimensions,
  StatusBarIOS
} from 'react-native'

const { width, height } = Dimensions.get('window')

class Main extends Component {

  constructor(props) {
    super(props);
    this.socket = io.connect('http://localhost:3001', {jsonp: false});
    this.state = {
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {}
     }
  }

  componentDidMount() {
  // StatusBarIOS.setStyle('light-content')

  navigator.geolocation.getCurrentPosition(
    (position) => console.log(position),
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  )
  this.watchID = navigator.geolocation.watchPosition((position) => {
    console.log(position);
    const { routeCoordinates, distanceTravelled } = this.state
     const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
    const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
    this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs
     })
    console.log(this.state.distanceTravelled);
    this.socket.emit('location', {'cordinates': this.state.prevLatLng});
  });
}

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance(newLatLng) {
     const { prevLatLng } = this.state
     return (haversine(prevLatLng, newLatLng) || 0)
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Our first component!!! :)
        </Text>
        <MapView
          style={styles.map}

          showsUserLocation={true}
          followUserLocation={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: 'blue',
            lineWidth: 8,
          }]}
        />
        <View style={styles.navBar}><Text style={styles.navBarText}>Killa Koala</Text></View>
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
  navBar: {
    backgroundColor: 'rgba(0,0,0,0.7)',
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

module.exports = Main;
