'use strict'
// My Events Template to render views of user created views.

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ScrollView, ListView, TextInput, AlertIOS } from 'react-native';

let listarray = [
  {name: 'On the town', description: 'Hanging out with your besties and bros in Manhattan', location: 'Central Park'},
  {name: 'By the bay', description: 'A funtime picnic on the Hudson', location: 'Riverside Park'},
  {name: 'Sun Down Town', description: 'At sundown, getting together for happy hour', location: 'TriBeCa'},
  {name: 'On the Pier', description: 'A lazy boat ride cause we can!', location: 'Brooklyn Heights'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building'},
]

class myEvents extends Component {
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

  renderRow(item) {
    return (
      <TouchableOpacity style={styles.eventRow} onPress={(event) => this.goMap(item) }>
      <View>
        <Text>{'\n'}{item.name}{'\n'}{item.description}{'\n'}{item.location}{'\n'}</Text>
        <View style={{height: 1, backgroundColor: '#dddddd' }} />
      </View>
      </TouchableOpacity>
    );
  }

   render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <ListView
          style={{marginTop: 2}}
          initialListSize={10}
          dataSource={this.state.objectdataSource}
          renderRow={(item) => { return this.renderRow(item) }} />
      </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'white'
    },
    eventRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      height: 50,
      paddingTop: 5,
      padding: 10,
      paddingBottom: 10,
      alignSelf: 'stretch'
    },
    text: {
      flex: 1
    }
});

module.exports =  myEvents;
