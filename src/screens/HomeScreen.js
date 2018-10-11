import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Container, Content, Text, Card, CardItem, View } from 'native-base';
import * as Colors from '../themes/colors';
import { updateUserPhoto, updateUserToken, updateUserAccounts, updateUserSettings } from '../actions/UserActions';
import { updateUpcomingMatches } from '../actions/MatchesAction';
import { connect } from 'react-redux';
import OfflineNotice from '../components/common/OfflineNotice';
import * as ErrorUtils from '../utils/ErrorUtils';
import { getNavigationOptionsWithAction } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import * as UserAccountsService from '../services/UserAccountsService';
import * as MatchesService from '../services/MatchesService';
import UserAccountSelector from '../components/common/UserAccountSelector';
import PTRView from 'react-native-pull-to-refresh';

class HomeScreen extends Component {
    constructor(props) {
        super(props)

        this._refresh = this._refresh.bind(this);
        this._renderUpcomingMatches = this._renderUpcomingMatches.bind(this);
        this._onMatchSelect = this._onMatchSelect.bind(this);
    }

    componentDidMount() {
        this._refresh();
    }

    componentWillUnmount() {
    }

    _refresh() {
        if (this.props.userAccounts == undefined || this.props.userAccounts.length == 0) {
            UserAccountsService.getUserAccounts()
                .then((response) => {
                    this.props.dispatchUpdateUserAccounts(response.data)
                }).catch(err => {
                    ErrorUtils.handleError(err);
                });
        }
        MatchesService.getUpcomingMatches()
            .then((response) => {
                this.props.dispatchUpcomingMatches(response.data);
            }).catch(err => {
                ErrorUtils.handleError(err);
            });
    }

    _onMatchSelect(match) {
        this.props.navigation.navigate('TeamSelectScreen', { match: match })
    }

    _renderUpcomingMatches(upcomingMatches) {
        let arr = [];
        upcomingMatches.forEach(upcomingMatch => {
            arr.push(<Card key={upcomingMatch._id}>
                <CardItem header button onPress={() => { this._onMatchSelect(upcomingMatch) }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.match}>{upcomingMatch.name}</Text>
                        <Text style={styles.series}>{upcomingMatch.series.name}</Text>
                    </View>
                </CardItem>
                <CardItem style={styles.matchName} button onPress={() => { this._onMatchSelect(upcomingMatch) }}>
                    <Text style={styles.team1}>{upcomingMatch.squad1.team.shortName}
                        <Text style={styles.team}> vs </Text>
                        <Text style={styles.team2}>{upcomingMatch.squad2.team.shortName}</Text>
                    </Text>
                </CardItem>
            </Card>);
        });
        return arr;
    }

    render() {
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <PTRView colors={Colors.refresh} onRefresh={this._refresh}>
                    <ScrollView style={styles.scroll}>
                        <Content>
                            {this._renderUpcomingMatches(this.props.upcomingMatches)}
                        </Content>
                    </ScrollView>
                </PTRView>
                <FooterComponent
                    navigation={this.props.navigation}
                    selected='home' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 2
    },
    scroll: {
        backgroundColor: Colors.white,
    },
    match: {
        color: Colors.match,
        fontSize: 12,
    },
    series: {
        color: Colors.series,
        fontSize: 12,
    },
    small: {
        fontSize: 10,
        fontWeight: 'normal'
    },
    team: {
        fontSize: 18,
        color: Colors.border
    },
    matchName: {
        alignSelf: "center"
    },
    team1: {
        color: Colors.team1,
        fontSize: 18,
    },
    team2: {
        color: Colors.team2,
        fontSize: 18,
    },
});

HomeScreen.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('home', Colors.primary, 'white', null, <UserAccountSelector />);

const mapStateToProps = store => ({
    user: store.userReducer.user,
    userAccounts: store.userReducer.userAccounts,
    token: store.userReducer.token,
    upcomingMatches: store.upcomingMatchesReducer.upcomingMatches
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateUserPhoto: (photo) => dispatch(updateUserPhoto(photo)),
    dispatchUpdateUserAccounts: (userAccounts) => dispatch(updateUserAccounts(userAccounts)),
    dispatchUpdateUserToken: (token) => dispatch(updateUserToken(token)),
    dispatchUpdateUserSettings: (userSettings) => dispatch(updateUserSettings(userSettings)),
    dispatchUpcomingMatches: (upcomingMatches) => dispatch(updateUpcomingMatches(upcomingMatches))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);