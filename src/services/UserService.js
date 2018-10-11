import { Get, Post, Delete, } from '../utils/APIClient';

export function updateProfilePhoto(photo) {
    return Post('/user/photo/update', photo);
}