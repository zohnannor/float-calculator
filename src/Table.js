import React from 'react';

export class Bit extends React.Component {
    render() {
        return (
            <label className='checkbox' onClick={this.flipBit}>
                <input className='bit' type='checkbox' onChange={this.props.onToggle} />
                <span></span>
            </label>
        );
    }

    flipBit(bit) {
        if (bit.target.tagName === 'INPUT') {
            bit.target.parentNode.style.color = bit.target.checked ? '#000000' : '#EEEEEE';
            bit.target.parentNode.style.background = bit.target.checked ? '#EEEEEE' : '#222222';
        }
    }
}

class Cell extends React.Component {
    render() {
        const cls = `cell ${this.props.cls}`;
        return <div className={cls}>{this.props.children}</div>;
    }
}

class Row extends React.Component {
    render() {
        return this.props.cols.map((inner, i) => {
            const classes = this.props.colsClasses[i % 4];
            return (
                <Cell key={i} cls={classes}>
                    {inner}
                </Cell>
            );
        });
    }
}

export class Table extends React.Component {
    render() {
        const col_width =
            this.props.colWidth || `repeat(${this.props.table[0].length}, max-content)`;

        return (
            <div className='table' style={{ gridTemplateColumns: col_width }}>
                {this.props.table.map((cols, i) => {
                    return <Row key={i} cols={cols} colsClasses={this.props.colsClasses}></Row>;
                })}
            </div>
        );
    }
}
