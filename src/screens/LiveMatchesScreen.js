import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, Text, Card, CardItem, View } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import { updateliveMatches } from '../actions/LiveMatchesAction';
import openSocket from 'socket.io-client';

class LiveMatchesScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: this.props.liveMatches
        }

        this._renderLiveMatches = this._renderLiveMatches.bind(this);
    }

    componentDidMount() {
        this.socket = openSocket('https://wtfappscore.herokuapp.com', { transports: ['websocket'] });

        this.socket.on('connect', () => {
            console.log('connected');
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected');
        });

        this.socket.on('error', (e) => {
            console.log('error', e);
            if (this.socket.connected) {
                this.socket.close();
            }
        });

        this.socket.on('matches', (matches) => {
            console.log('matches screen, updating')
            this.props.dispatchUpdateliveMatches(matches);
        });
    }

    componentWillUnmount() {
        if (this.socket.connected) {
            this.socket.close();
        }
    }

    _renderLiveMatches(matches) {
        let arr = [];
        matches.forEach(match => {

            let score = this.props.liveMatches.filter(function (scoreObj) {
                return scoreObj.match == match.match;
            })
            score = score[0] || {}

            arr.push(<Card key={match.match}>
                <CardItem header button onPress={() => { this.props.navigation.navigate('LiveScoreScreen', { match: match.match }) }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.match}>{match.match}</Text>
                        <Text style={styles.status}>{score.status || ''}</Text>
                    </View>
                </CardItem>
                <CardItem style={styles.matchName} button onPress={() => { this.props.navigation.navigate('LiveScoreScreen', { match: match.match }) }}>
                    <View style={{ flex: 1, alignContent: 'flex-start' }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'flex-start',
                        }}>
                            <Text style={styles.team1}>{match.team0}</Text>
                            <Text style={styles.score}>{score.score0}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'flex-start',
                        }}>
                            <Text style={styles.team2}>{match.team1}</Text>
                            <Text style={styles.score}>{score.score1}</Text>
                        </View>
                    </View>
                </CardItem>
            </Card>);
        });
        return arr;
    }

    render() {
        return (
            <Container>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    <Content>
                        {this._renderLiveMatches(this.state.matches)}
                    </Content>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='live' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    match: {
        color: Colors.match,
        fontSize: 12,
    },
    status: {
        color: Colors.danger,
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
        fontSize: 16,
    },
    team2: {
        color: Colors.team2,
        fontSize: 16,
    },
    scroll: {
        backgroundColor: Colors.white,
    },
    score: {
        fontSize: 12,
    }
});



LiveMatchesScreen.navigationOptions = ({ navigation }) => getNavigationOptions('live matches', Colors.primary, 'white');

const mapStateToProps = store => ({
    liveMatches: store.liveMatchesReducer.liveMatches,
    token: store.userReducer.token,
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateliveMatches: (matches) => dispatch(updateliveMatches(matches)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveMatchesScreen);