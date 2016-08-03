'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, AlertIOS } from 'react-native';
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'

class SignUp extends Component {
	constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  }
	render() {
		return (
			// <View style={styles.container}>
      <ViewContainer>
       <StatusBarBackground style={{backgroundColor: "mistyrose"}} />
				<Text style={styles.textHeader}>
					Sign Up
				</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Enter your name: "
        />
        <TextInput
          style={{height: 40}}
          placeholder="Email Address: "
        />
				<TextInput
          style={{height: 40}}
          placeholder="Username: "
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password: "
          />
        <TouchableHighlight style={styles.button}>
            <Text>Go</Text>
        </TouchableHighlight>
			</ViewContainer>
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
    TextInput: {
      borderWidth: 2,
      color: 'white'
    },
    placeholder: {
      color: 'white'
    },
    textHeader: {
      fontSize: 30,
      color: 'white',
      justifyContent: 'flex-start'
    },
    buttonText: {
      fontSize: 30,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 44,
      width: 30,
      borderRadius: 10,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center'
      // color: 'white'
    }
});

module.exports =  SignUp;	