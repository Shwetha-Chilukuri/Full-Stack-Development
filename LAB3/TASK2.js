function mul(a) {
    return a * 2;
}
function sub(a, callback) {
    return callback(a) - 3;
}
function add(a, callback) {
    return callback(a) + 10;
}

const a = 20;
const res = add(a, () => {
    return sub(a, () => {
        return mul(a);
    });
});
console.log(res);
