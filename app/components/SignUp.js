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
          value={this.state.username}
          placeholder="Enter your username: "
        />
        <TextInput
          style={{height: 40}}
          value={this.state.password}
          placeholder="Enter your password: "
          />
        <TouchableHighlight>
            <Text>Go</Text>
        </TouchableHighlight>
			</View>
			)
	}

}

module.exports =  SignUp;	