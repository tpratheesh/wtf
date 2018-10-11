import { Get, Post, Delete } from '../utils/APIClient';

export function getUpcomingMatches() {
    return Get('/cricket/match/upcoming');
}