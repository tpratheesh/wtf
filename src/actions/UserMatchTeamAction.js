import Action from '../constants/ActionConstants'

export function updateUserMatchTeam(userMatchTeam) {
    return {
        type: Action.UPDATE_USER_MATCH_TEAM,
        userMatchTeam,
    };
}
