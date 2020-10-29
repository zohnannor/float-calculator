/* global BigInt */
import React, { useState } from 'react';
import './App.css';
import Table from './components/Table/Table';
import { Bit } from './components/Bit/Bit';
import { binToFloat, floatToNum, numTo64BitBinary, addZeroes } from './logic';
import { flipBit } from './components/Bit/Bit';

export default function App() {
    const [decimal, setDecimal] = useState('0.0');
    const [actual, setActual] = useState('0.0');
    const [error, setError] = useState('0.0');
    const [binary, setBinary] = useState('0'.repeat(64));
    const [hex, setHex] = useState('0x0');

    const [sign, setSign] = useState('+1');
    const [exponent, setExponent] = useState('-1023 (denormalized)');
    const [mantissa, setMantissa] = useState('1.0 (denormalized)');

    const [enc_sign, setEnc_sign] = useState('0');
    const [enc_exponent, setEnc_exponent] = useState('0');
    const [enc_mantissa, setEnc_mantissa] = useState('0');

    function updateInputs(inputs) {
        const bits =
            inputs ||
            Array.from(document.getElementsByClassName('bit'))
                .map((el) => (el.checked ? 1 : 0))
                .join('');

        const sign_bit = bits.slice(0, 1);
        const exponent_bits = bits.slice(1, 12);
        const mantissa_bits = bits.slice(12, 64);

        const exp = parseInt(exponent_bits, 2);
        const m = parseInt(mantissa_bits, 2);

        setSign(sign_bit === '0' ? '+1' : '-1');
        setExponent(`${exp - 1023}${exp === 0 ? ' (denormalized)' : ''}`);
        setMantissa(
            `${addZeroes((exp === 0 ? 0 : 1) + m / 2 ** 52)}${exp === 0 ? ' (denormalized)' : ''}`
        );

        setEnc_sign(sign_bit);
        setEnc_exponent(exp.toString());
        setEnc_mantissa(parseInt(mantissa_bits, 2).toString());

        const num = BigInt('0b' + bits) & 0xffffffffffffffffn;
        const float = binToFloat(bits);

        setDecimal(addZeroes(float));
        setActual();
        setError();
        setBinary(num.toString(2).padStart(64, '0'));
        setHex('0x' + num.toString(16));

        document.querySelectorAll('input.bit').forEach((bit, i) => {
            bit.checked = bits[i] === '1' ? true : false;
            flipBit(bit);
        });
    }

    const float_table = [
        ['', 'Sign', 'Exponent', 'Mantissa'],
        [
            'Value:',
            sign,
            <span>
                2<sup id='exponent'>{exponent}</sup>
            </span>,
            mantissa,
        ],
        ['Encoded as:', enc_sign, enc_exponent, enc_mantissa],
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
    const float_table_classes = ['', 'center sign', 'center exponent', 'center mantissa'];

    const inputs_table = [
        [
            'Decimal representation:',
            <input
                className='input'
                value={decimal}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        const float = parseFloat(e.target.value) || 0.0;
                        updateInputs(numTo64BitBinary(floatToNum(float)));
                    }
                }}
                onChange={(e) => {
                    setDecimal(e.target.value);
                }}
            />,
        ],
        [
            'Value actually stored in float:',
            <input className='input' disabled defaultValue={actual} />,
        ],
        ['Error due to conversion:', <input className='input' disabled defaultValue={error} />],
        [
            'Binary Representation:',
            <input
                className='input'
                value={binary}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        updateInputs(e.target.value.padStart(64, '0'));
                    }
                }}
                onChange={(e) => {
                    setBinary(e.target.value);
                }}
            />,
        ],
        [
            'Hexadecimal Representation:',
            <input
                className='input'
                value={hex}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        const number = BigInt(e.target.value) || 0;
                        updateInputs(numTo64BitBinary(number));
                    }
                }}
                onChange={(e) => {
                    setHex(e.target.value);
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
                    <input
                        type='button'
                        value='+1'
                        onClick={(e) => {
                            const current_number = BigInt(hex);
                            const new_number = (current_number + 1n) & 0xffffffffffffffffn;
                            updateInputs(numTo64BitBinary(new_number));
                        }}
                    />
                    <input
                        type='button'
                        value='-1'
                        onClick={(e) => {
                            const current_number = BigInt(hex);
                            const new_number =
                                current_number === 0n ? 0xffffffffffffffffn : current_number - 1n;
                            updateInputs(numTo64BitBinary(new_number));
                        }}
                    />
                    <input
                        type='button'
                        value='<<'
                        onClick={(e) => {
                            const current_number = BigInt(hex);
                            const new_number = (current_number << 1n) & 0xffffffffffffffffn;
                            updateInputs(numTo64BitBinary(new_number));
                        }}
                    />
                    <input
                        type='button'
                        value='>>'
                        onClick={(e) => {
                            const current_number = BigInt(hex);
                            const new_number = current_number >> 1n;
                            updateInputs(numTo64BitBinary(new_number));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
