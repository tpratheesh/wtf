import axios from 'axios';

export const LoginService = axios.create({
    //baseURL: 'http://localhost:3000',
    baseURL: 'https://wtf.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const ApiService = axios.create({
    //baseURL: 'http://localhost:3000/api',
    baseURL: 'https://wtf.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});