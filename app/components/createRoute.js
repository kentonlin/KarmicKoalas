'use strict'

import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, MapView, Dimensions, Text, AlertIOS, TextInput, TouchableHighlight } from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 1,
    width: width,
    height: height
  },
  buttonText: {
    fontSize: 18,
    color: 'green',
    alignSelf: 'center'
  },
  button: {
    flex: 1,
    bottom:10,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

class createRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeCoordinates: [ { latitude: 40.8534229, longitude: -73.9793236 },
                           { latitude: 40.85231599999999, longitude: -73.98040999999999 },
                           { latitude: 40.850477, longitude: -73.977189 },
                           { latitude: 40.8261501, longitude: -73.98740600000001 },
                           { latitude: 40.8072041, longitude: -73.99227619999999 },
                           { latitude: 40.8042829, longitude: -73.9933009 },
                           { latitude: 40.788616, longitude: -74.0004103 },
                           { latitude: 40.7826662, longitude: -74.0081575 },
                           { latitude: 40.78164, longitude: -74.00747609999999 },
                           { latitude: 40.7771486, longitude: -74.01102 },
                           { latitude: 40.7767594, longitude: -74.0109413 },
                           { latitude: 40.7765525, longitude: -74.0105198 },
                           { latitude: 40.7765499, longitude: -74.0099082 },
                           { latitude: 40.7606329, longitude: -74.00324499999999 },
                           { latitude: 40.7606707, longitude: -74.0029519 },
                           { latitude: 40.760857, longitude: -74.00268179999999 },
                           { latitude: 40.7543392, longitude: -73.9869051 },
                           { latitude: 40.7491863, longitude: -73.9881872 },
                           { latitude: 40.7489953, longitude: -73.9880316 },
                           { latitude: 40.7466059, longitude: -73.9885128 } ],
      pins: [ { latitude: 40.7466059, longitude: -73.9885128 }]
    }
    this.createNewPin = this.createNewPin.bind(this);
  }

  createNewPin() {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         var pin = { latitude: position.coords.latitude, longitude: position.coords.longitude };
         this.state.pins.push(pin);
        // console.log('find pins',this.state.pins);
         this.setState({

          })
      //   this.state.pins.push(pin);
         console.log('find pins',this.state.pins);
       },
       (error) => alert(error.message),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     )
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          annotations={this.state.pins}
          showsUserLocation={true}
          followUserLocation={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: 'red',
            lineWidth: 3,
          }]}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {this.createNewPin()}}>
          <Text>Create Pin</Text>
        </TouchableHighlight>
      </View>
      );
   }
}

module.exports =  createRoute;
