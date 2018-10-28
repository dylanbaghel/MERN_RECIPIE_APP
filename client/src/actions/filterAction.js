import {
    SET_TEXT_FILTER
} from './types';

export const setTextFilter = (text) => {
    return {
        type: SET_TEXT_FILTER,
        text
    };
};