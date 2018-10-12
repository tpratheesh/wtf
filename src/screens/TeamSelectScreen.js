import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body, View, Button, } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import { updateUserMatchTeam } from "../actions/UserMatchTeamAction";

class TeamSelectScreen extends Component {
    constructor(props) {
        super(props)

        const match = this.props.navigation.getParam('match', undefined)
        let players = []
        if (this.props.userMatchTeams.filter(e => e.match == match._id)) {
            players = this.props.userMatchTeams.filter(e => e.match == match._id).players || []
        }
        this.state = {
            match: match,
            selectedPlayers: players,
            squad1Players: match.squad1.players,
            squad2Players: match.squad2.players
        }
        this._renderContent = this._renderContent.bind(this);
        this._renderMatchHeader = this._renderMatchHeader.bind(this);
        this._renderTeamHeader = this._renderTeamHeader.bind(this);
        this.__renderPlayersSection = this._renderPlayersSection.bind(this);
        this._renderPlayers = this._renderPlayers.bind(this);
        this._renderSaveFooter = this._renderSaveFooter.bind(this);
        this.onPlayerClick = this.onPlayerClick.bind(this);
        this.selectedPlayerStyle = this.selectedPlayerStyle.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
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

    onPlayerClick(player) {
        const isSelected = this.state.selectedPlayers.includes(player.player._id);
        if (isSelected) {
            const selectedArr = this.state.selectedPlayers.filter(e => e !== player.player._id);
            this.setState({
                selectedPlayers: selectedArr,
            })
        } else {
            let selectedArr = [...this.state.selectedPlayers];
            selectedArr.push(player.player._id)
            this.setState({
                selectedPlayers: selectedArr
            })
        }
    }

    _renderPlayers(players) {
        let arr = [];
        players.forEach((player) => {
            const isSelected = this.state.selectedPlayers.includes(player.player._id)
            arr.push(
                <CardItem button
                    key={player.player._id}
                    style={{ flex: 1 }}
                    onPress={() => { this.onPlayerClick(player) }}>
                    <View style={this.selectedPlayerStyle(isSelected)}>
                        <Image source={require('../../assets/wtf.png')} style={styles.playerImage} />
                        <Text style={styles.name}>{player.player.name || '<player name here>'}</Text>
                        <Text style={styles.role}>{player.role || ''}</Text>
                    </View>
                </CardItem >
            )
        });
        return (<Card style={{ flex: 1 }}>
            {arr}
        </Card>)
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
                    {this._renderPlayers(players)}
                </CardItem>
            )
        }
    }

    saveTeam() {
        console.log(this.state.selectedPlayers)
    }

    _renderSaveFooter() {
        return (
            <CardItem footer bordered>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Button full onPress={() => { this.saveTeam() }}>
                        <Text>save team</Text>
                    </Button>
                </View>
            </CardItem>
        )
    }

    _renderContent() {
        return (
            <Card transparent>
                {this._renderMatchHeader()}
                {this._renderTeamHeader(this.state.match.squad1.team, styles.team1)}
                {this._renderPlayersSection(this.state.squad1Players)}

                {this._renderTeamHeader(this.state.match.squad2.team, styles.team2)}
                {this._renderPlayersSection(this.state.squad2Players)}
                {this._renderSaveFooter()}
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

    selectedPlayerStyle = function (isSelected) {
        if (isSelected == true) {
            return {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                backgroundColor: Colors.selected,
                color: Colors.danger,
            }
        } else {
            return {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }
        }
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
        fontSize: 10,
        fontWeight: 'normal',
        color: Colors.secondary,
        alignSelf: 'center',
        paddingRight: 2
    },
    selected: {
        color: Colors.primary
    },
    name: {
        flexGrow: 1,
        alignSelf: "flex-start",
        alignSelf: 'center',
    },
    playerImage: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        paddingLeft: 2
    }
});

TeamSelectScreen.navigationOptions = ({ navigation }) => getNavigationOptions('match', Colors.primary, 'white');

const mapStateToProps = store => ({
    userMatchTeams: store.userMatchTeamReducer.userMatchTeams
})

const mapDispatchToProps = dispatch => ({
    dispatchUserMatchTeam: (userMatchTeam) => dispatch(updateUserMatchTeam(userMatchTeam))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelectScreen);