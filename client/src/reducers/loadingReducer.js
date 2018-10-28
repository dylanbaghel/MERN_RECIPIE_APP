import {
    SET_LOADING
} from './../actions/types';

const loadingReducerDefaultState = false;

const loadingReducer = (state = loadingReducerDefaultState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return action.bool;
        default:
            return state;
    }
};

export default loadingReducer;