'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class TopNavigation extends Component {
	constructor(props) {
    super(props)
    this.state = {
      
    }
  }
	render() {
		return (
			<View>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Create Route</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Search Routes</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>See Groups</Text>
        </TouchableHighlight>
			</View>
			)
	}
};

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
      height: 20,
      flexDirection: 'row',
      backgroundColor: 'skyblue',
      justifyContent: 'center'
    }
});

module.exports =  TopNavigation;	