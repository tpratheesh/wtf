import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";

class ProfileScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }
    render() {
        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <Content>

                </Content>
                <FooterComponent navigation={this.props.navigation} selected='me' />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

ProfileScreen.navigationOptions = ({ navigation }) => getNavigationOptions('me', Colors.primary, 'white');

const mapStateToProps = store => ({
    liveMatches: store.liveMatchesReducer.liveMatches,
    token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateImportantNos: (importantNos) => dispatch(updateLiveMatchess(importantNos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);