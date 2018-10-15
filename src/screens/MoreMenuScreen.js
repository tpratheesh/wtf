import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Container, Content, View, Button, Text } from 'native-base';
import * as Colors from '../themes/colors';
import { connect } from 'react-redux';
import { getNavigationOptionsWithAction } from '../utils/Navigation';
import OfflineNotice from '../components/common/OfflineNotice';
import FooterComponent from "../components/common/Footer";
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateUserToken } from '../actions/UserActions';

class MoreMenuScreen extends Component {

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
    }

    logout() {
        this.props.dispatchUpdateUserToken(undefined)
    }

    render() {
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>

                </ScrollView>
                <Button full transparent onPress={() => { this.logout() }}>
                    <Icon name='power-off' size={20} color={Colors.danger} />
                    <Text uppercase={false} style={{ color: Colors.danger }}> logout</Text>
                </Button>
                <FooterComponent
                    navigation={this.props.navigation}
                    selected='more' />
            </Container >
        )
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
    },
    button: {
    },
    buttonText: {
        flex: 1,
        textAlign: "left",
    }
});

MoreMenuScreen.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('more', Colors.primary, Colors.primaryFont, null, null);

const mapStateToProps = store => ({
    token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateUserToken: (token) => dispatch(updateUserToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreMenuScreen);