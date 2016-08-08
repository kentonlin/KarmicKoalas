import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Dimensions, Text, AlertIOS, TextInput, TouchableHighlight } from 'react-native';

const { width, height } = Dimensions.get('window');

class createEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    console.log("TEST:", this.props.test);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Create an Event
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
    backgroundColor: '#F5FCFF'
  },
  buttonText: {
    fontSize: 18,
    color: 'green',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports =  createEvent;
