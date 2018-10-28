import React from 'react';
import { connect } from 'react-redux';

import RecipieForm from './RecipieForm';
import { startEditRecipie } from './../actions/recipiesAction';

const EditRecipie = (props) => {
    const { recipie, startEditRecipie, history } = props;
    return (
        <React.Fragment>
            {
                recipie ? (
                    <RecipieForm
                        onRecipieFormSubmit={(updates) => {
                            startEditRecipie(recipie._id, updates);
                            history.replace('/dashboard');
                        }}
                        recipie={recipie}
                    />
                ) : (
                    <h3>No Recipie Found</h3>
                )
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state, props) => {
    return {
        recipie: state.recipies.find(recipie => recipie._id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startEditRecipie: (_id, updates) => dispatch(startEditRecipie(_id, updates))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipie);