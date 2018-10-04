import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import { updateliveMatches } from '../actions/LiveMatchesAction';
import openSocket from 'socket.io-client';

class LiveScoreScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.socket = openSocket('https://wtfappscore.herokuapp.com');

        this.socket.on('connect', () => {
            console.log('connected');
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected');
        });

        this.socket.on('error', (e) => {
            console.log('error', e);
            if (this.socket)
                this.socket.close();
        });

        this.socket.on('matches', (matches) => {
            console.log('score page, updating')
            this.props.dispatchUpdateliveMatches(matches);
        });
    }

    componentWillUnmount() {
        if (this.socket)
            this.socket.close();
    }

    render() {
        console.log(this.props)
        let match = this.props.navigation.getParam('match', undefined)
        let score = this.props.liveMatches.filter(function (scoreObj) {
            return scoreObj.match == match;
        })
        score = score[0] || {}

        if (match == undefined) {
            return (<Text>oops! cool, u found that bug! wen u read this message, lemme know :D</Text>)
        } else {
            return (
                <Container style={styles.container}>
                    <OfflineNotice />
                    <ScrollView style={styles.scroll}>
                        <Content>
                            <Text>{match}</Text>
                            <Text>{score.team0}</Text>
                            <Text>{score.score0}</Text>
                            <Text>{score.team1}</Text>
                            <Text>{score.score1}</Text>
                        </Content>
                    </ScrollView>
                    <FooterComponent navigation={this.props.navigation} selected='score' />
                </Container >
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        backgroundColor: Colors.white,
    }
});

LiveScoreScreen.navigationOptions = ({ navigation }) => getNavigationOptions('match', Colors.primary, 'white');

const mapStateToProps = store => ({
    liveMatches: store.liveMatchesReducer.liveMatches,
    token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateliveMatches: (matches) => dispatch(updateliveMatches(matches)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveScoreScreen);