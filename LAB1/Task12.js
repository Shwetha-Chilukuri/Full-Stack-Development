class Book {
  constructor(title, author, status = 'available', dueDate = null) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.dueDate = dueDate;
  }

  markAsBorrowed(dueDate) {
    this.status = 'borrowed';
    this.dueDate = new Date(dueDate);
  }

  markAsAvailable() {
    this.status = 'available';
    this.dueDate = null;
  }

  isOverdue() {
    if (this.status === 'borrowed' && this.dueDate) {
      const today = new Date();
      return today > this.dueDate;
    }
    return false;
  }

  calculateFine() {
    if (this.isOverdue()) {
      const today = new Date();
      const daysLate = Math.ceil((today - this.dueDate) / (1000 * 3600 * 24));
      return daysLate * 1;
    }
    return 0;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    console.log(`Added book: "${book.title}" by ${book.author}`);
  }

  removeBook(title) {
    const index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
      console.log(`Removed book: "${title}"`);
    } else {
      console.log(`Book with title "${title}" not found.`);
    }
  }

  borrowBook(title, dueDate) {
    const book = this.books.find(book => book.title === title && book.status === 'available');
    if (book) {
      book.markAsBorrowed(dueDate);
      console.log(`Book "${title}" has been borrowed. Due date: ${dueDate}`);
    } else {
      console.log(`Book "${title}" is not available.`);
    }
  }

  returnBook(title) {
    const book = this.books.find(book => book.title === title && book.status === 'borrowed');
    if (book) {
      const fine = book.calculateFine();
      book.markAsAvailable();
      if (fine > 0) {
        console.log(`Book "${title}" returned. Fine: ${fine} units.`);
      } else {
        console.log(`Book "${title}" returned on time.`);
      }
    } else {
      console.log(`Book "${title}" was not borrowed.`);
    }
  }

  searchByTitle(title) {
    const results = this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    console.log("Search results for title:", title);
    results.forEach(book => console.log(`"${book.title}" by ${book.author} - ${book.status}`));
  }

  searchByAuthor(author) {
    const results = this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    console.log("Search results for author:", author);
    results.forEach(book => console.log(`"${book.title}" by ${book.author} - ${book.status}`));
  }
}
const library = new Library();
const book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford");
const book2 = new Book("Clean Code", "Robert C. Martin");

library.addBook(book1);
library.addBook(book2);

library.searchByTitle("JavaScript");
library.searchByAuthor("Martin");

library.borrowBook("Clean Code", "2025-01-10");
library.returnBook("Clean Code");

library.removeBook("Clean Code");
