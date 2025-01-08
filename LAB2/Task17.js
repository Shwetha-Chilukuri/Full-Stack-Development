const globalSym1 = Symbol.for('sharedKey');
const globalSym2 = Symbol.for('sharedKey');
console.log(globalSym1 === globalSym2); 
const sym1 = Symbol('unique');
const sym2 = Symbol('unique');
console.log(sym1 === sym2);
