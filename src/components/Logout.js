import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Colors from '../themes/colors';

export default class LogoutButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Icon name='power' size={20} color={Colors.white} />
        )
    }
}