'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ListView, TextInput, AlertIOS } from 'react-native';

class ListViewScreen extends Component {
	constructor(props) {
    super(props);

    let listArray = [
      {name: 'Tom One'},
      {name: 'Sue Two'},
      {name: 'Lee Three'},
      {name: 'Rob Four'},
      {name: 'Bob Five'},
      {name: 'Lou Six'},
    ];

    // let listarray = [
    //   "source: 08:30:00 CP Central Park",
    //   "source: 08:30:00 LP Lincoln Park",
    //   "source: 08:30:00 BP Borough Park",
    //   "source: 08:30:00 CP Chastain Park",
    //   "source: 08:30:00 BP Battery Park",
    //   "source: 08:30:00 RP Riverside Park",
    // ];
    
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: dataSource.cloneWithRows(listArray),
      highlightedRow: {},
    };
  }

  goMap() {
    console.log("Hello");
  }
  
  getData(){
    console.log('name: '+ this.state.name + '\nemail: '+ this.state.email + '\nusername: '+ this.state.username + '\npassword: '+ this.state.password);
  } 
	
  renderRow(rowData, sectionID, rowID, highlightedRow) {
    return (
      <TouchableHighlight underlayColor='#dddddd' style={{height: 44}}>
      <View>
        <Text numberOfLines={1}>{rowData}</Text>
        <View style={{height: 1, backgroundColor: '#dddddd'}} />
      </View>
      </TouchableHighlight>
    );
  }

   render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{width: 300, height: 40}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator} />
        <View style={styles.navBar}>
          <Text style={styles.navText}>Group Route</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'cornflowerblue'
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
    }
});

module.exports =  ListViewScreen;	