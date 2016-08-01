'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, AlertIOS } from 'react-native';

class SignUp extends Component {
	constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Sign Up
				</Text>
        <TextInput
          style={{height: 40}}
          value={this.state.name}
          placeholder="Enter your name: "
        />
        <TextInput
          style={{height: 40}}
          value={this.state.email}
          placeholder="Email Address: "
        />
				<TextInput
          style={{height: 40}}
          value={this.state.username}
          placeholder="Username: "
        />
        <TextInput
          style={{height: 40}}
          value={this.state.password}
          placeholder="Password: "
          />
        <TouchableHighlight>
            <Text>Go</Text>
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
    TextInput: {
      borderWidth: 2,
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


module.exports =  SignUp;	