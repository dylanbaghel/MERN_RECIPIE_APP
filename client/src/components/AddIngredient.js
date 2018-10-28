import React from 'react';
import classnames from 'classnames';
import ObjectID from 'bson-objectid';

class AddIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddIngredient(e) {
        e.preventDefault();
        const item = this.refs.item.value.trim();
        if (!item) {
            this.setState(() => ({
                error: 'Please Enter Ingredient'
            }));
            return;
        } else if (item.length > 40) {
            this.setState(() => ({
                error: 'Min. 40 Characters Are Allowed'
            }));
            return;
        }

        this.setState(() => ({
            error: undefined
        }));
        this.refs.item.value = '';
        this.props.onSubmit({
            _id: ObjectID.generate(),
            item,
            hasItem: false
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-between">
                <div className="form-group w-75 mr-2">
                    <input
                        type="text"
                        placeholder="Enter Ingredient..."
                        ref="item"
                        className={classnames('form-control', {
                            'is-invalid': this.state.error
                        })}
                    />
                    <div className="invalid-feedback">{this.state.error}</div>
                </div>
                <div>
                    <button
                        className="btn btn-danger"
                        onClick={this.handleAddIngredient}
                    >Add Ingredient</button>
                </div>
            </div>
        );
    }
}

export default AddIngredient;