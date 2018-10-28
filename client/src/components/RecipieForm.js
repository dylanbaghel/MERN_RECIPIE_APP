import React from 'react';
import classnames from 'classnames';
import AddIngredient from './AddIngredient';

import IngredientList from './IngredientList';

class RecipieForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInstructionChange = this.handleInstructionChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.changeItemAvail = this.changeItemAvail.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            name: props.recipie ? props.recipie.name : '',
            instructions: props.recipie ? props.recipie.instructions : '',
            ingredients: props.recipie ? props.recipie.ingredients : [],
            error: {}
        };
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.setState(() => ({
            name
        }));
    }

    handleInstructionChange(e) {
        const instructions = e.target.value;
        this.setState(() => ({
            instructions
        }));
    }

    addIngredient(ingredient) {
        if (typeof ingredient === 'object') {
            this.setState((prevState) => ({
                ingredients: [
                    ...prevState.ingredients,
                    ingredient
                ]
            }));
        }
    }

    removeIngredient(_id) {
        if (_id) {
            this.setState((prevState) => ({
                ingredients: prevState.ingredients.filter(ingredient => ingredient._id !== _id)
            }));
        }
    }

    changeItemAvail(_id) {
        if (_id) {
            this.setState((prevState) => ({
                ingredients: prevState.ingredients.map(ingredient => {
                    if (ingredient._id !== _id) return ingredient;

                    return {
                        ...ingredient,
                        hasItem: !ingredient.hasItem
                    };
                })
            }));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (!this.state.name.trim()) {
            this.setState(() => ({
                error: { name: 'Please Enter Recipie App' }
            }));
            return;
        } else if (!this.state.instructions.trim()) {
            this.setState(() => ({
                error: { instructions: 'Please Enter Instructions' }
            }));
            return;
        }

        this.setState(() => ({
            error: {}
        }));

        this.props.onRecipieFormSubmit({
            name: this.state.name,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                {this.props.recipie ? "Edit Recipie" : "Add Recipie"}
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Name of The Recipie"
                                            value={this.state.name}
                                            onChange={this.handleNameChange}
                                            className={classnames('form-control', {
                                                'is-invalid': this.state.error.name
                                            })}
                                        />
                                        <div className="invalid-feedback">{this.state.error.name}</div>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            className={classnames('form-control', {
                                                'is-invalid': this.state.error.instructions
                                            })}
                                            value={this.state.instructions}
                                            onChange={this.handleInstructionChange}
                                            placeholder="Instructions Here..."
                                        ></textarea>
                                        <div className="invalid-feedback">{this.state.error.instructions}</div>
                                    </div>
                                    <div>
                                        <h3>Ingredients</h3>
                                        <IngredientList
                                            ingredients={this.state.ingredients}
                                            changeItemAvail={this.changeItemAvail}
                                            removeIngredient={this.removeIngredient}
                                        />
                                        <AddIngredient
                                            onSubmit={(ingredient) => {
                                                this.addIngredient(ingredient);
                                            }}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                    >
                                        {this.props.recipie ? "Edit Recipie" : "Add Recipie"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipieForm;