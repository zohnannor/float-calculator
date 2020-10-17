import React from 'react';

export const multiplyArray = (arr, length) =>
    Array.from({ length }, () => arr).flat();

export class Bit extends React.Component {
    render() {
        return (
            <label className='checkbox' onClick={this.flipBit}>
                <input className='bit' type='checkbox' />
                <span></span>
            </label>
        );
    }

    flipBit(bit) {
        if (bit.target.tagName === 'INPUT') {
            bit.target.parentNode.style.color = bit.target.checked
                ? '#222222'
                : '#EEEEEE';
            bit.target.parentNode.style.background = bit.target.checked
                ? '#EEEEEE'
                : '#222222';
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
            this.props.colWidth ||
            `repeat(${this.props.table[0].length}, max-content)`;

        return (
            <div className='table' style={{ gridTemplateColumns: col_width }}>
                {this.props.table.map((cols, i) => {
                    return (
                        <Row
                            key={i}
                            cols={cols}
                            colsClasses={this.props.colsClasses}
                        ></Row>
                    );
                })}
            </div>
        );
    }
}

// function getByClass(className) {
//     return document.getElementsByClassName(className);
// }

// function getById(className) {
//     return document.getElementById(className);
// }

// function binRepr(binStr) {
//     getById('binary').value = binStr;
// }

// function hexRepr(binStr) {
//     getById('hex').value = '0x' + BigInt('0b' + binStr).toString(16);
// }

// function recalculate() {
//     const sign = getById('sign').checked ? -1 : 1;
//     getById('sign_value').innerHTML = sign > 0 ? '+' + sign : sign;
//     getById('sign_enc').innerHTML = getById('sign').checked + 0;

//     const exponent_bits = [];
//     let array = getByClass('exponent');

//     for (let i = 0; i < array.length; i++) {
//         exponent_bits.push((array[i].checked + 0).toString());
//     }
//     const exponent = parseInt(exponent_bits.join(''), 2) - 1023;
//     const enc_exponent = parseInt(exponent_bits.join(''), 2);
//     getById('exponent_bits').innerHTML = enc_exponent;
//     getById('exponent').innerHTML = exponent;

//     const mantissa_bits = [];
//     array = getByClass('mantissa');

//     for (let i = 0; i < array.length; i++) {
//         mantissa_bits.push((array[i].checked + 0).toString());
//     }
//     const mantissa = 1 + parseInt(mantissa_bits.join(''), 2) / Math.pow(2, 52);
//     const enc_mantissa = parseInt(mantissa_bits.join(''), 2);
//     getById('mantissa_bits').innerHTML = enc_mantissa;
//     getById('mantissa').innerHTML = parseFloat(mantissa);

//     const binStr =
//         (sign < 0 ? '1' : '0') +
//         exponent_bits.join('') +
//         mantissa_bits.join('');
//     binRepr(binStr);
//     hexRepr(binStr);

//     if (enc_exponent == 0) {
//         getById('mantissa').innerHTML += ' (denormalized)';
//         getById('exponent').innerHTML += ' (denormalized)';
//     }
//     const val = enc_exponent + enc_mantissa;
//     if (val == 0) {
//         getById('decimal').value = (getById('sign').checked ? '-' : '') + '0.0';
//     } else if (val == 0x100000000007fe) {
//         getById('decimal').value = NaN;
//     } else {
//         getById('decimal').value = sign * Math.pow(2, exponent) * mantissa;
//     }
// }

// getById('binary').onchange = function () {
//     getById('hex').value =
//         '0x' + BigInt('0b' + getById('binary').value).toString(16);
//     const binary = getById('binary').value;
//     document.querySelectorAll('input.bit').forEach((box, i) => {
//         box.checked = binary[i] == '1' ? true : false;
//     });
//     recalculate();
// };

// getById('hex').onchange = function () {
//     const binary = BigInt(getById('hex').value).toString(2).padStart(64, '0');
//     getById('binary').value = binary;
//     document.querySelectorAll('input.bit').forEach((box, i) => {
//         box.checked = binary[i] == '1' ? true : false;
//     });
//     recalculate();
// };

// getById('decimal').onchange = function () {
//     const decimal = getById('decimal').value;
//     const bin = floatToBin(decimal);
//     binRepr(bin);
//     document.querySelectorAll('input.bit').forEach((box, i) => {
//         box.checked = bin[i] == '1' ? true : false;
//     });
//     recalculate();
// };

// document.querySelectorAll('.bit').forEach((elem) => {
//     elem.addEventListener('click', recalculate);
// });

// document.querySelectorAll('.mod').forEach((elem) => {
//     elem.onclick = function () {
//         let number = BigInt('0b' + getById('binary').value);
//         switch (this.id) {
//             case 'decr':
//                 number === 0n
//                     ? (number = 18446744073709551615n)
//                     : (number -= 1n);
//                 break;
//             case 'incr':
//                 number === 18446744073709551615n
//                     ? (number = 0n)
//                     : (number += 1n);
//                 break;
//             case 'rshift':
//                 number >>= 1n;
//                 break;
//             case 'lshift':
//                 number <<= 1n;
//                 break;
//         }
//         getById('binary').value = number.toString(2).padStart(64, '0');
//         getById('hex').value =
//             '0x' + BigInt('0b' + getById('binary').value).toString(16);
//         const binary = getById('binary').value;
//         document.querySelectorAll('input.bit').forEach((box, i) => {
//             box.checked = binary[i] == '1' ? true : false;
//         });
//         recalculate();
//     };
// });

// recalculate();

// function floatToBin(number) {
//     let f = new Float64Array(1);
//     f[0] = number;
//     let view = new Uint8Array(f.buffer);
//     let i,
//         result = '';
//     for (i = view.length - 1; i >= 0; i--) {
//         let bits = view[i].toString(2);
//         if (bits.length < 8) {
//             bits = new Array(8 - bits.length).fill('0').join('') + bits;
//         }
//         result += bits;
//     }
//     return result;
// }
