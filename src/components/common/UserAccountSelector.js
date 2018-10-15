import React, { Component } from 'react';
import {
    StyleSheet,
    Picker
} from 'react-native';
import * as Colors from '../../themes/colors';
import { connect } from 'react-redux';
// import { Picker, } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserAccountsService from '../../services/UserAccountsService';
import { updateUserSettings } from '../../actions/UserActions';
import * as ErrorUtils from '../../utils/ErrorUtils';

class UserAccountSelector extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedUserAccount: this.props.selectedUserAccount
        }

        this.getUserAccounts = this.getUserAccounts.bind(this);
    }

    componentDidMount() {
        UserAccountsService.getUserSettings()
            .then((response) => {
                this.setState({
                    selectedUserAccount: response.data.selectedUserAccount
                })
                console.log(response.data.selectedUserAccount)
                this.props.dispatchUpdateUserSettings(response.data)
            }).catch(err => {
                ErrorUtils.handleError(err);
            });
    }

    onValueChange(value) {
        UserAccountsService.updateSelectedUserAccount(value)
            .then((response) => {
                this.props.dispatchUpdateUserSettings(response.data)
            }).catch(err => {
                ErrorUtils.handleError(err);
            });
    }

    getUserAccounts() {
        var accounts = [];
        this.props.userAccounts.forEach((value, index) => {
            accounts.push(<Picker.Item key={index} label={value.name} value={value._id} />);
        })
        return accounts
    }

    render() {
        if (this.props.userAccounts != undefined && this.props.userAccounts.length > 1) {
            return (<Picker style={styles.picker}
                style={{ height: 50, width: 150 }}
                itemStyle={{ color: Colors.border, fontSize: 14, textAlign: "right" }}
                mode="dropdown"
                iosHeader="select your account"
                iosIcon={<Icon name="caret-down" color={Colors.border} />}
                selectedValue={this.props.userSettings.selectedUserAccount || ''}
                onValueChange={this.onValueChange.bind(this)}
            >
                {this.getUserAccounts()}
            </Picker>)
        } else {
            return (null)
        }
    }
}

const styles = StyleSheet.create({
    pickerItem: {
    },
    picker: {
        paddingRight: 10
    }
});

const mapStateToProps = store => ({
    userAccounts: store.userReducer.userAccounts,
    userSettings: store.userReducer.userSetting,
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateUserSettings: (selectedUserAccount) => dispatch(updateUserSettings(selectedUserAccount))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountSelector);