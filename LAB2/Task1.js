function mergeArrays(...arrays) {
    let res = [].concat(...arrays);
    return res
  }
  
console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
  