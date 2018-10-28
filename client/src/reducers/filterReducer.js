import {
    SET_TEXT_FILTER
} from './../actions/types';

const filterReducerDefaultState = {
    text: ''
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case SET_TEXT_FILTER:
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};

export default filterReducer;