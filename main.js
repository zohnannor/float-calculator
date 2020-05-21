
function getByClass(className) {
    return document.getElementsByClassName(className)
}

function getById(className) {
    return document.getElementById(className)
}

//±знак · (1+мантисса/ 2^52) × 2^(порядок − 1023)

function binRepr(binStr) {
    getById('binary').value = binStr;
}

function hexRepr(binStr) {
    getById('hex').value = '0x'+(parseInt(binStr, 2)).toString(16).padStart(16, "0");;
}


function recalculate() {
    let sign = getById('sign').checked ? -1 : 1;
    getById('sign_value').innerHTML = (sign > 0 ? '+'+sign : sign);
    getById('sign_enc').innerHTML = getById('sign').checked+0;

    let exponent_bits = [];
    let array = getByClass('exponent');

    for (let i = 0; i < array.length; i++) {
        exponent_bits.push((array[i].checked+0).toString());
    }
    let exponent = parseInt(exponent_bits.join(''), 2) - 1023;
    let enc_exponent = parseInt(exponent_bits.join(''), 2);
    getById('exponent_bits').innerHTML = enc_exponent;
    getById('exponent').innerHTML = exponent;


    let mantissa_bits = [];
    array = getByClass('mantissa');
    
    for (let i = 0; i < array.length; i++) {
        mantissa_bits.push((array[i].checked+0).toString());
    }
    let mantissa = 1 + parseInt(mantissa_bits.join(''), 2) / Math.pow(2, 52);
    let enc_mantissa = parseInt(mantissa_bits.join(''), 2);
    getById('mantissa_bits').innerHTML = enc_mantissa;
    getById('mantissa').innerHTML = parseFloat(mantissa);

    let binStr = (sign<0 ? '1' : '0')+exponent_bits.join('')+mantissa_bits.join('');
    binRepr(binStr);
    hexRepr(binStr);

    if (enc_exponent == 0) {
        getById('mantissa').innerHTML += ' (denormalized)';
        getById('exponent').innerHTML += ' (denormalized)';
    }
    let val = (enc_exponent + enc_mantissa);
    if (val == 0) {
        getById('decimal').value = (getById('sign').checked ? '-' : '')+'0.0';
    } else if (val == 4503599627372542 ) {
        getById('decimal').value = NaN;
    // } else if (val == 1 ) {
    //     getById('decimal').value = '-'+0+'.0';
    } else {
        getById('decimal').value = sign * Math.pow(2, exponent) * mantissa;
    }
}

document.querySelectorAll('.bit').forEach(function(elem) {
    elem.addEventListener('click', recalculate)
})

recalculate()
