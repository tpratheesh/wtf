import Action from '../constants/ActionConstants'

const initialState = { importantNos: [] }

export default function liveMatchesReducer(state = initialState, action) {
    switch (action.type) {
        case Action.UPDATE_LIVE_MATCHES:
            return { ...state, liveMatches: action.liveMatches }
        default:
            return state
    }
}