function* combineSequences(seq1, seq2) {
    const iter1 = seq1[Symbol.iterator]();
    const iter2 = seq2[Symbol.iterator]();
  
    let result1 = iter1.next();
    let result2 = iter2.next();
  
    while (!result1.done || !result2.done) {
      if (!result1.done) {
        yield result1.value;
        result1 = iter1.next();
      }
      if (!result2.done) {
        yield result2.value;
        result2 = iter2.next();
      }
    }
  }
  const seq1 = [1, 2, 3];
  const seq2 = [4, 5, 6];
  const combinedGen = combineSequences(seq1, seq2);
  
  for (let num of combinedGen) {
    console.log(num);  
  }
  