'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class TopNavigation extends Component {
	constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  _onPressButton() {
    console.log('Groups Button pressed!');


  
    // fetch("http://localhost:3000/test?search=nraboy", {method: "GET"})
    // .then((response) => response.json())
    // .then((responseData) => {
    //     AlertIOS.alert(
    //         "GET Response",
    //         "Search Query -> " + responseData.search
    //     )
    // })
    // .done();
  } 

	render() {
		return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Create Route</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Search Routes</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
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
      backgroundColor: 'cornflowerblue'
    },
    topbar: {
      justifyContent: 'flex-start'
    },
    buttonText: {
      fontSize: 30,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 44,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: 'skyblue'
    }
});

module.exports =  TopNavigation;	
