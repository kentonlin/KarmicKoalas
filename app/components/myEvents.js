'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ListView, TextInput, AlertIOS } from 'react-native';

let listarray = [
  {name: 'On the town', description: 'Hanging out with your besties and bros in Manhattan', location: 'Central Park'},
  {name: 'By the bay', description: 'A funtime picnic on the Hudson', location: 'Riverside Park'},
  {name: 'Sun Down Town', description: 'At sundown, getting together for happy hour', location: 'TriBeCa'},
  {name: 'On the Pier', description: 'A lazy boat ride cause we can!', location: 'Brooklyn Heights'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building'},
]

class ListViewScreen extends Component {
  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      objectdataSource: dataSource.cloneWithRows(listarray),
      highlightedRow: {}
    };
  }

  goMap(item) {
    console.log("Hello: ", item);
  }

  getData(){
    console.log('name: '+ this.state.name + '\nemail: '+ this.state.email + '\nusername: '+ this.state.username + '\npassword: '+ this.state.password);
  }

  renderRow(item) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.goMap(item) }>
      <View>
        <Text numberOfLines={1}>{item.time} {item.name} {item.location}</Text>
        <View style={{height: 1, backgroundColor: '#dddddd'}} />
      </View>
      </TouchableOpacity>
    );
  }

   render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{marginTop: 100, }}
          initialListSize={10}
          dataSource={this.state.objectdataSource}
          renderRow={(item) => { return this.renderRow(item) }} />
        <View style={styles.navBar}>
          <Text style={styles.navText}>Group Routes</Text>
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
    },
    routeRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 50
    },
});

module.exports =  ListViewScreen;
