import { addZeroes, asIntegerRatio, binToFloat, floatToNum, frexp, numTo64BitBinary } from './logic';
import * as serviceWorker from './serviceWorker';

serviceWorker.register();

const $bits = document.querySelectorAll('input.bit');

const $decimal = document.querySelector('#decimal') as HTMLInputElement;
const $actual = document.querySelector('#actual') as HTMLInputElement;
// const $error = document.querySelector('#error') as HTMLInputElement;
const $binary = document.querySelector('#binary') as HTMLInputElement;
const $hex = document.querySelector('#hex') as HTMLInputElement;

const $sign = document.querySelector('#sign') as HTMLDivElement;
const $exponent = document.querySelector('#exponent') as HTMLDivElement;
const $mantissa = document.querySelector('#mantissa') as HTMLDivElement;
const $enc_sign = document.querySelector('#enc_sign') as HTMLDivElement;
const $enc_exponent = document.querySelector('#enc_exponent') as HTMLDivElement;
const $enc_mantissa = document.querySelector('#enc_mantissa') as HTMLDivElement;

let decimal = '0.0';
let actual = '0.0';
// let error = '0.0';
let binary = '0'.repeat(64);
let hex = '0x0';

let sign = '+1';
let exponent = '-1023 (denormalized)';
let mantissa = '1.0 (denormalized)';
let enc_sign = '0';
let enc_exponent = '0';
let enc_mantissa = '0';

const flipBit = (bit: Element) => {
  const target = bit as HTMLInputElement;
  if (target.tagName === 'INPUT' && target.parentNode) {
    (target.parentNode as HTMLLabelElement).style.color = target.checked ? '#000000' : '#EEEEEE';
    (target.parentNode as HTMLLabelElement).style.background = target.checked ? '#EEEEEE' : '#222222';
  }
};

const actualFrom = (f: number): string => {
  if (!Number.isFinite(f) || Number.isNaN(f)) {
    return f.toString();
  }

  let [n, d] = asIntegerRatio(f);

  let exp = d.toString(2).length - 1;
  const int = eval('(n * 5n ** BigInt(exp)).toString()'); // parcel hack https://github.com/parcel-bundler/parcel/issues/7310
  exp = -exp;

  const leftdigits = exp + int.length;

  // const mod = (a: number, b: number) => ((a % b) + b) % b;

  let dotplace;
  if (exp <= 0 && leftdigits > -6) {
    dotplace = leftdigits;
  } else {
    dotplace = 1;
  } /* else if (int == '0') {
    dotplace = mod(leftdigits + 1, 3) - 1;
  } else {
    dotplace = mod(leftdigits - 1, 3) + 1;
  } */

  let intpart;
  let fracpart;
  if (dotplace <= 0) {
    intpart = '0';
    fracpart = '.' + '0'.repeat(-dotplace) + int;
  } else if (dotplace >= int.length) {
    intpart = int + '0'.repeat(dotplace - int.length);
    fracpart = '';
  } else {
    intpart = int.slice(0, dotplace);
    fracpart = '.' + int.slice(dotplace);
  }

  const s_exp = leftdigits == dotplace ? '' : 'e' + (leftdigits - dotplace);

  return (Math.sign(f) < 0 ? '-' : '') + intpart + fracpart + s_exp;
};

const updateInputs = (inputs?: string) => {
  const bits =
    inputs ||
    Array.from($bits)
      .map(el => ((el as HTMLInputElement).checked ? 1 : 0))
      .join('');

  const sign_bit = bits.slice(0, 1);
  const exponent_bits = bits.slice(1, 12);
  const mantissa_bits = bits.slice(12, 64);

  const exp = parseInt(exponent_bits, 2);
  const m = parseInt(mantissa_bits, 2);

  sign = sign_bit === '0' ? '+1' : '-1';
  exponent = `${exp - 1023}${exp === 0 ? ' (denormalized)' : ''}`;
  mantissa = `${addZeroes((exp === 0 ? 0 : 1) + m / 2 ** 52)}${exp === 0 ? ' (denormalized)' : ''}`;

  enc_sign = sign_bit;
  enc_exponent = exp.toString();
  enc_mantissa = parseInt(mantissa_bits, 2).toString();

  const num = BigInt('0b' + bits) & 0xffffffffffffffffn;
  const float = binToFloat(bits);

  decimal = addZeroes(float);
  actual = actualFrom(float);
  //   setError();
  binary = num.toString(2).padStart(64, '0');
  hex = '0x' + num.toString(16);

  $bits.forEach((bit, i) => {
    (bit as HTMLInputElement).checked = bits[i] === '1' ? true : false;
    flipBit(bit);
  });
  $decimal.value = decimal;
  $actual.value = actual;
  // $error.value = error;
  $binary.value = binary;
  $hex.value = hex;
  $sign.textContent = sign;
  $exponent.textContent = exponent;
  $mantissa.textContent = mantissa;
  $enc_sign.textContent = enc_sign;
  $enc_exponent.textContent = enc_exponent;
  $enc_mantissa.textContent = enc_mantissa;
};

$bits.forEach(bit => {
  bit.addEventListener('click', () => {
    flipBit(bit);
    updateInputs();
  });
});

$decimal?.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const float = parseFloat((e.target as HTMLInputElement).value) ?? 0.0;
    updateInputs(numTo64BitBinary(floatToNum(float)));
  }
});

document.querySelector('#plus')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = (current_number + 1n) & 0xffffffffffffffffn;
  updateInputs(numTo64BitBinary(new_number));
});
document.querySelector('#minus')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = current_number === 0n ? 0xffffffffffffffffn : current_number - 1n;
  updateInputs(numTo64BitBinary(new_number));
});
document.querySelector('#lshift')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = (current_number << 1n) & 0xffffffffffffffffn;
  updateInputs(numTo64BitBinary(new_number));
});
document.querySelector('#rshift')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = current_number >> 1n;
  updateInputs(numTo64BitBinary(new_number));
});
