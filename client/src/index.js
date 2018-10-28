import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import configureStore from './store/configureStore';
import { removeCurrnetUser, setCurrentUser } from './actions/authAction';
import { setAuthToken } from './utils/setAuthToken';
import { startSetRecipies, setRecipies } from './actions/recipiesAction';

const store = configureStore();

let jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

const renderApp = () => {
    ReactDOM.render(jsx, document.getElementById('root'));
};


if (localStorage.getItem('recipieToken')) {
    const token = localStorage.getItem('recipieToken');
    setAuthToken(token);
    const decoded = jwt_decode(token);
    console.log(decoded);
    const user = {
        _id: decoded._id,
        fullName: decoded.fullName,
        email: decoded.email
    }
    store.dispatch(setCurrentUser(user));
    store.dispatch(startSetRecipies());
    renderApp();
} else {
    store.dispatch(removeCurrnetUser());
    store.dispatch(setRecipies([]));
    renderApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
