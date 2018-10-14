import { Get, Post, Delete } from '../utils/APIClient';

export function getUpcomingMatches() {
    return Get('/cricket/match/upcoming');
}

export function getMatchByName(matchName) {
    return Get('/cricket/match/name/' + matchName);
}