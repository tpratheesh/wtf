import Action from '../constants/ActionConstants'

const initialState = {
    userMatchTeams: []
}

export default function userMatchTeamReducer(state = initialState, action) {
    switch (action.type) {
        case Action.UPDATE_USER_MATCH_TEAM:
            return { ...state, userMatchTeams: updateUserMatchTeams(action.userMatchTeam) }
        default:
            return state
    }
}

function updateUserMatchTeams(userMatchTeam) {
    console.log(userMatchTeam)
    let arr = this.state.userMatchTeams.filter(e => e.match !== match._id);
    arr.push(userMatchTeam)
    console.log(arr)
    return arr
}