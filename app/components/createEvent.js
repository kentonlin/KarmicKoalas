import React, { Component } from 'react'
import { View, ListView, StyleSheet, NavigatorIOS, Dimensions, Text, AlertIOS, TextInput, TouchableHighlight, TouchableOpacity, DatePickerIOS } from 'react-native';

import Contacts from 'react-native-contacts';

import myEvents from './myEvents';

const { width, height } = Dimensions.get('window');

class createEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      title: this.props.title,
      route: this.props.route,
      keyWords: this.props.keyWords,
      invitees: "",
      contact_suggestions: [],
      contacts: [],
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      // date: this.props.date,
      // timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
    }

    this.onDateChange = this.onDateChange.bind(this);
    //  console.log("TEST:" + this.props.id + " " + this props.title + " " + this.props.route + " " + this.props.keyWords);
  }

  // getDefaultProps(){
  //   return {
  //     date: new Date(),
  //     timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  //   };
  // }

  // getInitialState(){
  //   return {
  //     date: this.props.date,
  //     timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  //   };
  // }

  componentDidMount(){
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        return console.error(err);
      } else {
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
    var invitees = text.split(", ");
    var search = invitees[invitees.length - 1].toLowerCase();
    if(search.length){
      var suggestions = [];
      this.state.contacts.forEach((contact) => {
        if(search === contact.givenName.slice(0, search.length).toLowerCase()){
          suggestions.push(contact.givenName + " " + contact.familyName);
        }
      });
      this.state.contacts.forEach((contact) => {
        if(search === contact.familyName.slice(0, search.length).toLowerCase()){
          suggestions.push(contact.givenName + " " + contact.familyName);
        }
      });
      this.setState({
        contact_suggestions: suggestions
      });
    } else {
      this.setState({
        contact_suggestions: []
      });
    }
  }

  addContact(contact){
    var invitees = this.state.invitees.split(", ").slice(0, -1);
    invitees.push(contact);
    this.setState({
      invitees: invitees.join(", ") + ", ",
      contact_suggestions: []
    });
  }

  onDateChange(date){
    this.setState({
      date: date
    });
  }

  handleSubmit(){
    this.props.navigator.push({
      component: myEvents,
      title: "Events"
    });
  }

  // render(){
  //   return (
  //     <View>
  //       <DatePickerIOS
  //         date={this.state.date}
  //         mode="datetime"
  //         timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
  //         onDateChange={this.onDateChange} />
  //     </View>
  //   )
  // }

  render(){
    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={styles.inputText}
          autoFocus={true}
          placeholder="title"
          placeholderTextColor="#CDCDC9"
          value={this.state.title}
          onChangeText={(txt) => this.setState({title: txt})} />
        <Text>Invite your friends</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Add Contact"
          value={this.state.invitees}
          onChangeText={(txt) => this.searchContacts(txt)} />
        {
          this.state.contact_suggestions.map((contact, idx) => (
            <TouchableOpacity key={idx} onPress={(event) => this.addContact(contact)}>
              <Text>{contact}</Text>
            </TouchableOpacity>
          ))
        }
        <Text>DateTime</Text>
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange} />
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
    // alignItems: 'center',
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
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    borderRadius: 20,
  },
});

module.exports =  createEvent;
