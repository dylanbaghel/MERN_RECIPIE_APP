import React from 'react';
import { connect } from 'react-redux';

import { startAddRecipie } from './../actions/recipiesAction';

import RecipieForm from './RecipieForm';


const AddRecipie = (props) => {
    return (
        <div>
            <RecipieForm 
                onRecipieFormSubmit={(recipie) => {
                    console.log(recipie);
                    props.startAddRecipie(recipie);
                    props.history.replace('/dashboard');
                }}
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddRecipie: (recipie) => dispatch(startAddRecipie(recipie))
    };
};

export default connect(undefined, mapDispatchToProps)(AddRecipie);