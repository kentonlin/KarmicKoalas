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
      title: "",
      route: this.props.route,
      keyWords: this.props.keyWords,
      guests: "",
      contact_suggestions: [],
      contacts: [],
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }

    this.onDateChange = this.onDateChange.bind(this);
    //  console.log("TEST:" + this.props.id + " " + this props.title + " " + this.props.route + " " + this.props.keyWords);
  }

  componentDidMount(){
    fetch("http://localhost:8000/getAllUsers", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    }).then((response) => response.json()).then(responseData => {
      console.log("createEvent:", responseData)
      this.setState({
        contacts: responseData
      });
    }).done();
  }

  searchContacts(text){
    this.setState({
      guests: text
    });
    var guests = text.split(", ");
    var search = guests[guests.length - 1].toLowerCase();
    if(search.length){
      var suggestions = [];
      this.state.contacts.forEach((contact) => {
        if(search === contact.name.slice(0, search.length).toLowerCase() &&
           contact.name !== this.props.username){
          suggestions.push(contact.name);
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
    var guests = this.state.guests.split(", ").slice(0, -1);
    guests.push(contact);
    this.setState({
      guests: guests.join(", ") + ", ",
      contact_suggestions: []
    });
  }

  onDateChange(date){
    this.setState({
      date: date
    });
  }

  handleSubmit(){
    // NOTE: should guests be required?
    if(this.state.title.length && this.state.guests.length){
      var guestIds = [];
      this.state.guests.split(", ").forEach((guest) => {
        this.state.contacts.forEach((contact) => {
          if(guest === contact.name){
            guestIds.push(contact.userId);
          }
        });
      });
      var body = {
        title: this.state.title,
        host: this.props.userId,
        guests: guestIds,
        route_id: this.props.routeID,
        time: this.state.date
      }
      fetch("https://wegotoo.herokuapp.com/createEvent", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      }).then((responseData) => {
        console.log('createEvent -- SERVER', responseData)
        //this.setState({routeCoordinates: responseData});
      }).done();
      this.props.navigator.push({
        component: myEvents,
        title: "Events",
        passProps: {
          setEventId: this.props.setEventId,
          userId: this.props.userId
        }
      });
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.inputText}
          autoFocus={true}
          placeholder="title"
          placeholderTextColor="#CDCDC9"
          value={this.state.title}
          onChangeText={(txt) => this.setState({title: txt})}
          onSubmitEditing={(event) => {
            this.refs.guestsInput.focus();
          }} />
        <Text>Invite your friends</Text>
        <TextInput
          ref="guestsInput"
          style={styles.inputText}
          placeholder="Add Guest"
          value={this.state.guests}
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
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    marginTop: 80
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
