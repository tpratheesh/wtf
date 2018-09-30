import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Body, Left, Right, Thumbnail, View, Text } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import openSocket from 'socket.io-client';
import Icon from 'react-native-vector-icons/FontAwesome';

class LiveMatchesScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: []
        }

        const socket = openSocket('http://localhost:5000');
        socket.on('connect', () => {
            console.log('connected');
        })
        socket.on('disconnect', () => {
            console.log('disconnected');
            socket.close();
        })
        socket.on('error', (e) => {
            console.log('error', e);
            socket.close();
        })
        socket.on('matches', (matches) => {
            this.setState({ matches: matches });
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <OfflineNotice />
                <Content>
                    <List dataArray={this.state.matches}
                        renderRow={(match) =>
                            <ListItem onPress={() => {
                                console.log(match.match)
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
                <FooterComponent navigation={this.props.navigation} selected='live' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    team1: {
        color: Colors.team1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    team2: {
        color: Colors.team2,
        fontSize: 18,
        fontWeight: 'bold',
    },
    match: {
        color: Colors.match,
        fontSize: 10,
    },
    small: {
        fontSize: 8,
        paddingRight: 25,
        paddingLeft: 25
    }
});



LiveMatchesScreen.navigationOptions = ({ navigation }) => getNavigationOptions('live matches', Colors.primary, 'white');

const mapStateToProps = store => ({
    liveMatches: store.liveMatchesReducer.liveMatches,
    token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateImportantNos: (importantNos) => dispatch(updateLiveMatchess(importantNos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveMatchesScreen);