import { ApiService } from './ServerUtils';
import reduxState from '../store/createStore';

export function Get(url) {
    ApiService.defaults.headers.common['Authorization'] = reduxState.store.getState().userReducer.token || '';
    return ApiService({
        method: 'GET',
        url: url,
    })
}

export function Post(url, params) {
    ApiService.defaults.headers.common['Authorization'] = reduxState.store.getState().userReducer.token || '';
    return ApiService({
        method: 'POST',
        url: url,
        data: params,
    })
}

export function Delete(url) {
    ApiService.defaults.headers.common['Authorization'] = reduxState.store.getState().userReducer.token || '';
    return ApiService({
        method: 'DELETE',
        url: url,
    })
}