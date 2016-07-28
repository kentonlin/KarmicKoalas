
import React, { Component } from 'react';
import {
  Text,
  View,
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
