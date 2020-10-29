import React from 'react';
import PropTypes from 'prop-types';
import './Bit.css';

function flipBit(bit) {
    const target = bit.target || bit;
    if (target.tagName === 'INPUT') {
        target.parentNode.style.color = target.checked ? '#000000' : '#EEEEEE';
        target.parentNode.style.background = target.checked ? '#EEEEEE' : '#222222';
    }
}

function Bit({ onToggle }) {
    return (
        <label className='checkbox' onClick={flipBit}>
            <input className='bit' type='checkbox' onChange={onToggle} />
            <span></span>
        </label>
    );
}

Bit.propTypes = {
    onToggle: PropTypes.func.isRequired,
};

export { flipBit, Bit };
