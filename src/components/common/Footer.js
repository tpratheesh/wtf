import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { View, Footer, FooterTab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Colors from '../../themes/colors';

class FooterComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Footer style={styles.footerStyle}>
                <FooterTab style={styles.footerTab}>
                    <FooterButton selected={this.props.selected == 'home' ? true : false} icon='home' title='home' navigation={this.props.navigation} screen='HomeScreen' />
                    <FooterButton selected={this.props.selected == 'live' ? true : false} icon='rocket' title='live' navigation={this.props.navigation} screen='LiveMatchesScreen' />
                    <FooterButton selected={this.props.selected == 'me' ? true : false} icon='user-circle-o' title='me' navigation={this.props.navigation} screen='ProfileScreen' />
                    <FooterButton selected={this.props.selected == 'more' ? true : false} icon='bars' title='more' navigation={this.props.navigation} screen='MoreMenuScreen' />
                </FooterTab>
            </Footer >
        )
    }
}

class FooterButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.selected) {
            return (
                <Button active style={styles.activeBtn} onPress={() => { this.props.navigation.navigate(this.props.screen) }}>
                    <Icon name={this.props.icon} size={20} color={Colors.primary} />
                    <Text uppercase={false} style={{ color: Colors.primary }}>{this.props.title}</Text>
                </Button>
            )
        } else {
            return (
                <Button onPress={() => { this.props.navigation.navigate(this.props.screen) }}>
                    <Icon name={this.props.icon} size={20} color={Colors.border} />
                    <Text uppercase={false} style={{ color: Colors.border }}>{this.props.title}</Text>
                </Button>
            )
        }
    }
}

const styles = StyleSheet.create({
    activeBtn: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
        color: Colors.primary,
        transform: [{ scale: 1.5 }]
    },
    footerStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
        textTransform: "lowercase"
    },
    footerTab: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
        textTransform: "lowercase"
    }
});

export default FooterComponent