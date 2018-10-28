import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRemoveRecipie } from './../actions/recipiesAction';

const Recipie = (props) => {
    const { recipie, startRemoveRecipie, history } = props;
    return (
        <div className="container">
            {
                recipie ? (
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-5">{recipie.name}</h5>
                                    <h3 className="mb-2">Instructions</h3>
                                    <p className="card-text">{recipie.instructions}</p>
                                    {
                                        recipie.ingredients.length > 0 ? (
                                            <div>
                                                <h6>Ingredients</h6>
                                                <ul className="list-group mb-5">
                                                    {recipie.ingredients.map(ingredient => <li
                                                        className="list-group-item d-flex justify-content-between"
                                                        key={ingredient._id}>
                                                        <div>
                                                            {ingredient.item}
                                                        </div>
                                                        <div>
                                                            <i className={ingredient.hasItem ? "fas fa-check" : "fas fa-times"}></i>
                                                        </div>
                                                    </li>)}
                                                </ul>
                                            </div>
                                        ) : (
                                                <p>No ingredients Present</p>
                                            )
                                    }
                                    <div>
                                        <Link
                                            className="btn btn-success mr-1"
                                            to={`/edit/${recipie._id}`}
                                        >Edit
                                        </Link>
                                        <button
                                            className="btn btn-info ml-1"
                                            onClick={() => {
                                                startRemoveRecipie(recipie._id);
                                                history.replace('/dashboard');
                                            }}
                                        >Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<h3>No Recipie Found</h3>)
            }
        </div>
    );
}

const mapStateToProps = (state, props) => {
    return {
        recipie: state.recipies.find(recipie => recipie._id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startRemoveRecipie: (_id) => dispatch(startRemoveRecipie(_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipie);