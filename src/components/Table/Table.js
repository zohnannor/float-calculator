import PropTypes from 'prop-types';
import React from 'react';
import Row from '../Row/Row';
import './Table.css';

function Table({ table, colWidth, colsClasses }) {
    const col_width = colWidth || `repeat(${table[0].length}, max-content)`;

    return (
        <div className='table' style={{ gridTemplateColumns: col_width }}>
            {table.map((cols, i) => {
                return <Row key={i} cols={cols} colsClasses={colsClasses}></Row>;
            })}
        </div>
    );
}

Table.propTypes = {
    table: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element),
            ])
        ).isRequired
    ),
    colWidth: PropTypes.string,
    colsClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
