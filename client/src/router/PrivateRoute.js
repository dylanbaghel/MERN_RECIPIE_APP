import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            {...rest}
            render={(props) => {
                return (
                    isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
                );
            }}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth._id
    };
};

export default connect(mapStateToProps)(PrivateRoute);