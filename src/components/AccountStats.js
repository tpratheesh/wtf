import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'native-base';

class AccountStats extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <Text>Account stats here</Text>
        )
    }
}

const styles = StyleSheet.create({
});

const mapStateToProps = store => ({
    userAccounts: store.userReducer.userAccounts,
    userSettings: store.userReducer.userSetting,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountStats);