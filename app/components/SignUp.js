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
			<View>
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

module.exports =  SignUp;	
