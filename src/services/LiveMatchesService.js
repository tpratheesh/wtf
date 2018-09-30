import { Get, Post, Delete } from '../utils/APIClient';

export function getImportantNosList() {
    return Get('/importantNumber/list');
}