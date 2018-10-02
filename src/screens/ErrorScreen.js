import React, { Component } from 'react';
import * as Colors from '../themes/colors';
import OfflineNotice from '../components/common/OfflineNotice';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { getNavigationOptions } from '../utils/Navigation';
import FooterComponent from "../components/common/Footer";
import {
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

class ErrorScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        let displayImage = null;
        displayImage = (
            <Image style={styles.userImage} source={require('../../assets/wtf.png')} />);

        return (
            <Container style={styles.container}>
                <OfflineNotice />
                <ScrollView style={styles.scroll}>
                    {displayImage}


                    <Text>fsadasdasda</Text>
                </ScrollView>
                <FooterComponent navigation={this.props.navigation} selected='error' />
            </Container >
        );
    }
}

ErrorScreen.navigationOptions = ({ navigation }) => getNavigationOptions('oops!', Colors.primary, 'white');

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorScreen);

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
})