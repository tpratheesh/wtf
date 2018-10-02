import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../../utils/Navigation';
import {
    Image,
    ScrollView,
} from 'react-native';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            let displayImage = null;
            displayImage = (
                <Image style={styles.userImage} source={require('../../../assets/wtf.png')} />);

            return (
                <Container style={styles.container}>
                    <ScrollView style={styles.scroll}>
                        {displayImage}
                        <Text>Opps! That was unexpected!</Text>
                    </ScrollView>
                    <FooterComponent navigation={this.props.navigation} selected='error' />
                </Container >
            );
        }
        return this.props.children;
    }
}

ErrorHandler.navigationOptions = ({ navigation }) => getNavigationOptions('me', Colors.primary, 'white');

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);