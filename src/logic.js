/* global BigInt */

function addZeroes(num) {
    return Number.isInteger(num) ? num.toFixed(1) : num;
}

function numTo64BitBinary(n) {
    return n.toString(2).padStart(64, '0');
}

function binToFloat(binary) {
    const sign_bit = binary.slice(0, 1);
    const exponent_bits = binary.slice(1, 12);
    const mantissa_bits = binary.slice(12, 64);

    const sign = sign_bit === '0' ? 1 : -1;
    const exponent = parseInt(exponent_bits, 2);
    const mantissa = parseInt(mantissa_bits, 2);

    const first_mantissa_bit = exponent === 0 ? 0 : 1;

    // Check for NaN
    if (exponent === 0b11111111111 && mantissa !== 0) {
        return NaN;
    }

    const float = sign * (first_mantissa_bit + mantissa / 2 ** 52) * 2 ** ((exponent || 1) - 1023);

    return float;
}

/* function floatToNum(float) {
    if (isNaN(float)) return 0x7ff0000000000001n;

    const sign = float < 0 ? 1n : 0n;

    if (float == 0.0) return Number(sign) * float;
    float = Math.abs(float);

    const exponent = Math.floor(Math.log(float) / Math.LN2);
    const mantissa = (float / 2 ** exponent) * 2 ** 52 - 2 ** 52;
    //               float * 2 ** (52 - exponent) - 2 ** 52;
    console.log(`sign=${sign}\texponent=${exponent}\tmantissa=${mantissa}
sign=${sign << 63n}\texponent=${(BigInt(exponent) + 1023n) << 52n}\tmantissa=${
        mantissa < 0 ? (1n << 52n) + BigInt(mantissa) : BigInt(mantissa)
    }`);
    return (
        (sign << 63n) |
        ((BigInt(exponent) + 1023n) << 52n) |
        (mantissa < 0 ? (1n << 52n) + BigInt(mantissa) : BigInt(mantissa))
    );
} */

function floatToNum(number) {
    const f = new Float64Array(1);
    f[0] = number;
    const view = new Uint8Array(f.buffer);
    let i,
        result = '';
    for (i = view.length - 1; i >= 0; i--) {
        let bits = view[i].toString(2);
        if (bits.length < 8) {
            bits = new Array(8 - bits.length).fill('0').join('') + bits;
        }
        result += bits;
    }
    return BigInt('0b' + result);
}

module.exports = { addZeroes, numTo64BitBinary, binToFloat, floatToNum };
