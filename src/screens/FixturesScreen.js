import React, { Component } from 'react';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Button, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import {
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

class FixturesScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const { navigation } = this.props;
        const account = navigation.getParam('account', undefined);

        let displayImage = null;
        displayImage = (
            <Image style={styles.userImage} source={require('../../assets/wtf.png')} />);

        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    <Text>fixtures here</Text>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='stats' />
            </Container >
        );
    }
}

FixturesScreen.navigationOptions = ({ navigation }) => getNavigationOptions('stats', Colors.primary, 'white');

const mapStateToProps = store => ({
    user: store.userReducer.user,
    userAccounts: store.userReducer.userAccounts,
    userSettings: store.userReducer.userSetting,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FixturesScreen);

const styles = StyleSheet.create({

})