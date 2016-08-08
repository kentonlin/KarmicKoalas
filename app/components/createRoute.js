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
      pins: [{}]
    }
    this.createNewPin = this.createNewPin.bind(this);
    this.checkPinCoordinates = this.checkPinCoordinates.bind(this);
    this.changeCoordinatesAfterDrop = this.changeCoordinatesAfterDrop.bind(this);
    this._onPressButtonPOST = this._onPressButtonPOST.bind(this);
  }

  onRegionChangeComplete(e) {
    regionText.latitude = e.latitude;
    regionText.longitude = e.longitude
  }

  createNewPin() {
     var pin = { latlng: {latitude: regionText.latitude, longitude: regionText.longitude }, key: count};
     this.state.pins[0][pin.key] = pin;
     count++
    // console.log('TEST', this.state.pins);
     this.setState({})
     console.log('id', count);
  }
  changeCoordinatesAfterDrop(e, key) {
     this.state.pins[0][key]['latlng'] = e.nativeEvent.coordinate
     this.setState({});
  }
  checkPinCoordinates() {
     console.log('PIN', this.state.pins[0]['0'], this.state.pins[0]['1']);
  }

  _onPressButtonPOST(start, end){
    var startCoord = start.latlng.latitude + ',' + start.latlng.longitude;
    var endCoord = end.latlng.latitude + ',' + end.latlng.longitude;
    console.log('send to back', startCoord, endCoord);
     fetch("/getRouteFromGoogle", {method: "POST", body: JSON.stringify({start: startCoord, end: endCoord})})
     .then((response) => response.json())
     .then((responseData) => {
       console.log('DATA FROM SERVER', responseData)
        //  AlertIOS.alert(
        //      "POST Response",
        //      "Response Body -> " + JSON.stringify(responseData.body)
        //  )
     })
     .done();
 }

  render() {
    return (
      <View style={styles.container}>
          <MapView
            style={styles.map}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {Object.keys(this.state.pins[0]).map(id => (
              <MapView.Marker
                key={this.state.pins[0][id].key}
                coordinate={this.state.pins[0][id].latlng}
                onDragEnd={(e) => this.changeCoordinatesAfterDrop(e, this.state.pins[0][id].key)}
                draggable
              />
            ))}
         </MapView>
         <View>
         <TouchableOpacity
           style={styles.buttonPin}
           onPress={() => this.createNewPin()}
          >
          <Text>PIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCheck}
          onPress={() => this._onPressButtonPOST(this.state.pins[0]['0'], this.state.pins[0]['1'])}
         >
        <Text>Check</Text>
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
  buttonPin: {
    bottom:10,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonCheck: {
    flex: 1,
    bottom:10,
    left:70,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  }
});

module.exports =  createRoute;
