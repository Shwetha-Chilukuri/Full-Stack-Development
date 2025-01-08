const sym1 = Symbol('uniq1');
const sym2 = Symbol('uniq2');
const myobj = {
  [sym1]: '1st unique value',
  [sym2]: '2nd unique value'
};
console.log(myobj[sym1]);  
console.log(myobj[sym2]); 
const sym1dup = Symbol('uniq1');
console.log(sym1 === sym1dup); 
console.log(sym1 === sym2); 
