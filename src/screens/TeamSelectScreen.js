import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body, View, Button, Badge } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import { toastMessage } from '../utils/ToastUtils';
import ToastConstants from '../constants/ToastConstants';
import * as TeamSelectService from '../services/TeamSelectService';
import * as ErrorUtils from '../utils/ErrorUtils';
import moment from 'moment';
import MatchHeader from '../components/common/MatchHeader';

class TeamSelectScreen extends Component {
    constructor(props) {
        super(props)

        const match = this.props.navigation.getParam('match', undefined);
        let players = []
        if (this.props.userMatchTeams.filter(e => e.match == match._id)) {
            players = this.props.userMatchTeams.filter(e => e.match == match._id).players || []
        }
        this.state = {
            match: match,
            selectedPlayers: players,
            squad1Players: match.squad1.players,
            squad2Players: match.squad2.players,
            squad1Count: 0,
            squad2Count: 0,
            selectedPlayerId: this.props.userMatchTeams._id || '',
            captainSquad: undefined,
            viceCaptainSquad: undefined,
            captain: this.props.userMatchTeams.captain || undefined,
            viceCaptain: this.props.userMatchTeams.viceCaptain || undefined
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
        this.getSquad1PlayerCount = this.getSquad1PlayerCount.bind(this);
        this.getSquad2PlayerCount = this.getSquad2PlayerCount.bind(this);
        this.selectCaptain = this.selectCaptain.bind(this);
        this.selectViceCaptain = this.selectViceCaptain.bind(this);
    }

    componentDidMount() {
        TeamSelectService.getUserAccountMatchTeam(this.state.match._id, this.props.userSettings.selectedUserAccount)
            .then((response) => {
                let players = []
                if (response.data.players != undefined) {
                    response.data.players.forEach((player) => {
                        players.push(player._id);
                    })
                }

                const squad1Count = this.getSquad1PlayerCount(players);
                const squad2Count = this.getSquad2PlayerCount(players);

                this.setState({
                    selectedPlayers: players,
                    selectedPlayerId: response.data._id || '',
                    squad1Count: squad1Count,
                    squad2Count: squad2Count,
                    captain: response.data.captain || undefined,
                    viceCaptain: response.data.viceCaptain || undefined
                })
            }).catch(err => {
                ErrorUtils.handleError(err);
            });
    }

    getSquad1PlayerCount(players) {
        let count = 0;
        players.forEach((player) => {
            const arr = this.state.match.squad1.players.filter(e => e.player._id == player);
            if (arr.length > 0) {
                count++;
            }
        })
        return count;
    }

    getSquad2PlayerCount(players) {
        let count = 0;
        players.forEach((player) => {
            const arr = this.state.match.squad2.players.filter(e => e.player._id == player);
            if (arr.length > 0) {
                count++;
            }
        })
        return count;
    }

    _renderMatchHeader() {
        return (
            <MatchHeader match={this.state.match} />
        )
    }

    _renderTeamHeader(team, teamStyle) {
        return (
            <CardItem header>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Text style={teamStyle}>{team.name || ''} {'(' + team.shortName + ')'}</Text>
                </View>
            </CardItem>
        )
    }

    onPlayerClick(player, squad) {
        const isSelected = this.state.selectedPlayers.includes(player.player._id);
        if (isSelected) {
            if (this.state.captain == player.player._id) {
                this.setState({
                    captainSquad: undefined,
                    captain: undefined
                })
            }
            if (this.state.viceCaptain == player.player._id) {
                this.setState({
                    viceCaptainSquad: undefined,
                    viceCaptain: undefined
                })
            }
            const selectedArr = this.state.selectedPlayers.filter(e => e !== player.player._id);
            this.setState({
                selectedPlayers: selectedArr,
                squad1Count: squad == 'SQUAD1' ? this.state.squad1Count - 1 : this.state.squad1Count,
                squad2Count: squad == 'SQUAD2' ? this.state.squad2Count - 1 : this.state.squad2Count
            })
        } else {
            if (this.state.squad1Count == 7 && squad == 'SQUAD1') {
                toastMessage('Can select max 7 players from a team', ToastConstants.DANGER);
                return false;
            }
            if (this.state.squad2Count == 7 && squad == 'SQUAD2') {
                toastMessage('Can select max 7 players from a team', ToastConstants.DANGER);
                return false;
            }
            if (this.state.selectedPlayers.length == 11) {
                toastMessage('Can select max 11 players only', ToastConstants.DANGER);
                return false;
            }
            let selectedArr = [...this.state.selectedPlayers];
            selectedArr.push(player.player._id)
            this.setState({
                selectedPlayers: selectedArr,
                squad1Count: squad == 'SQUAD1' ? this.state.squad1Count + 1 : this.state.squad1Count,
                squad2Count: squad == 'SQUAD2' ? this.state.squad2Count + 1 : this.state.squad2Count
            })
        }
    }

    selectCaptain(e, player, squad) {
        e.preventDefault();
        e.stopPropagation();

        if (this.state.captain == player.player._id) {
            this.setState({
                captainSquad: undefined,
                captain: undefined
            })
        } else if (this.state.viceCaptain == player.player._id) {
            this.setState({
                captainSquad: squad,
                captain: player.player._id,
                viceCaptainSquad: undefined,
                viceCaptain: undefined
            })
        } else {
            if (this.state.viceCaptainSquad == squad) {
                toastMessage('Cannot select Captain and Vice Captain from same team', ToastConstants.DANGER);
                return false;
            }
            this.setState({
                captainSquad: squad,
                captain: player.player._id
            })
        }
    }

    selectViceCaptain(e, player, squad) {
        e.preventDefault();
        e.stopPropagation();

        if (this.state.viceCaptain == player.player._id) {
            this.setState({
                viceCaptainSquad: undefined,
                viceCaptain: undefined
            })
        } else if (this.state.captain == player.player._id) {
            this.setState({
                viceCaptainSquad: squad,
                viceCaptain: player.player._id,
                captainSquad: undefined,
                captain: undefined
            })
        } else {
            if (this.state.captainSquad == squad) {
                toastMessage('Cannot select Captain and Vice Captain from same team', ToastConstants.DANGER);
                return false;
            }
            this.setState({
                viceCaptainSquad: squad,
                viceCaptain: player.player._id
            })
        }
    }

    _renderPlayers(players, squad) {
        let arr = [];
        players.forEach((player) => {
            const isSelected = this.state.selectedPlayers.includes(player.player._id)
            arr.push(
                <CardItem button
                    key={player.player._id}
                    style={{ flex: 1 }}
                    onPress={() => { this.onPlayerClick(player, squad) }}>
                    <View style={this.selectedPlayerStyle(isSelected)}>
                        <Image source={require('../../assets/wtf.png')} style={styles.playerImage} />
                        <View style={{ flexGrow: 1, alignSelf: "flex-start" }}>
                            <Text style={styles.name}>{player.player.name || '<player name here>'}</Text>
                            <Text style={styles.role}>{player.role || ''}</Text>
                        </View>
                        {isSelected ?
                            <Badge style={this.viceCaptainPlayerStyle(player.player._id == this.state.viceCaptain)}>
                                <TouchableOpacity onPress={(e) => { this.selectViceCaptain(e, player, squad) }}>
                                    <Text> vc </Text>
                                </TouchableOpacity>
                            </Badge>
                            : null}
                        {isSelected ?
                            <Badge style={this.captainPlayerStyle(player.player._id == this.state.captain)}>
                                <TouchableOpacity onPress={(e) => { this.selectCaptain(e, player, squad) }}>
                                    <Text> c </Text>
                                </TouchableOpacity>
                            </Badge>
                            : null}
                    </View>
                </CardItem >
            )
        });
        return (<Card style={{ flex: 1 }}>
            {arr}
        </Card>)
    }

    _renderPlayersSection(players, squad) {
        if (players == undefined || players == null || players.length == 0) {
            return (
                <View>
                    <Body>
                        <Text>Squad not announced</Text>
                    </Body>
                </View>
            )
        } else {
            return (
                <View>
                    {this._renderPlayers(players, squad)}
                </View>
            )
        }
    }

    saveTeam() {
        if (this.state.squad1Count + this.state.squad2Count < 11) {
            toastMessage('Please select min 11 players', ToastConstants.DANGER);
            return false;
        }

        if (this.state.captain == undefined || this.state.viceCaptain == undefined) {
            toastMessage('Please select Captain and Vice Captain for the team', ToastConstants.DANGER);
            return false;
        }

        TeamSelectService.saveUserAccountMatchTeam({
            id: this.state.selectedPlayerId.toString(),
            match: this.state.match._id,
            userAccount: this.props.userSettings.selectedUserAccount,
            players: this.state.selectedPlayers,
            captain: this.state.captain,
            viceCaptain: this.state.viceCaptain
        }).then((response) => {
            this.setState({
                selectedPlayerId: response.data._id,
            });
            this.props.navigation.navigate('HomeScreen');
        }).catch(err => {
            ErrorUtils.handleError(err);
        });
    }

    _renderSaveFooter() {
        return (
            <CardItem footer>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Button full onPress={() => { this.saveTeam() }}>
                        <Text>save team</Text>
                    </Button>
                </View>
            </CardItem>
        )
    }

    _renderContent() {
        const now = moment().utc(false);
        const startDate = moment(this.state.match.matchStartDate);
        const isMatchStarted = now.isAfter(startDate);

        return (
            <Card transparent>
                {this._renderMatchHeader()}

                {this._renderTeamHeader(this.state.match.squad1.team, styles.team1)}
                {this._renderPlayersSection(this.state.squad1Players, "SQUAD1")}

                {this._renderTeamHeader(this.state.match.squad2.team, styles.team2)}
                {this._renderPlayersSection(this.state.squad2Players, "SQUAD2")}
                {this.state.squad1Players == undefined ||
                    this.state.squad1Players == null ||
                    this.state.squad1Players.length == 0 ||
                    this.state.squad2Players == undefined ||
                    this.state.squad2Players == null ||
                    this.state.squad2Players.length == 0 ||
                    isMatchStarted ? null :
                    this._renderSaveFooter()
                }
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
                padding: 5,
                borderRadius: 100
            }
        } else {
            return {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: 5,
                borderRadius: 100
            }
        }
    }

    captainPlayerStyle = function (isCaptain) {
        if (isCaptain == true) {
            return {
                margin: 5,
                lineHeight: 10,
                alignSelf: 'flex-end',
                backgroundColor: Colors.primary
            }
        } else {
            return {
                margin: 5,
                lineHeight: 10,
                alignSelf: 'flex-end',
                backgroundColor: Colors.border
            }
        }
    }

    viceCaptainPlayerStyle = function (isViceCaptain) {
        if (isViceCaptain == true) {
            return {
                margin: 5,
                lineHeight: 10,
                alignSelf: 'flex-end',
                backgroundColor: Colors.primary
            }
        } else {
            return {
                margin: 5,
                lineHeight: 10,
                alignSelf: 'flex-end',
                backgroundColor: Colors.border
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
        alignSelf: 'flex-start',
        paddingRight: 2
    },
    selected: {
        color: Colors.primary
    },
    name: {
        alignSelf: "flex-start",
    },
    playerImage: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        paddingLeft: 2
    },
});

TeamSelectScreen.navigationOptions = ({ navigation }) => getNavigationOptions('match', Colors.primary, 'white');

const mapStateToProps = store => ({
    userMatchTeams: store.userMatchTeamReducer.userMatchTeams,
    liveMatches: store.liveMatchesReducer.liveMatches,
    userSettings: store.userReducer.userSetting,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelectScreen);