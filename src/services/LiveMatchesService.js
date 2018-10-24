import { Get, Post, Delete } from '../utils/APIClient';

export function getLiveMatches() {
    return Get('/cricket/matches/live');
}