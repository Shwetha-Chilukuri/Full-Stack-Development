function Student(name, grade) {
  this.name = name;
  this.grade = grade;
  this.study = function () {
    console.log(`${this.name} is studying.`);
  };
  this.getGrade = function () {
    return `${this.name}'s grade is: ${this.grade}`;
  };
}
let student1 = new Student("Abc", "A");
let student2 = new Student("Bcd", "B");
let student3 = new Student("Cde", "C");
student1.study();
student2.study();
student3.study();
console.log(student1.getGrade());
console.log(student2.getGrade());
console.log(student3.getGrade());
