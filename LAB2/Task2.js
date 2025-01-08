function calculateTotal(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
console.log(calculateTotal(10, 20, 30, 40));