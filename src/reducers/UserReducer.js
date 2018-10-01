import jwt from 'jwt-decode'
import Action from '../constants/ActionConstants'

const initialState = { user: {}, token: undefined, userAccounts: [], userSetting: { selectedUserAccount: '', selectedTheme: 'default' } }

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case Action.UPDATE_CURRENT_USER:
            return { ...state, user: action.user }
        case Action.UPDATE_USER_TOKEN:
            return { ...state, token: action.token, user: getUser(action.token) }
        case Action.UPDATE_USER_PHOTO:
            let user = state.user
            user.userDetails.photo = action.photo
            return { ...state, user: user }
        case Action.UPDATE_USER_ACCOUNTS:
            return { ...state, userAccounts: action.userAccounts }
        case Action.UPDATE_USER_SETTINGS:
            return { ...state, userSetting: action.userSettings }
        default:
            return state
    }
}

function getUser(token) {
    if (token == undefined)
        return {}
    else {
        var decoded = jwt(token)
        return decoded
    }
}