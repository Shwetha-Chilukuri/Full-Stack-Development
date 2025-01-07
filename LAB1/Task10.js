class BankAccount {
  constructor(accountHolder, balance = 0) {
    this.accountHolder = accountHolder;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`${this.accountHolder} deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`${this.accountHolder} withdrew ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Insufficient funds.");
    }
  }
}

function transfer(account, amount) {
  if (this.balance >= amount) {
    this.balance -= amount;
    account.balance += amount;
    console.log(`${this.accountHolder} transferred ${amount} to ${account.accountHolder}.`);
    console.log(`${this.accountHolder}'s balance: ${this.balance}`);
    console.log(`${account.accountHolder}'s balance: ${account.balance}`);
  } else {
    console.log("Insufficient funds for transfer.");
  }
}

const account1 = new BankAccount("Alice", 500);
const account2 = new BankAccount("Bob", 300);

account1.deposit(100);
account1.withdraw(50);
transfer.call(account1, account2, 200);
