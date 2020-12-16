import PropTypes from 'prop-types';
import React from 'react';
import Cell from '../Cell/Cell';

function Row({ cols, colsClasses }) {
    return cols.map((inner, i) => {
        const classes = colsClasses[i % 4];
        return (
            <Cell key={i} cls={classes}>
                {inner}
            </Cell>
        );
    });
}

Row.propTypes = {
    cols: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ])
    ).isRequired,
    colsClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Row;
