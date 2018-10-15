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
import * as MatchesService from '../services/MatchesService';
import MatchHeader from '../components/common/MatchHeader';
import * as ErrorUtils from '../utils/ErrorUtils';

class LiveScoreScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            match: undefined
        }

        this._renderLiveScore = this._renderLiveScore.bind(this);
    }

    componentDidMount() {
        const match = this.props.navigation.getParam('match', undefined);
        MatchesService.getMatchByName(match)
            .then((response) => {
                this.setState({
                    match: response.data
                })
            }).catch(err => {
                ErrorUtils.handleError(err);
            });
    }

    componentWillUnmount() {
    }

    _renderLiveScore() {
        const match = this.props.navigation.getParam('match', undefined);

        let score = this.props.liveMatches.filter(function (scoreObj) {
            return scoreObj.match == match;
        })
        score = score[0] || {}
        return (
            <Card transparent style={{ padding: 0 }}>
                <CardItem>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.status}>{score.status || ''}</Text>
                    </View>
                </CardItem>
                <CardItem style={styles.matchName}>
                    <View style={{ flex: 1, alignContent: 'flex-start' }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'flex-start',
                        }}>
                            <Text style={styles.team1}>{score.team0}</Text>
                            <Text style={styles.score}>{score.score0}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'flex-start',
                        }}>
                            <Text style={styles.team2}>{score.team1}</Text>
                            <Text style={styles.score}>{score.score1}</Text>
                        </View>
                    </View>
                </CardItem>
            </Card>
        )
    }

    render() {
        console.log(this.state.match)
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    <Content>
                        <Card transparent>
                            {this.state.match ? <MatchHeader match={this.state.match} /> : null}

                            {this.state.match ? this._renderLiveScore() : null}
                        </Card>
                    </Content>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='score' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0
    },
    scroll: {
        backgroundColor: Colors.white,
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
    score: {
        fontSize: 12,
    },
    status: {
        color: Colors.danger,
        fontSize: 12,
        alignSelf: "flex-end"
    },
});

LiveScoreScreen.navigationOptions = ({ navigation }) => getNavigationOptions('match', Colors.primary, 'white');

const mapStateToProps = store => ({
    liveMatches: store.liveMatchesReducer.liveMatches,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveScoreScreen);