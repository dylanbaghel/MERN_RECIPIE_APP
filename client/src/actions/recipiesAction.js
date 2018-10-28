import axios from 'axios';

import {
    ADD_RECIPIE,
    EDIT_RECIPIE,
    REMOVE_RECIPIE,
    SET_RECIPIES
} from './types';

import { setLoading } from './loadingAction';


export const startAddRecipie = (recipie) => dispatch => {
    dispatch(setLoading(true));
    axios.post('http://localhost:4100/recipies', recipie)
        .then((res) => {
            console.log(res.data);
            dispatch(addRecipie(res.data.recipie));
            dispatch(setLoading(false));
        })
        .catch((e) => {
            console.log(e.response);
        });
};

export const addRecipie = (recipie = {}) => {
    return {
        type: ADD_RECIPIE,
        recipie: {
            ...recipie
        }
    };
};

export const startEditRecipie = (_id, updates) => dispatch => {
    dispatch(setLoading(true));
    axios.put(`http://localhost:4100/recipies/${_id}`, updates)
        .then((res) => {
            console.log(res.data);
            dispatch(editRecipie(res.data.recipie._id, res.data.recipie));
            dispatch(setLoading(false));
        }).catch((e) => {
            console.log(e.response);
        });
};

export const editRecipie = (_id, updates) => {
    return {
        type: EDIT_RECIPIE,
        _id,
        updates
    };
}

export const startRemoveRecipie = (_id) => dispatch => {
    dispatch(setLoading(true));
    axios.delete(`http://localhost:4100/recipies/${_id}`)
        .then((res) => {
            // console.log(res.data);
            dispatch(removeRecipie(res.data.recipie._id));
            dispatch(setLoading(false));
        }).catch((e) => {
            console.log(e.response);
        });
};

export const removeRecipie = (_id) => {
    return {
        type: REMOVE_RECIPIE,
        _id
    };
};

export const startSetRecipies = () => dispatch => {
    dispatch(setLoading(true));
    axios.get('http://localhost:4100/recipies')
        .then((res) => {
            console.log(res.data.recipies);
            dispatch(setRecipies(res.data.recipies));
            dispatch(setLoading(false));
        })
        .catch((e) => {
            console.log(e.response);
        });
};

export const setRecipies = (recipies) => {
    return {
        type: SET_RECIPIES,
        recipies
    };
};