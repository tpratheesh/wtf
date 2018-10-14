import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import * as Colors from '../themes/colors';
import { connect } from 'react-redux';
import { Text, CardItem } from 'native-base';

class Score extends Component {
    constructor(props) {
        super(props)

        let match = this.props.navigation.getParam('match', undefined);

        this.state = {
            match: match
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let score = this.props.liveMatches.filter(function (scoreObj) {
            return scoreObj.match == match;
        })
        score = score[0] || {}

        if (match == undefined) {
            return (<Text>oops! cool, u found that bug! wen u read this message, lemme know :D</Text>)
        } else {
            return (
                <CardItem header bordered>
                    <View style={{ flex: 1, alignSelf: "center" }}>
                        <Text>{score.team0}</Text>
                        <Text>{score.score0}</Text>
                        <Text>{score.team1}</Text>
                        <Text>{score.score1}</Text>
                    </View>
                </CardItem>
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

const mapStateToProps = store => ({
    liveMatches: store.liveMatchesReducer.liveMatches,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);