import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './components/Login';
import HomeScreen from './screens/HomeScreen';
import LiveMatchesScreen from './screens/LiveMatchesScreen';
import ProfileScreen from './screens/ProfileScreen';
import LiveScoreScreen from './screens/LiveScoreScreen';
import * as Colors from './themes/colors';

const stackNavigator = token => createStackNavigator({
  LoginScreen: { screen: LoginScreen, },
  HomeScreen: { screen: HomeScreen, },
  LiveMatchesScreen: { screen: LiveMatchesScreen },
  ProfileScreen: { screen: ProfileScreen },
  LiveScoreScreen: { screen: LiveScoreScreen },
}, {
    initialRouteName: token == undefined ? 'LoginScreen' : 'HomeScreen',
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    })
  });

class App extends Component {
  render() {
    const { token } = this.props;
    const Navigator = stackNavigator(token);
    return (
      <Navigator />
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.userReducer.user,
  token: store.userReducer.token,
});

export default connect(mapStateToProps)(App);