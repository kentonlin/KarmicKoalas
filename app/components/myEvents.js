'use strict'
// My Events Template to render views of user created views.

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ScrollView, ListView, TextInput, AlertIOS } from 'react-native';

// Test Data Objects
//TODO Get request to database for event data.

let listarray = [
  {name: 'On the town', description: 'Hanging out with your besties and bros in Manhattan', location: 'Central Park', id:'123'},
  {name: 'By the bay', description: 'A funtime picnic on the Hudson', location: 'Riverside Park', id:'123'},
  {name: 'Sun Down Town', description: 'At sundown, getting together for happy hour', location: 'TriBeCa', id:'123'},
  {name: 'On the Pier', description: 'A lazy boat ride cause we can!', location: 'Brooklyn Heights', id:'123'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square', id:'123'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building', id:'123'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square', id:'123'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building', id:'123'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square', id:'123'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building', id:'123'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square', id:'123'},
  {name: 'A Quick Trip', description: 'Treasure hunt at the Empire State Building', location: 'Empire State Building', id:'123'},
  {name: 'On the town', description: 'Hanging out with your besties and bros in Manhattan', location: 'Central Park', id:'123'},
  {name: 'By the bay', description: 'A funtime picnic on the Hudson', location: 'Riverside Park', id:'123'},
  {name: 'Sun Down Town', description: 'At sundown, getting together for happy hour', location: 'TriBeCa', id:'123'},
  {name: 'On the Pier', description: 'A lazy boat ride cause we can!', location: 'Brooklyn Heights', id:'123'},
  {name: 'Midnight Stroll', description: 'Navigating the streets of Manhattan', location: 'Times Square', id:'123'}
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

  goMap(rowData) {
    console.log("Hello: ", rowData);
    this.props.setEventId(rowData.id);
    this.props.navigator.pop();
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void)  {
    return (
      <TouchableOpacity style={styles.eventRow} onPress={() => this.goMap(rowData)}>
      <View>
        <Text>{'\n'}{rowData.name}{'\n'}{rowData.description}{'\n'}{rowData.location}{'\n'}</Text>
        <View />
      </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#B2B0B2' : '#073AD2',
        }}
      />
    );
   }

   render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{marginTop: 2, alignSelf: 'center', padding: 7}}
          initialListSize={10}
          dataSource={this.state.objectdataSource}
          renderRow={(item) => { return this.renderRow(item) }}
          renderSeparator={this.renderSeparator}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#DFD6CC'
    },
    eventRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      height: 70
    },
    text: {
      flex: 1
    }
});

module.exports =  myEvents;
