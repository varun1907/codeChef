import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';

export default class App extends React.Component {
  render() {

    const AuthNavigator = createStackNavigator({
      signup:{screen:Signup},
      login: {screen: Login},
      welcome: {screen: Welcome}
    }, { headerMode: 'none' });


    const RootNavigator = createSwitchNavigator({
      start: {screen: AuthNavigator},
    });


    return (
        <RootNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
  },
});
