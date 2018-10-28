import {
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER
} from './../actions/types';

const authReducerDefaultState = {};

const authReducer = (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.user
            };
        case REMOVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
};

export default authReducer;