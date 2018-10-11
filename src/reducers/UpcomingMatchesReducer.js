import Action from '../constants/ActionConstants'

const initialState = { upcomingMatches: [] }

export default function upcomingMatchesReducer(state = initialState, action) {
    switch (action.type) {
        case Action.UPDATE_UPCOMING_MATCHES:
            return { ...state, upcomingMatches: action.upcomingMatches }
        default:
            return state
    }
}