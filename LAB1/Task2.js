function calculator(operand1, operand2, operation) {
  let result;

  switch (operation) {
    case 'add':
      result = operand1 + operand2;
      break;
    case 'subtract':
      result = operand1 - operand2;
      break;
    case 'multiply':
      result = operand1 * operand2;
      break;
    case 'divide':
      if (operand2 === 0) {
        result = "Error: Division by zero is not allowed";
      } else {
        result = operand1 / operand2;
      }
      break;
    default:
      result = "Error: Invalid operation";
  }

  return result;
}

let number1 = parseFloat(prompt("Enter the first number:"));
let number2 = parseFloat(prompt("Enter the second number:"));
let operation = prompt("Enter the operation (add, subtract, multiply, divide):");

let output = calculator(number1, number2, operation);
console.log("Result:", output);
