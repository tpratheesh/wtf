import { Get, Post, Delete } from '../utils/APIClient';

export function getUserAccountMatchTeam(match, account) {
    return Get('/cricket/usermatchteam/' + match + '/' + account);
}

export function saveUserAccountMatchTeam(accountMatchTeam) {
    return Post('/cricket/usermatchteam', accountMatchTeam);
}