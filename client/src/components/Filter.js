import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter } from './../actions/filterAction';

const Filter = (props) => {

    const { setTextFilter } = props;

    return (
        <React.Fragment>
            <input 
                className="form-control"
                placeholder="Search...."
                onChange={(e) => {
                    setTextFilter(e.target.value);
                }}
            />
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text))
    };
};

export default connect(undefined, mapDispatchToProps)(Filter);