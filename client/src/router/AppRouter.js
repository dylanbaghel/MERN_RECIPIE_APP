import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Header from './../components/Header';
import Dashboard from './../components/Dashboard';
import Recipie from './../components/Recipie';
import AddRecipie from './../components/AddRecipie';
import EditRecipie from './../components/EditRecipie';
import LandingPage from './../components/LandingPage';
import Login from './../components/Login';
import Signup from './../components/Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <PublicRoute 
                        exact path="/"
                        component={LandingPage}
                    />
                    <PublicRoute 
                        exact path="/login"
                        component={Login}
                    />
                    <PublicRoute 
                        exact path="/signup"
                        component={Signup}
                    />
                    <PrivateRoute 
                        exact path="/dashboard"
                        component={Dashboard}
                    />
                    <PrivateRoute 
                        exact path="/recipie/:id"
                        component={Recipie}
                    />
                    <PrivateRoute 
                        exact path="/add"
                        component={AddRecipie}
                    />
                    <PrivateRoute 
                        exact path="/edit/:id"
                        component={EditRecipie}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;