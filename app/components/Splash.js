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
		console.log('in splash set asynch')
    //AsyncStorage.setItem("userId", 'null');
    AsyncStorage.getItem("userId").then((value) => {
      console.log('in splash get value',value)
      if(value === '123'){
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
    },
    navBar: {
      backgroundColor: 'cornflowerblue',
      height: 64,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    navText: {
      color: 'white',
      fontSize: 16,
      fontWeight: "700",
      textAlign: 'center',
      paddingTop: 30
    },
    inputText: {
      height: 40,
      color: 'white'
    },
    TextInput: {
      borderWidth: 2,
      color: 'white'
    },
    textHeader: {
      fontSize: 30,
      color: 'white',
      justifyContent: 'flex-start'
    },
    buttonText: {
      fontSize: 20,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 44,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'skyblue'
    }
});

module.exports =  Splash;
