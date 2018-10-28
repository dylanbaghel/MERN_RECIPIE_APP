import axios from 'axios';

import {
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER
} from './types';
import { BASE_URL } from './../config';

import { setAuthToken } from './../utils/setAuthToken';
import { startSetRecipies, setRecipies } from './recipiesAction';
import { setLoading } from './loadingAction';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export const startLogin = (user) => dispatch => {
    dispatch(setLoading(true));
    return axios.post(`${BASE_URL}/users/login`, user)
        .then((res) => {
            const token = res.headers['x-auth'];
            dispatch(setCurrentUser(res.data.user));
            setAuthToken(token);
            localStorage.setItem('recipieToken', token);
            dispatch(startSetRecipies());
            dispatch(setLoading(false));
            return Promise.resolve('got');
        })
        .catch((e) => {
            console.log(e.response);
            return Promise.reject(e.response);
        });
};

export const startRegister = (user) => dispatch => {
    dispatch(setLoading(true));
    return axios.post(`${BASE_URL}/users`, user)
        .then((res) => {
            const token = res.headers['x-auth'];
            dispatch(setCurrentUser(res.data.user));
            setAuthToken(token);
            localStorage.setItem('recipieToken', token);
            dispatch(setLoading(false));
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
    dispatch(setLoading(true));
    axios.delete(`${BASE_URL}/users/logout`)
        .then((res) => {
            setAuthToken(false);
            console.log(res);
            dispatch(removeCurrnetUser());
            localStorage.removeItem('recipieToken');
            dispatch(setRecipies([]));
            dispatch(setLoading(false));
        })
        .catch((e) => {
            console.log(e.response);
        });
};