import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { updateUser, updateUserToken } from '../actions/UserActions';
import * as Colors from '../themes/colors';
import { getNavigationOptions } from '../utils/Navigation';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Body,
  Footer,
  View,
  Toast
} from 'native-base';
import * as LoginService from '../services/LoginService';
import OfflineNotice from './common/OfflineNotice';
import SmsListener from 'react-native-android-sms-listener';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import * as ErrorUtils from '../utils/ErrorUtils';

class LoginScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //mobileNo: '+919656218555',
      mobileNo: '+919073339660',
      otp: '714125'
    }

    this.generateOTP = this.generateOTP.bind(this);
    this.login = this.login.bind(this);
    this.messageListener = this.messageListener.bind(this);
  }

  componentDidMount() {
    this.smsListenerSubscription = SmsListener.addListener(this.messageListener)
  }

  componentWillUnMount() {
    this.smsListenerSubscription.remove();
  }

  messageListener(message) {
    let verificationCodeRegex = /([\d]{6}) is your one time password/

    if (verificationCodeRegex.test(message.body)) {
      let verificationCode = message.body.match(verificationCodeRegex)[1]
      if (verificationCode) {
        this.setState({
          otp: verificationCode
        })
        this.login(this.state.mobileNo, this.state.otp);
      }
    }
  }

  login(mobileNo, otp) {
    this.loginLoadingButton.showLoading(true);
    LoginService.validateOTP(mobileNo, otp)
      .then((response) => {
        this.props.dispatchUpdateUserToken(response.data.token);
      }).catch(err => {
        ErrorUtils.handleError(err);
        this.loginLoadingButton.showLoading(false);
      });
  }

  generateOTP(mobileNo) {
    this.loadingButton.showLoading(true);
    LoginService.generateOTP(mobileNo)
      .then((response) => {
        if (response.data.success) {
          Toast.show({
            text: "We have generated an OTP for login. Please wait for SMS.",
            type: "success",
            buttonText: "Okay",
            duration: 3000
          });
        } else {
          Toast.show({
            text: "Error while generating OTP. Please try again.",
            type: "danger",
            buttonText: "Okay",
            duration: 3000
          });
        }
        this.loadingButton.showLoading(false);
      }).catch((err) => {
        ErrorUtils.handleError(err);
        this.loginLoadingButton.showLoading(false);
      });
  }

  render() {
    return (
      <Container>
        <OfflineNotice />
        <Content>
          <Image source={require('../../assets/wtf.png')} style={{
            margin: 25,
            marginTop: 35,
            height: 150,
            width: 150,
            alignSelf: 'center'
          }} />
          <Form>
            <Item floatingLabel>
              <Label>mobile no</Label>
              <Input name="mobileNo" keyboardType="phone-pad" value={this.state.mobileNo} onChangeText={(text) => this.setState({ mobileNo: text })} />
            </Item>
            <View style={styles.button}>
              <AnimateLoadingButton
                ref={c => (this.loadingButton = c)}
                style={styles.button}
                onPress={() => this.generateOTP(this.state.mobileNo)}
                width={200}
                height={50}
                title="generate otp"
                titleFontSize={16}
                titleColor="white"
                backgroundColor={Colors.primary}
                borderRadius={10}
              >
              </AnimateLoadingButton>
            </View>
            <Item floatingLabel>
              <Label>otp</Label>
              <Input name="otp" keyboardType="numeric" value={this.state.otp} onChangeText={(text) => this.setState({ otp: text })} />
            </Item>
            <View style={styles.button}>
              <AnimateLoadingButton
                ref={c => (this.loginLoadingButton = c)}
                style={styles.button}
                onPress={() => this.login(this.state.mobileNo, this.state.otp)}
                width={200}
                height={50}
                title="login"
                titleFontSize={16}
                titleColor="white"
                backgroundColor={Colors.primary}
                borderRadius={10}
              >
              </AnimateLoadingButton>
            </View>
          </Form>
        </Content >
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footer: {
    backgroundColor: Colors.secondary,
    height: 25
  }
});

LoginScreen.navigationOptions = ({ navigation }) => getNavigationOptions('wtf', Colors.primary, 'white');

const mapStateToProps = store => ({
  user: store.userReducer.user,
  token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
  dispatchUpdateCurrentUser: (user) => dispatch(updateUser(user)),
  dispatchUpdateUserToken: (token) => dispatch(updateUserToken(token))
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);