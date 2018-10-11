import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Left, Card, CardItem, Text, Body, View, } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";

class TeamSelectScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            match: this.props.navigation.getParam('match', undefined)
        }
        this._renderContent = this._renderContent.bind(this);
        this._renderMatchHeader = this._renderMatchHeader.bind(this);
        this._renderTeamHeader = this._renderTeamHeader.bind(this);
        this.__renderPlayersSection = this._renderPlayersSection.bind(this);
    }

    componentDidMount() {
    }

    _renderMatchHeader() {
        return (
            <CardItem header bordered>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Text style={styles.match}>{this.state.match.name || ''}</Text>
                    <Text style={styles.series}>{this.state.match.series.name || ''}</Text>
                </View>
            </CardItem>
        )
    }

    _renderTeamHeader(team, teamStyle) {
        return (
            <CardItem header bordered>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Text style={teamStyle}>{team.name || ''} {'(' + team.shortName + ')'}</Text>
                </View>
            </CardItem>
        )
    }

    _renderPlayersSection(players) {
        if (players == undefined || players == null || players.length == 0) {
            return (
                <CardItem bordered>
                    <Body>
                        <Text>Squad not announced</Text>
                    </Body>
                </CardItem >
            )
        } else {
            return (
                <CardItem bordered>
                    <List dataArray={players}
                        renderRow={(player) =>
                            <ListItem avatar>
                                <Left>
                                    <Image source={require('../../assets/wtf.png')} style={{
                                        height: 30,
                                        width: 30,
                                        alignSelf: 'center'
                                    }} />
                                </Left>
                                <Body>
                                    <View>
                                        <Text>{player.player.name || 'player name here'}</Text>
                                        <Text style={styles.role}>{player.role || 'player role here'}</Text>
                                    </View>
                                </Body>
                            </ListItem>
                        }>
                    </List>
                </CardItem>
            )
        }
    }

    _renderContent() {
        return (
            <Card transparent>
                {this._renderMatchHeader()}
                {this._renderTeamHeader(this.state.match.squad1.team, styles.team1)}
                {this._renderPlayersSection(this.state.match.squad1.players)}

                {this._renderTeamHeader(this.state.match.squad2.team, styles.team2)}
                {this._renderPlayersSection(this.state.match.squad2.players)}
            </Card>
        )
    }

    render() {
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    <Content>
                        {this._renderContent()}
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
    role: {
        alignSelf: "flex-end",
        fontSize: 10,
        fontWeight: 'normal',
        color: Colors.secondary
    }
});

TeamSelectScreen.navigationOptions = ({ navigation }) => getNavigationOptions('match', Colors.primary, 'white');

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelectScreen);