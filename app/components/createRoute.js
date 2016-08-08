'use strict'

import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Dimensions, Text, AlertIOS, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window')

var count = 0;
var regionText = {
  latitude: '0',
  longitude: '0'
};

class createRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: { latitude: 40.8534229, longitude: -73.9793236 },
      routeCoordinates: [],
      pins: []
    }
    this.createNewPin = this.createNewPin.bind(this);
  }

  onRegionChangeComplete(e) {
    regionText.latitude = e.latitude;
    regionText.longitude = e.longitude
  }

  createNewPin() {
     var pin = { latlng: {latitude: regionText.latitude, longitude: regionText.longitude }, key: count};
     this.state.pins.push(pin);
     count++
    // console.log('TEST', this.state.pins);
     this.setState({})
     console.log('id', count);
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView
            style={styles.map}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {this.state.pins.map(pin => (
              <MapView.Marker
                coordinate={pin.latlng}
                onDragEnd={(e) => this.setState({ init: e.nativeEvent.coordinate })}
                draggable
              />
            ))}
         </MapView>
         <View>
         <TouchableOpacity onPress={() => this.createNewPin()}>
             <Text>Info</Text>
        </TouchableOpacity>
        </View>
      </View>
      );
   }
}

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
  buttonStart: {
    flex: 1,
    bottom:10,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonEnd: {
    flex: 1,
    bottom:10,
    left:75,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

module.exports =  createRoute;
