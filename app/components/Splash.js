'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, AlertIOS, AsyncStorage } from 'react-native';
import SignUp from './SignUp'
import Main from './Main'

class Splash extends Component {
	constructor(props) {
    super(props)
    this.state = {

    }
  }

	componentDidMount(){
    //AsyncStorage.setItem("userId", 'null');
<<<<<<< cb3f3343d29a8628c78adf3b6f356dcde316f3b6
    AsyncStorage.getItem("username").then((username) => {
      if(username === null){
=======
    AsyncStorage.getItem("userId").then((value) => {
			console.log('Async Issue', value);
      if(value === null){
>>>>>>> splash
        //new user
				this.props.navigator.push({
					navigationBarHidden: true,
					component: SignUp,
					title: "SignUp"
				});
      } else {
        //existing user
				this.props.navigator.push({
					navigationBarHidden: true,
					component: Main,
					title: "Main"
				});
    	}
  	});
	}

	navToSignup(){

	}

  render() {
		return (
      <View style={styles.container}>
				<Text style={styles.textHeader}>
					WeGoToo>>>>>
				</Text>
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
    text: {
      color: 'blue',
      backgroundColor: 'lightblue',
      fontSize: 30,
      margin: 80
    }
});

module.exports =  Splash;
