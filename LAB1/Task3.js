function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hello, my name is ${this.name}.`);
  };

  this.isAdult = function () {
    return this.age >= 18 ? 'Yes, I am an adult.' : 'No, I am not an adult.';
  };
}

let person1 = new Person("Shwetha", 19);
person1.greet();
console.log(person1.isAdult());
let person2 = new Person("Hansika", 20);
person2.greet();
console.log(person2.isAdult()); 
