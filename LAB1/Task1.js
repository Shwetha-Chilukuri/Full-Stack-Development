console.log(aVar);
var aVar = 10;
console.log(aVar);
let aLet = "Hello";
console.log(aLet);
const aConst = true;
console.log(aConst);
aVar = 20;
console.log(aVar);
aLet = "World";
console.log(aLet);
if (true) {
  var blockVar = 100;
  let blockLet = "Block Scope";
  const blockConst = false;
  console.log(blockVar);
  console.log(blockLet);
  console.log(blockConst);
}
console.log(blockVar);
