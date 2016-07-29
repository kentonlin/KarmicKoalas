
import React, { Component } from 'react';
import {
  Text,
  View,
  MapView,
  StyleSheet
} from 'react-native';

class Main extends Component {
  render() {
    console.log('HELLO');
    debugger;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Our first component!!! :)
        </Text>
        <MapView
        style={{height: 200, width: 400}} showsUserLocation={true}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});

module.exports = Main;
