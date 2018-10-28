import React from 'react';
import { connect } from 'react-redux';

import RecipieCard from './RecipieCard';
import preloader from './../gifs/preloader.gif';

const Dashboard = (props) => {
    const { recipies, isLoading, user } = props;

    const renderRecipies = (
        <React.Fragment>
            <h1>Welcome, {user.fullName}</h1>
            <h2 className="mb-5">Your Recipies</h2>
            {
                recipies.length > 0 ? (
                    <div className="row mt-2">
                        {
                            recipies.map(recipie => {
                                return <RecipieCard
                                    key={recipie._id}
                                    recipie={recipie}
                                />
                            })
                        }
                    </div>
                ) : (
                <h5>No Recipies Created</h5>
            )
            }
        </React.Fragment>
    );

    const loadingScreen = (
        <div className="preloader">
            <img src={preloader} alt="Loading...." />
        </div>
    );

    return (
        <div className="container">
            {
                isLoading ? loadingScreen : renderRecipies
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        recipies: state.recipies,
        isLoading: state.isLoading,
        user: state.auth
    };
};


export default connect(mapStateToProps)(Dashboard);