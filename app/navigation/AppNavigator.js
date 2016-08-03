import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS, View, Text, TouchableHighlight, TextInput, TabBarIOS, AlertIOS } from 'react-native';

import Main from './app/components/Main'
import Welcome from './welcome.ios'
import More from './more.ios'
import SignUp from './app/components/SignUp'
import SocketView from './app/utils/sockets'
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'
import TopNavigation from './app/components/TopNavigation'

class AppNavigator extends Component {

	_renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "SignUp":
        return (
          <SignUp
            {...globalNavigatorProps} />
        )

      case "Main":
        return (
          <Main
            {...globalNavigatorProps}
            // person={route.person} />
            />
        )

      default:
        return (
          <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
        )
    }
  }
}
