import React, { Component } from 'react'
import {Dimensions, View, StyleSheet, Image, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight, TouchableOpacity, AlertIOS } from 'react-native';

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

  checkBeforeSubmit() {
    if (!this.state.search) {
        AlertIOS.alert("keywords are required!");
        setTimeout(function() {
          this.refs.textInput.focus();
        }.bind(this), 0);
    } else {
      this.getRoutes();
    }
  }

  getRoutes(){
    fetch("http://localhost:8000/searchKeywords", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({keywords: this.state.search.trim().split(',')})
    })
    .then((response) => response.json()).then((responseData) => {
        console.log('DATA FROM SERVER', responseData);
        if (responseData === null){
          console.log("NO DATA RETURNED");
        }
        if (responseData.message){
          console.log(responseData.message)
          this.setState({
            search: responseData.message
          })
        }else {
          this.setState({
            dataSource: ds.cloneWithRows(responseData)
          })
      }
     }).catch((error) => {
       console.error(error);
     })
     .done();
     this.setState({search: ''});
    }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.handleItemClick(rowData)}>
      <View>
       <Text><Image style={styles.image} source={icon}/>{rowData.title}{'\n'}Start:{rowData.start_address}{'\n'}End:{rowData.end_address}</Text>
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
          ref='textInput'
          style={styles.inputText}
          autoFocus = {true}
          multiline = {true}
          numberOfLines = {8}
          borderWidth={2}
          fontSize={15}
          padding={8}
          marginTop={68}
          value={this.state.search}
          placeholder="Enter keywords: ex. NYC,Atlanta,City-Of-Love"
          onKeyPress={this.handleKeyDown}
          onChangeText={(text) => this.setState({search: text})}/>
        <View style={{paddingTop: 2}}>
        <TouchableHighlight onPress={() => this.checkBeforeSubmit()} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <View>
          <ListView
            style={{marginTop: 2, padding: 7}}
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
    backgroundColor: 'white'
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
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderColor: '#fff'
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#A9D0F5',
    paddingHorizontal: 30,
    paddingVertical: 12,
    padding: 5,
    marginTop: 2
  },
  image: {
    height: 20,
    width: 20
  }
});

module.exports =  SearchRoutes;
