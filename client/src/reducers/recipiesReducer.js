import {
    ADD_RECIPIE,
    EDIT_RECIPIE,
    REMOVE_RECIPIE,
    SET_RECIPIES
} from './../actions/types';

const recipiesReducerDefaultState = [];

const recipiesReducer = (state = recipiesReducerDefaultState, action) => {
    switch(action.type) {
        case ADD_RECIPIE:
            return [
                ...state,
                action.recipie
            ];
        case EDIT_RECIPIE:
            return state.map((recipie) => {
                if (recipie._id !== action._id) {
                    return recipie;
                }

                return {
                    ...recipie,
                    ...action.updates
                };
            });
        case REMOVE_RECIPIE:
            return state.filter((recipie) => {
                return recipie._id !== action._id;
            });
        case SET_RECIPIES:
            return action.recipies;
        default:
            return state;
    }
};

export default recipiesReducer;