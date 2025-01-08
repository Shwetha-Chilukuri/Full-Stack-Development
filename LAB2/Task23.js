function* cumulativeSum(arr) {
    let sum = 0;
    for (let num of arr) {
      sum += num;
      yield sum;
    }
    return sum; 
  }
  const arr = [1, 2, 3, 4];
  const sum = cumulativeSum(arr);
  
  for (let s of sum) {
    console.log(s); 
  }
  console.log(sum.return);  

  