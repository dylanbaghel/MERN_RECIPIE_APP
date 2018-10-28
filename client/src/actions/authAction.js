import axios from 'axios';

import {
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER
} from './types';

import { setAuthToken } from './../utils/setAuthToken';
import { startSetRecipies, setRecipies } from './recipiesAction';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export const startLogin = (user) => dispatch => {
    return axios.post('http://localhost:4100/users/login', user)
        .then((res) => {
            const token = res.headers['x-auth'];
            dispatch(setCurrentUser(res.data.user));
            setAuthToken(token);
            localStorage.setItem('recipieToken', token);
            dispatch(startSetRecipies());
            return Promise.resolve('got');
        })
        .catch((e) => {
            console.log(e.response);
            return Promise.reject(e.response);
        });
};

export const startRegister = (user) => dispatch => {
    return axios.post('http://localhost:4100/users', user)
        .then((res) => {
            const token = res.headers['x-auth'];
            dispatch(setCurrentUser(res.data.user));
            setAuthToken(token);
            localStorage.setItem('recipieToken', token);
            return Promise.resolve('got');
        }).catch((e) => {
            console.log(e.response);
            return Promise.reject(e.response);
        });
};

export const removeCurrnetUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
};

export const startLogout = () => dispatch => {
    axios.delete('http://localhost:4100/users/logout')
        .then((res) => {
            setAuthToken(false);
            console.log(res);
            dispatch(removeCurrnetUser());
            localStorage.removeItem('recipieToken');
            dispatch(setRecipies([]));
        })
        .catch((e) => {
            console.log(e.response);
        });
};