import React from 'react';
import { Link } from 'react-router-dom';

const RecipieCard = ({ recipie }) => {
    return (
        <div className="col-md-4 mb-2">
            <div className="card card-body">
                <h5 className="card-title">{recipie.name}</h5>
                <p className="card-text">{recipie.instructions.substring(0, 100) + '...'}</p>
                <Link to={`/recipie/${recipie._id}`} className="btn btn-dark">Read More</Link>
            </div>
        </div>
    );
};

export default RecipieCard;