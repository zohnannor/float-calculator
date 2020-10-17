import React from 'react';
import './App.css';
import { Table, multiplyArray, Bit } from './Table.js';

export default function App() {
    const float_table = [
        ['', 'Sign', 'Exponent', 'Mantissa'],
        [
            'Value:',
            '+1',
            <span>
                2<sup id='exponent'>-1023 (denormalized)</sup>
            </span>,
            '1 (denormalized)',
        ],
        ['Encoded as:', '0', '0', '0'],
        [
            'Binary:',
            <Bit></Bit>,
            multiplyArray([<Bit></Bit>], 11),
            <div className='wrap-2-col'>
                {multiplyArray([<Bit></Bit>], 52)}
            </div>,
        ],
    ];
    const float_table_classes = [
        '',
        'center blue',
        'center green',
        'center red',
    ];

    const inputs_table = [
        ['Decimal representation:', <input type='text' id='decimal' />],
        [
            'Value actually stored in float:',
            <input type='text' readOnly='readonly' />,
        ],
        ['Error due to conversion:', <input type='text' readOnly='readonly' />],
        ['Binary Representation:', <input type='text' id='binary' />],
        ['Hexadecimal Representation:', <input type='text' id='hex' />],
    ];

    const input_table_classes = ['label', 'label'];

    return (
        <div className='container'>
            <Table
                table={float_table}
                colsClasses={float_table_classes}
                colWidth={'1fr 0fr 0fr 3fr'}
            ></Table>
            <div className='inputs'>
                <Table
                    table={inputs_table}
                    colsClasses={input_table_classes}
                ></Table>
                <div className='modifiers'>
                    <input type='button' id='incr' value='+1' />
                    <input type='button' id='decr' value='-1' />
                    <input type='button' id='lshift' value='<<' />
                    <input type='button' id='rshift' value='>>' />
                </div>
            </div>
        </div>
    );
}
