import Action from '../constants/ActionConstants'

export function updateliveMatches(importantNos) {
    return {
        type: Action.UPDATE_LIVE_MATCHES,
        importantNos,
    };
}