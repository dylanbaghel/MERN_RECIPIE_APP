import React from 'react';

class IngredientList extends React.Component {
    renderIngredientList(props) {
        return props.ingredients.map(ingredient => {
            return (
                <li key={ingredient._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            ref="guts"
                            className="mr-3"
                            onChange={() => {
                                props.changeItemAvail(ingredient._id);
                            }}
                            checked={ingredient.hasItem}
                        />
                        {ingredient.item}
                    </div>
                    <button
                        onClick={() => {
                            props.removeIngredient(ingredient._id);
                        }}
                        className="btn btn-danger"
                    >
                        <i className="fas fa-trash text-light" style={{ cursor: "pointer" }}></i>
                    </button>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="list-group mb-3">
                    {
                        this.props.ingredients.length > 0 ? (
                            this.renderIngredientList(this.props)
                        ) : (
                                <p>No Ingredient Added</p>
                            )
                    }
                </ul>
            </div>
        );
    }
};

export default IngredientList;