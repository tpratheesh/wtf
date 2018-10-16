import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { updateUser, updateUserToken } from '../actions/UserActions';
import * as Colors from '../themes/colors';
import { getLoginNavigationOptions } from '../utils/Navigation';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  View,
} from 'native-base';
import * as LoginService from '../services/LoginService';
import OfflineNotice from './common/OfflineNotice';
import SmsListener from 'react-native-android-sms-listener';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import * as ErrorUtils from '../utils/ErrorUtils';
import { toastMessage } from '../utils/ToastUtils';
import ToastConstants from '../constants/ToastConstants';

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
    var re = new RegExp('^(\\+\\d{1,3}[- ]?)?\\d{10}$');
    if (!re.test(mobileNo)) {
      toastMessage("Please enter a valid mobile no", ToastConstants.DANGER);
      this.loginLoadingButton.showLoading(false);
      return false;
    }
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
          toastMessage("We have generated an OTP for login. Please wait for SMS.", ToastConstants.SUCCESS);
        } else {
          toastMessage("Error while generating OTP. Please try again.", ToastConstants.DANGER);
        }
        this.loadingButton.showLoading(false);
      }).catch((err) => {
        ErrorUtils.handleError(err);
        this.loginLoadingButton.showLoading(false);
      });
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/stadium/1.jpg')} style={styles.backgroundImage}>
        <OfflineNotice />
        <Form>
          <Item floatingLabel>
            <Label style={{ color: Colors.white, fontSize: 16, fontWeight: "bold" }}>mobile no</Label>
            <Input name="mobileNo" placeholderTextColor={Colors.white} keyboardType="phone-pad" style={styles.input} value={this.state.mobileNo} onChangeText={(text) => this.setState({ mobileNo: text })} />
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
            <Label style={{ color: Colors.white, fontSize: 16, fontWeight: "bold" }}>otp</Label>
            <Input name="otp" placeholderTextColor={Colors.white} keyboardType="numeric" style={styles.input} value={this.state.otp} onChangeText={(text) => this.setState({ otp: text })} />
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
      </ImageBackground>
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
  },
  container: {
    flex: 1,
    padding: 0,
  },
  backgroundImage: {
    width: null,
    height: null,
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  input: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold"
  }
});

LoginScreen.navigationOptions = ({ navigation }) => getLoginNavigationOptions('3rd', Colors.transparent, Colors.primaryFont);

const mapStateToProps = store => ({
  user: store.userReducer.user,
  token: store.userReducer.token
})

const mapDispatchToProps = dispatch => ({
  dispatchUpdateCurrentUser: (user) => dispatch(updateUser(user)),
  dispatchUpdateUserToken: (token) => dispatch(updateUserToken(token))
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);