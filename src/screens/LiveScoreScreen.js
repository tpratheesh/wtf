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
import openSocket from 'socket.io-client';

class LiveScoreScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            score: {}
        }

        this.socket = openSocket('ws://localhost:5000');
        this.socket.on('connect', () => {
            console.log('connected');
        })
        this.socket.on('disconnect', () => {
            console.log('disconnected');
            socket.close();
        })
        this.socket.on('error', (e) => {
            console.log('error', e);
            socket.close();
        })
    }

    componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        const match = navigation.getParam('match', undefined);
        console.log('==', match)
        this.socket.on(match, (score) => {
            console.log('****', match)
            this.setState({ score: score });
        })
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    <Content>
                        <Text>{this.state.score.team0}</Text>
                        <Text>{this.state.score.score0}</Text>
                        <Text>{this.state.score.team1}</Text>
                        <Text>{this.state.score.score1}</Text>
                    </Content>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='score' />
            </Container >
        );
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
    dispatchUpdateImportantNos: (importantNos) => dispatch(updateLiveMatchess(importantNos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveScoreScreen);