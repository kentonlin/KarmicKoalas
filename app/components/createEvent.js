import React, { Component } from 'react'
import { View, ListView, StyleSheet, NavigatorIOS, Dimensions, Text, AlertIOS, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import Contacts from 'react-native-contacts';

const { width, height } = Dimensions.get('window');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class createEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      title: this.props.title,
      route: this.props.route,
      keyWords: this.props.keyWords,
      invitees: "",
      contact_suggestions: ds.cloneWithRows([]),
      contacts: []
    }
    //  console.log("TEST:" + this.props.id + " " + this props.title + " " + this.props.route + " " + this.props.keyWords);
  }

  componentDidMount(){
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        return console.error(err);
      } else {
        console.log(contacts);
        this.setState({
          contacts: contacts
        });
      }
    });
  }

  searchContacts(text){
    this.setState({
      invitees: text
    });
    if(text.length){
      var suggestions = [];
      this.state.contacts.forEach((contact) => {
        if(text === contact.givenName.slice(0, text.length)){
          suggestions.push(contact.givenName);
        }
      });
      this.setState({
        contact_suggestions: ds.cloneWithRows(suggestions)
      });
    } else {
      this.setState({
        contact_suggestions: ds.cloneWithRows([])
      });
    }
  }


  addContact(contact){
    // add to state and clear suggestions
    // var invitees = this.state.invitees.split(', ').slice(0, -1).push(contact).join(", ") + ", ";
    this.setState({
      invitees: contact + ", "
    });
  }

  handleSubmit(){

  }

  renderRow(contact) {
    return (
      <TouchableOpacity onPress={(event) => this.addContact(contact)}>
        <Text style={{alignItems: 'center', padding: 3}}>{'\n'}{contact}{'\n'}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          autoFocus = {true}
          placeholder = "Invitees"
          placeholderTextColor='#CDCDC9'
          onChangeText={(text) => this.searchContacts(text)}
        />
        <ListView
          initialListSize={10}
          dataSource={this.state.contact_suggestions}
          renderRow={(contact) => { return this.renderRow(contact) }}/>
        <TouchableHighlight onPress={() => this.handleSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
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
});

module.exports =  createEvent;
