import PropTypes from 'prop-types';
import React from 'react';
import './Cell.css';

function Cell({ cls, children }) {
    const classes = `cell ${cls}`;
    return <div className={classes}>{children}</div>;
}

Cell.propTypes = {
    cls: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

export default Cell;
