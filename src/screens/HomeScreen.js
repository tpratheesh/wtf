import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Container, Content, Text } from 'native-base';
import * as Colors from '../themes/colors';
import { updateUserPhoto, updateUserToken, updateUserAccounts, updateUserSettings } from '../actions/UserActions';
import { connect } from 'react-redux';
import OfflineNotice from '../components/common/OfflineNotice';
import * as ErrorUtils from '../utils/ErrorUtils';
import { getNavigationOptionsWithAction } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import * as UserAccountsService from '../services/UserAccountsService';
import UserAccountSelector from '../components/common/UserAccountSelector';
import PTRView from 'react-native-pull-to-refresh';

class HomeScreen extends Component {
    constructor(props) {
        super(props)

        this._refresh = this._refresh.bind(this);
    }

    componentDidMount() {
        this._refresh();
    }

    _refresh() {
        return new Promise((resolve) => {
            if (this.props.userAccounts == undefined || this.props.userAccounts.length == 0) {
                UserAccountsService.getUserAccounts()
                    .then((response) => {
                        this.props.dispatchUpdateUserAccounts(response.data)
                    }).catch(err => {
                        ErrorUtils.handleError(err);
                    });
            }
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <PTRView colors={Colors.refresh} onRefresh={this._refresh}>
                    <ScrollView style={styles.scroll}>
                        <Content>
                            <Text>namaskaaaaaaaaaram!!</Text>
                        </Content>
                    </ScrollView>
                </PTRView>
                <FooterComponent
                    navigation={this.props.navigation}
                    selected='home' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        alignItems: "center"
    },
    scroll: {
        backgroundColor: Colors.white,
    }
});

HomeScreen.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('home', Colors.primary, 'white', null, <UserAccountSelector />);

const mapStateToProps = store => ({
    user: store.userReducer.user,
    userAccounts: store.userReducer.userAccounts,
    token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateUserPhoto: (photo) => dispatch(updateUserPhoto(photo)),
    dispatchUpdateUserAccounts: (userAccounts) => dispatch(updateUserAccounts(userAccounts)),
    dispatchUpdateUserToken: (token) => dispatch(updateUserToken(token)),
    dispatchUpdateUserSettings: (userSettings) => dispatch(updateUserSettings(userSettings))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);