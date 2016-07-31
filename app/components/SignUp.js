import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, AlertIOS } from 'react-native';

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

class SignUp extends Component {
	render() {
		return (
			<View>
				<Text>
					Sign Up
				</Text>
				<TextInput
          style={{height: 40}}
          placeholder="Enter your username: "
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your password: "
          />
        <TouchableHighlight
            <Text>Go</Text>
        </TouchableHighlight>
			</View>
			)
	}

	
}	