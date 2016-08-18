'use strict'
// My Events Template to render views of user created views.

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight, ScrollView, ListView, TextInput, AlertIOS, AsyncStorage } from 'react-native';
import icon from '../icons/noun_14294.png'

import Main from './Main';
// Test Data Objects
//TODO Get request to database for event data.

let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class myEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objectdataSource: dataSource.cloneWithRows([]),
      highlightedRow: {}
    };

    this.goMap = this.goMap.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:8000/getMyEvents", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_id: this.props.userId})
    }).then((response) => response.json()).then(responseData => {
      var data = responseData.filter(event => {
        return new Date(event.time) > new Date();
      });
      this.setState({
        objectdataSource: dataSource.cloneWithRows(data)
      });
    }).done();
  }

  goMap(rowData) {
    console.log("Hello: ", rowData);
    this.props.setEventId(rowData.event_id);
    this.props.navigator.popToTop();
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void)  {
    return (
      <TouchableOpacity style={styles.eventRow} onPress={() => this.goMap(rowData)}>
      <View>
        <Text><Image source={icon} style={styles.image}/>{rowData.title}{'\n'}Start:{rowData.start_address}  End:{rowData.end_address}{'\n'}{rowData.time}{'\n'}</Text>
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
        <ListView style={styles.eventRow}
          style={{marginTop: 0, alignSelf: 'center', padding: 0}}
          initialListSize={10}
          dataSource={this.state.objectdataSource}
          renderRow={(item) => { return this.renderRow(item) }}

          enableEmptySections={true}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#fff'
    },
    eventRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      height: 70,
      margin: 10,
      borderColor:'#3498db',
      borderWidth:2,
      borderRadius:20,
      padding:50
    },
    text: {
      flex: 1
    },
    image: {
      height: 30,
      width: 30
    }
});

module.exports =  myEvents;
