// In JavaScript, both prototype and __proto__ are related to the prototype chain, but they are used in different contexts.
// prototype: It is a property of a constructor function (or class) that is used to add methods and properties to the objects created by that constructor. When you create a new instance of a constructor, the instance inherits from the constructor's prototype.
// __proto__: It is an internal property of every object in JavaScript. It points to the prototype object of the constructor that created the object. You can use __proto__ to access or modify the prototype of an object at runtime.
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}.`);
};
const person1 = new Person("John", 30);
console.log(person1.__proto__);
console.log(person1.__proto__ === Person.prototype);
person1.greet();
Person.prototype.sayGoodbye = function () {
  console.log(`${this.name} says goodbye.`);
};
person1.sayGoodbye();
person1.__proto__.sayHello = function () {
  console.log(`${this.name} says hello.`);
};
person1.sayHello();
