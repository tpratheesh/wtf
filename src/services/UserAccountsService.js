import { Get, Post, Delete } from '../utils/APIClient';

export function getUserAccounts() {
    return Get('/useraccount/list');
}

export function updateSelectedUserAccount(value) {
    return Post('usersetting/selectedUserAccount/update/' + value, {});
}

export function getUserSettings() {
    console.log('get user settings')
    return Get('/usersetting');
}