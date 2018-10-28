import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from './../actions/authAction';
import preloader from './../gifs/brand.svg';

const Header = ({
    isAuthenticated,
    startLogout,
    user
}) => {

    const privateLinks = (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/add">Add Recipie</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Recipies</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={() => {
                    startLogout();
                }}>Logout</Link>
            </li>
        </React.Fragment>
    );

    const publicLinks = (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
            </li>
        </React.Fragment>
    );

    return (
        <div className="navbar navbar-expand navbar-dark bg-dark mb-5">
            <div className="container">
                <img src={preloader} className="img-fluid brand-image" alt="brand-image"></img>
                <Link to="/"><h2 className="navbar-brand">Recipie App</h2></Link>
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated ? privateLinks : publicLinks}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth._id,
        user: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);