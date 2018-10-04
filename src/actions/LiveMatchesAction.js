import Action from '../constants/ActionConstants'

export function updateliveMatches(liveMatches) {
    console.log('updating ' + liveMatches.length + ' matches')
    return {
        type: Action.UPDATE_LIVE_MATCHES,
        liveMatches,
    };
}