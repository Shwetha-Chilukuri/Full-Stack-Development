class ResettableIterable {
    constructor(arr) {
      this.arr = arr;
      this.position = 0;
    }
  
    [Symbol.iterator]() {
      return {
        next: () => {
          if (this.position < this.arr.length) {
            return { value: this.arr[this.position++], done: false };
          } else {
            return { done: true };
          }
        }
      };
    }
  
    reset() {
      this.position = 0;
    }
  }
  const resetIter = new ResettableIterable([10, 20, 30]);
  for (let num of resetIter) {
    console.log(num);  
  }
  resetIter.reset();
  for (let num of resetIter) {
    console.log(num);  
  }
  