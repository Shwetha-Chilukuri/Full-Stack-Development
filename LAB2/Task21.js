function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
  const fibGen = fibonacci();
  console.log(fibGen.next().value); 
  console.log(fibGen.next().value);  
  console.log(fibGen.next().value); 
  console.log(fibGen.next().value); 
  