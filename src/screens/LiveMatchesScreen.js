import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Body, Left, Right, Thumbnail, View, Text } from 'native-base';
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
    }

    componentWillMount() {
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
            this.props.dispatchUpdateliveMatches(matches);
        });
    }

    componentWillUnmount() {
        if (this.socket.connected) {
            this.socket.close();
        }
    }

    render() {
        return (
            <Container>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    <Content>
                        <List dataArray={this.state.matches}
                            renderRow={(match) =>
                                <ListItem onPress={() => {
                                    if (this.socket)
                                        this.socket.close();
                                    this.props.navigation.navigate('LiveScoreScreen', { match: match.match })
                                }}>
                                    <Body>
                                        <Text>
                                            <Text style={styles.team1}>{match.team0}</Text>
                                            <Text style={styles.small}> vs </Text>
                                            <Text style={styles.team2}>{match.team1}</Text>
                                        </Text>
                                        <Text style={styles.match}>{match.match}</Text>
                                    </Body>
                                </ListItem>
                            }>
                        </List>
                    </Content>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='live' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    team1: {
        color: Colors.team1,
        fontSize: 12,
        fontWeight: 'bold',
    },
    team2: {
        color: Colors.team2,
        fontSize: 12,
        fontWeight: 'bold',
    },
    match: {
        color: Colors.match,
        fontSize: 8,
    },
    small: {
        fontSize: 8,
        paddingRight: 25,
        paddingLeft: 25
    },
    scroll: {
        backgroundColor: Colors.white,
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