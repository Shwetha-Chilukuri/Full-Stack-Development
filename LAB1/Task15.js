class Game {
  constructor() {
    this.targetNumber = null;
    this.attempts = 0;
    this.isGameOver = false;
  }

  startNewGame() {
    this.targetNumber = Math.floor(Math.random() * 100) + 1;
    this.attempts = 0;
    this.isGameOver = false;
    this.updateMessage("A new game has started! Guess a number between 1 and 100.");
    this.updateAttempts(0);
    this.promptGuess();
  }

  checkGuess(guess) {
    if (this.isGameOver) {
      this.updateMessage("The game is over. Start a new game.");
      return;
    }

    this.attempts++;

    if (guess === this.targetNumber) {
      this.updateMessage(`Correct! You guessed the number in ${this.attempts} attempts.`);
      this.isGameOver = true;
    } else if (guess < this.targetNumber) {
      this.updateMessage("Higher! Try again.");
      this.promptGuess();
    } else {
      this.updateMessage("Lower! Try again.");
      this.promptGuess();
    }

    this.updateAttempts(this.attempts);
  }

  promptGuess() {
    if (!this.isGameOver) {
      let guess = parseInt(prompt("Enter your guess (1-100):"));
      if (!isNaN(guess) && guess >= 1 && guess <= 100) {
        this.checkGuess(guess);
      } else {
        this.updateMessage("Invalid input. Please enter a number between 1 and 100.");
        this.promptGuess();
      }
    }
  }

  updateMessage(message) {
    document.getElementById("message").textContent = message;
  }

  updateAttempts(attempts) {
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
  }
}

const game = new Game();

// Initialize the game when the page loads
game.startNewGame();