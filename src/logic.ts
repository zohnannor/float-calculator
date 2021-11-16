export const addZeroes = (num: number): string => {
  if (num === 0 && 1 / num == -Infinity) {
    return '-0.0';
  }
  return +Number.isInteger(num) ? num.toFixed(1) : num.toString();
  // return Number.isInteger(num) ? num.toFixed(1) : num.toString();
};

export const numTo64BitBinary = (n: bigint): string => {
  return n.toString(2).padStart(64, '0');
};

export const binToFloat = (binary: string): number => {
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

  return sign * (first_mantissa_bit + mantissa / 2 ** 52) * 2 ** ((exponent || 1) - 1023);
};

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

export const asIntegerRatio = (f: number) => {
  f = Math.abs(f);

  let [float_part, exponent] = frexp(f);

  for (let i = 0; i < 300 && float_part != Math.floor(float_part); i++) {
    float_part *= 2.0;
    exponent--;
  }

  let numerator = BigInt(Math.floor(float_part));
  let denumerator = 1n;
  let abs_exponent = BigInt(Math.abs(exponent));

  if (exponent > 0) {
    numerator <<= abs_exponent;
  } else {
    denumerator <<= abs_exponent;
  }

  return [numerator, denumerator];
};

export const floatToNum = (number: number): bigint => {
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
};

export const frexp = (value: number) => {
  if (value === 0) return [value, 0];
  var data = new DataView(new ArrayBuffer(8));
  data.setFloat64(0, value);
  var bits = (data.getUint32(0) >>> 20) & 0x7ff;
  if (bits === 0) {
    // denormal
    data.setFloat64(0, value * Math.pow(2, 64)); // exp + 64
    bits = ((data.getUint32(0) >>> 20) & 0x7ff) - 64;
  }
  var exponent = bits - 1022;
  var mantissa = ldexp(value, -exponent);
  return [mantissa, exponent];
};

export const ldexp = (mantissa: number, exponent: number) => {
  var steps = Math.min(3, Math.ceil(Math.abs(exponent) / 1023));
  var result = mantissa;
  for (var i = 0; i < steps; i++) result *= Math.pow(2, Math.floor((exponent + i) / steps));
  return result;
};
