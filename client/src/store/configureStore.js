import { combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import recipiesReducer from './../reducers/recipiesReducer';
import authReducer from './../reducers/authReducer';
import loadingReducer from './../reducers/loadingReducer';
import filterReducer from './../reducers/filterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(combineReducers({
        recipies: recipiesReducer,
        auth: authReducer,
        isLoading: loadingReducer,
        filters: filterReducer
    }), composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store;
};

export default configureStore;