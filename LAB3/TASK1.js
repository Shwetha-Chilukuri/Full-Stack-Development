function callback(name){
     return `Hello, ${name}`
}
function greet(name,callback){
     return callback(name)
}
console.log(greet('Hansika',callback))