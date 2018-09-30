import Action from '../constants/ActionConstants'

export function updateUser(user) {
    return {
        type: Action.UPDATE_CURRENT_USER,
        user,
    };
}

export function updateUserToken(token) {
    return {
        type: Action.UPDATE_USER_TOKEN,
        token,
    };
}

export function updateUserPhoto(photo) {
    return {
        type: Action.UPDATE_USER_PHOTO,
        photo,
    };
}

export function updateUserAccounts(userAccounts) {
    return {
        type: Action.UPDATE_USER_ACCOUNTS,
        userAccounts,
    };
}

export function updateUserSettings(userSettings) {
    return {
        type: Action.UPDATE_USER_SETTINGS,
        userSettings,
    };
}