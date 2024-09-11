/**
 * Returns the minimum value between two numeric input values
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function minimum(a,b = Infinity) {
    if (isNaN(a) || isNaN(b)) {
        throw "Minimum input cannot be NaN";
    }

    if (a <= b) {
        return a;
    } else {
        return b;
    }
}

console.log(minimum(-5,10));
console.log(minimum(500,4.6));
console.log(minimum(1,1));
console.log(minimum(45));
console.log(minimum(3.141,-Infinity));
console.log(minimum('apple',Infinity));
