import Action from '../constants/ActionConstants'

export function updateUpcomingMatches(upcomingMatches) {
    console.log('updating ' + upcomingMatches.length + ' matches')
    return {
        type: Action.UPDATE_UPCOMING_MATCHES,
        upcomingMatches,
    };
}