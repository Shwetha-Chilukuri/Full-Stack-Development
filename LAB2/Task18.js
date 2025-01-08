class ReverseIterable {
    constructor(arr) {
      this.arr = arr;
    }
  
    [Symbol.iterator]() {
      let index = this.arr.length - 1;
      return {
        next: () => {
          if (index >= 0) {
            return { value: this.arr[index--], done: false };
          } else {
            return { done: true };
          }
        }
      };
    }
  }
  const arr = [1, 2, 3, 4];
  const reverseIter = new ReverseIterable(arr);
  for (let num of reverseIter) {
    console.log(num);
  }
  