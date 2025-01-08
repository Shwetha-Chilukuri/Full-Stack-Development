class InfiniteIterator {
    constructor() {
      this.current = 1;
    }
  
    [Symbol.iterator]() {
      return {
        next: () => {
          return { value: this.current++, done: false };
        }
      };
    }
  }
  const infiniteIter = new InfiniteIterator();
  const iter = infiniteIter[Symbol.iterator]();
  console.log(iter.next().value); 
  console.log(iter.next().value);
  console.log(iter.next().value);  
  