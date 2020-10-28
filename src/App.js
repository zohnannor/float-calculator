/* global BigInt */
import React, { useState } from 'react';
import './App.css';
import { Table, Bit } from './Table';
import { binToFloat, floatToNum, numTo64BitBinary } from './logic';

export default function App() {
    const [decimal, setDecimal] = useState('0.0');
    const [actual, setActual] = useState('0.0');
    const [error, setError] = useState('0.0');
    const [binary, setBinary] = useState('0'.repeat(64));
    const [hex, setHex] = useState('0x0');

    function updateInputs(inputs) {
        const bits =
            inputs ||
            Array.from(document.getElementsByClassName('bit'))
                .map((el) => (el.checked ? 1 : 0))
                .join('');

        const num = BigInt('0b' + bits);
        const float = binToFloat(bits);
        console.log(bits, float, num);

        setDecimal(float);
        setActual();
        setError();
        setBinary(bits.padStart(64, '0'));
        setHex('0x' + num.toString(16));
    }

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
            <Bit onToggle={() => updateInputs()}></Bit>,
            Array(11)
                .fill()
                .map((_, i) => <Bit key={i} onToggle={() => updateInputs()}></Bit>),
            <div className='wrap-2-col'>
                {Array(52)
                    .fill()
                    .map((_, i) => (
                        <Bit key={i + 11} onToggle={() => updateInputs()}></Bit>
                    ))}
            </div>,
        ],
    ];
    const float_table_classes = ['', 'center blue', 'center green', 'center red'];

    const inputs_table = [
        [
            'Decimal representation:',
            <input
                className='input'
                value={decimal}
                onChange={(e) => {
                    const float = parseFloat(e.target.value) || 0.0;
                    updateInputs(numTo64BitBinary(floatToNum(float)));
                }}
            />,
        ],
        [
            'Value actually stored in float:',
            <input className='input' readOnly='readonly' defaultValue={actual} />,
        ],
        [
            'Error due to conversion:',
            <input className='input' readOnly='readonly' defaultValue={error} />,
        ],
        [
            'Binary Representation:',
            <input
                className='input'
                value={binary}
                onChange={(e) => {
                    updateInputs(e.target.value);
                }}
            />,
        ],
        [
            'Hexadecimal Representation:',
            <input
                className='input'
                value={hex}
                onChange={(e) => {
                    const number = parseInt(e.target.value) || 0;
                    updateInputs(numTo64BitBinary(number));
                }}
            />,
        ],
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
                <Table table={inputs_table} colsClasses={input_table_classes}></Table>
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
