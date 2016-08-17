import React, { Component } from 'react'
import {Dimensions, View, StyleSheet, Image, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import createEvent from './createEvent';
import icon from '../icons/noun_14294.png'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const { width, height } = Dimensions.get('window')

class SearchRoutes extends Component {
   constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      dataSource: ds.cloneWithRows([])
    };
  }

  handleItemClick(item) {
    console.log("Route: ", item);
    this.props.navigator.push({
      component: createEvent,
      title: "Create Event",
      passProps: {
        routeID: item.id,
        userId: this.props.userId,
        setEventId: this.props.setEventId
      }
    });
  }

  getRoutes(){
    fetch("http://localhost:8000/searchKeywords", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({keywords: this.state.search.trim().split(',')})
 	})
  .then((response) => response.json()).then((responseData) => {
  		console.log('DATA FROM SERVER', responseData);
      this.setState({
        dataSource: ds.cloneWithRows(responseData)
      });
	 }).catch((error) => {
     console.error(error);
   })
	 .done();
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.handleItemClick(rowData)}>
      <View>

       <Text><Image style={styles.image} source={icon}/>{rowData.title}{'\n'}Start:{rowData.start_address}{'\n'}End:{rowData.end_address}</Text>
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
          backgroundColor: adjacentRowHighlighted ? '#073AD2' : '#E0DFDF',
        }}
      />
    );
   }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          autoFocus = {true}
          value={this.state.search}
          placeholder="Enter keywords: ex. NYC,Atlanta,City-Of-Love"
          onChangeText={(text) => this.setState({search: text})}/>
        <View style={{paddingTop: 2}}>
        <TouchableHighlight onPress={() => this.getRoutes()} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <View>
          <ListView
            style={{marginTop: 2, alignSelf: 'center', padding: 7}}
            initialListSize={1}
            dataSource={this.state.dataSource}
            renderRow={(route) => { return this.renderRow(route) }}
            renderSeparator={this.renderSeparator}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}/>
          </View>
        </View>
      </View>
      );
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#E0DFDF'
  },
  routeRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 70
  },
  inputText: {
    height: 40,
    width: width,
    padding: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 80
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: 'skyblue',
    paddingHorizontal: 30,
    paddingVertical: 12,
    padding: 5,
    marginTop: 4
  },
  image: {
    height: 20,
    width: 20
  }
});

module.exports =  SearchRoutes;
