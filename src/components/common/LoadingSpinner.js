import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import * as Colors from '../../themes/colors';

export default class LoadingSpinner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: this.props.loading || false
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} color={Colors.primary} animation="slide" />
            </View>
        )
    }
}