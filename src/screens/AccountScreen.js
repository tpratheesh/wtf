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
    View,
} from 'react-native';
import AccountStats from '../components/AccountStats';
import PTRView from 'react-native-pull-to-refresh';

class AccountScreen extends Component {
    constructor(props) {
        super(props)

        this._refresh = this._refresh.bind(this);
    }

    componentDidMount() {
    }

    _refresh() {
        return new Promise((resolve) => {
            setTimeout(() => { resolve() }, 2000)
        });
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
                <PTRView colors={Colors.refresh} onRefresh={this._refresh}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.headerContainer}>
                            <View style={styles.userRow}>
                                {displayImage}
                                <View style={styles.userNameRow}>
                                    <Text style={styles.userNameText}>{account.name || 'your account name here'}</Text>
                                </View>
                                <View style={styles.userBioRow}>
                                    <Text style={styles.userBioText}>{account.description || 'your account description here'}</Text>
                                </View>
                            </View>
                        </View>
                        <AccountStats />
                    </ScrollView>
                </PTRView>
                <FooterComponent navigation={this.props.navigation} selected='stats' />
            </Container >
        );
    }
}

AccountScreen.navigationOptions = ({ navigation }) => getNavigationOptions('stats', Colors.primary, 'white');

const mapStateToProps = store => ({
    user: store.userReducer.user,
    userAccounts: store.userReducer.userAccounts,
    userSettings: store.userReducer.userSetting,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        paddingTop: 10,
        backgroundColor: Colors.secondary
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
    scroll: {
        backgroundColor: Colors.white,
    },
    sceneContainer: {
        marginTop: 10,
    },
    socialIcon: {
        marginLeft: 14,
        marginRight: 14,
    },
    socialRow: {
        flexDirection: 'row',
    },
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabContainer: {
        flex: 1,
        marginBottom: 12,
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 22.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 13.5,
        textAlign: 'center',
    },
    userImage: {
        borderRadius: 50,
        height: 100,
        marginBottom: 10,
        width: 100,
    },
    userAccountImage: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
    addButton: {
        padding: 10,
    }
})