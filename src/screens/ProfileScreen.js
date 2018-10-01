import React, { Component } from 'react';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import {
    Animated,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'

class ProfileScreen extends Component {
    constructor(props) {
        super(props)

        this.getUserAccounts = this.getUserAccounts.bind(this)
    }

    componentDidMount() {
    }

    renderContactHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.userRow}>
                    <Image
                        style={styles.userImage}
                        source={require('../../assets/wtf.png')}
                    />
                    <View style={styles.userNameRow}>
                        <Text style={styles.userNameText}>{this.props.user.name || 'your name here'}</Text>
                    </View>
                    <View style={styles.userBioRow}>
                        <Text style={styles.userBioText}>{this.props.user.description || 'your bio here'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    getUserAccounts() {
        var accounts = [];
        this.props.userAccounts.forEach((value, index) => {
            accounts.push(<Text key={index}>{value.name}</Text>);
        })
        return accounts
    }

    render() {
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    {this.renderContactHeader()}
                    <List dataArray={this.props.userAccounts}
                        renderRow={(account) =>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail style={styles.userAccountImage} source={require('../../assets/wtf.png')} />
                                </Left>
                                <Body>
                                    <Text>{account.name}</Text>
                                    <Text note>{account.description}</Text>
                                    <Text note>Fame 1234 Top Rank 1</Text>
                                </Body>
                            </ListItem>
                        }>
                    </List>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='me' />
            </Container >
        );
    }
}

ProfileScreen.navigationOptions = ({ navigation }) => getNavigationOptions('me', Colors.primary, 'white');

const mapStateToProps = store => ({
    user: store.userReducer.user,
    userAccounts: store.userReducer.userAccounts,
    userSettings: store.userReducer.userSetting,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

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
    }
})