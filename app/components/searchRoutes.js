import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight } from 'react-native';


class SearchRoutes extends Component {
   constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      search: '',
      dataSource: ds.cloneWithRows([
        'New York Historic', 'Metropolitan Boston', 'Fossil Treck in NJ', 'Hudson River Walk', 'Central Park NYC', 'Bear Mountain Hike Easy', 'NYC Midtown Pub Crawl', 'Lower East Side NYC Historic'
      ])
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          autoFocus = {true}
          value={this.state.search}
          placeholder="Enter keywords: "
          onChangeText={(text) => this.setState({search: text})}
        />
         <View style={styles.button}>
          <Text>
          Search
        </Text>
        </View>
        <View style={styles.button}/>
        <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
         <View style={styles.button}>
          <Text>
          Add To My Routes
        </Text>
        </View>
      </View>
      );
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

module.exports =  SearchRoutes;
