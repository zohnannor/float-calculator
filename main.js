
function getByClass(className) {
    return document.getElementsByClassName(className)
}

function getById(className) {
    return document.getElementById(className)
}

//±знак · (1+мантисса/ 2^52) × 2^(порядок − 1023)


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
    getById('exponent_bits').innerHTML = parseInt(exponent_bits.join(''), 2);
    getById('exponent').innerHTML = exponent;


    let mantissa_bits = [];
    array = getByClass('mantissa');
    
    for (let i = 0; i < array.length; i++) {
        mantissa_bits.push((array[i].checked+0).toString());
    }
    let mantissa = 1 + parseInt(mantissa_bits.join(''), 2) / Math.pow(2, 52);
    getById('mantissa_bits').innerHTML = parseInt(mantissa_bits.join(''), 2);
    getById('mantissa').innerHTML = parseFloat(mantissa);

    getById('decimal').value = sign * Math.pow(2, exponent) * mantissa;
}

document.querySelectorAll('.bit').forEach(function(elem) {
    elem.addEventListener('click', recalculate)
})

recalculate()
