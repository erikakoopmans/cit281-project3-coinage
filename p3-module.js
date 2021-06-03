function validDenomination (coin) {
    let values = [1,5,10,25,50,100];
    for (i=0; i < values.length; i++) {
        if (values.indexOf(coin) !== -1) {
            return true;
        } else {
            return false;
        }
    }
}

function valueFromCoinObject (obj) {
    const {denom = 0, count = 0} = obj;
    return denom*count;
}

const valueFromArray = (arr) => {
    return arr.reduce((total, currentvalue) => {
        return total + valueFromCoinObject(currentvalue)},0);
}

function coinCount (...coinage) {
    return valueFromArray(coinage);
}

module.exports = {coinCount};

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));  // Extra credit