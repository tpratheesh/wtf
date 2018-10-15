import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './components/Login';
import HomeScreen from './screens/HomeScreen';
import LiveMatchesScreen from './screens/LiveMatchesScreen';
import ProfileScreen from './screens/ProfileScreen';
import LiveScoreScreen from './screens/LiveScoreScreen';
import AccountScreen from './screens/AccountScreen';
import FixturesScreen from './screens/FixturesScreen';
import MoreMenuScreen from './screens/MoreMenuScreen';
import TeamSelectScreen from './screens/TeamSelectScreen';
import ErrorScreen from './screens/ErrorScreen';
import * as Colors from './themes/colors';
import ErrorHandler from './error/handler/ErrorHandler';

const stackNavigator = token => createStackNavigator({
  LoginScreen: { screen: LoginScreen, },
  HomeScreen: { screen: HomeScreen, },
  LiveMatchesScreen: { screen: LiveMatchesScreen },
  ProfileScreen: { screen: ProfileScreen },
  LiveScoreScreen: { screen: LiveScoreScreen },
  AccountScreen: { screen: AccountScreen },
  FixturesScreen: { screen: FixturesScreen },
  MoreMenuScreen: { screen: MoreMenuScreen },
  TeamSelectScreen: { screen: TeamSelectScreen },
  ErrorScreen: { screen: ErrorScreen },
  ErrorHandler: { screen: ErrorHandler }
}, {
    initialRouteName: token == undefined ? 'LoginScreen' : 'HomeScreen',
    navigationOptions: () => ({
      headerTintColor: Colors.primaryFont,
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    })
  });

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { token } = this.props;
    const Navigator = stackNavigator(token);
    return (
      <ErrorHandler>
        <Navigator />
      </ErrorHandler>
    );
  }
}

const mapStateToProps = store => ({
  token: store.userReducer.token,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);