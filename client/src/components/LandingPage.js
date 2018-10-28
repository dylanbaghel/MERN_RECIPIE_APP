import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
        <div className="container">
            <h1>Welcome To Recipie App</h1>
            <p>Created By Abhishek Baghel</p>
            <div>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/signup" className="btn btn-danger">Signup</Link>
            </div>
        </div>
    );
};

export default LandingPage;