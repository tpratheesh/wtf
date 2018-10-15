import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import * as Colors from '../../themes/colors';
import { connect } from 'react-redux';
import { CardItem, Text, View, } from 'native-base';
import moment from 'moment';

class MatchHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            match: this.props.match || undefined
        }
    }

    render() {
        const now = moment().utc(false);
        const startDate = moment(this.state.match.matchStartDate);
        return (
            <CardItem header bordered>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Text style={styles.match}>{this.state.match.name || ''}</Text>
                    <Text style={styles.series}>{this.state.match.series.name || ''}</Text>
                    {now.isBefore(startDate) ?
                        <Text style={{ fontSize: 10, color: Colors.border }}>{'match starts in ' + now.to(startDate)}</Text>
                        : null}
                </View>
            </CardItem>
        )
    }
}

const styles = StyleSheet.create({
    match: {
        color: Colors.match,
        fontSize: 12,
    },
    series: {
        color: Colors.series,
        fontSize: 12,
    },
});

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeader);