import React, { Component } from 'react';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Button, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import AccountStats from '../components/AccountStats';
import PTRView from 'react-native-pull-to-refresh';
//import ImagePicker from "react-native-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as PermissionUtils from '../utils/PermissionUtils';
import PermissionConstants from '../constants/PermissionConstants';
import * as UserService from '../services/UserService';
import * as ErrorUtils from '../utils/ErrorUtils';

class ProfileScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photo: this.props.user.photo || undefined
        }

        this._refresh = this._refresh.bind(this);
    }

    componentDidMount() {
    }

    _refresh() {
        return new Promise((resolve) => {
            setTimeout(() => { resolve() }, 2000)
        });
    }

    selectPhotoTapped() {
        PermissionUtils.requestPermissions(PermissionConstants.CAMERA);
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            allowsEditing: false,
            fileSize: 1024
        };

        // ImagePicker.showImagePicker(options, response => {
        //     if (response.didCancel) {
        //         console.log("User cancelled photo picker");
        //     } else if (response.error) {
        //         console.log("ImagePicker Error: ", response.error);
        //     } else if (response.customButton) {
        //         console.log("User tapped custom button: ", response.customButton);
        //     } else {
                // CompressImage.createCompressedImage(response.uri, 'wtf').then((compressed) => {
                //     console.log(compressed)
                //     UserService.updateProfilePhoto({
                //         photo: compressed
                //     }).then((response) => {
                //         console.log('back here');
                //     }).catch(err => {
                //         console.log(err)
                //         ErrorUtils.handleError(err);
                //     });
                // }).catch((err) => {
                //     console.log(err)
                //     ErrorUtils.handleError(err);
                // });
            // }
        // });
    }

    sub(displayImage) {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View
                            style={[
                                styles.avatar,
                                styles.avatarContainer
                            ]}
                        >
                            {displayImage}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        let displayImage = null;
        if (this.state.photo == undefined) {
            displayImage = (
                <Image style={styles.userImage} source={require('../../assets/wtf.png')} />);
        } else {
            displayImage = (
                <Image style={styles.userImage} source={require('../../assets/wtf.png')} />);
        }
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <PTRView colors={Colors.refresh} onRefresh={this._refresh}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.headerContainer}>
                            <View style={styles.userRow}>
                                {this.sub(displayImage)}
                                <View style={styles.userNameRow}>
                                    <Text style={styles.userNameText}>{this.props.user.name || 'your name here'}</Text>
                                </View>
                                <View style={styles.userBioRow}>
                                    <Text style={styles.userBioText}>{this.props.user.description || 'your bio here'}</Text>
                                </View>
                            </View>
                        </View>
                        {this.props.userAccounts.length > 1 ?
                            <List dataArray={this.props.userAccounts}
                                renderRow={(account) =>
                                    <ListItem avatar onPress={() => {
                                        this.props.navigation.navigate('AccountScreen', { account: account })
                                    }}>
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
                            :
                            <AccountStats />
                        }
                    </ScrollView>
                </PTRView>
                <FooterComponent navigation={this.props.navigation} selected='me' />
            </Container >
        );
    }
}

ProfileScreen.navigationOptions = ({ navigation }) => getNavigationOptions('me', Colors.primary, Colors.primaryFont);

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
        borderRadius: .1,
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