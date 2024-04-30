let gameOver = new Audio("./sounds/gameOver.mp3");
let wrongInput = new Audio("./sounds/wrongInput.mp3");
let gameWon = new Audio("./sounds/gameWin.mp3");
let attempts = 7;
let randomNumber;

function generateRandomNumber() {
  let excludedValues = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  let number;

  do {
    number = Math.floor(Math.random() * 100) + 1;
  } while (excludedValues.includes(number));

  return number;
}

function resetGame() {
  attempts = 7;
  randomNumber = generateRandomNumber();
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("result").innerHTML = "";
  document.getElementById("correctAnswer").innerHTML = "";
  document.getElementById("prevPlays").innerHTML = "";
  document.getElementById("attempts").innerHTML =
    "Attempts remaining: " + attempts;
  console.log(randomNumber);
}

function guess() {
  if (attempts < 1) {
    return;
  }

  let guess = document.getElementById("guessInput").value;
  let previous = document.getElementById("prevPlays");

  if (isNaN(guess) || guess < 1 || guess > 100) {
    document.getElementById("result").innerHTML =
      "Please enter a number between 1 and 100.";
    wrongInput.load();
    wrongInput.play();
    return;
  }

  attempts--;

  if (guess < randomNumber) {
    document.getElementById("result").innerHTML =
      "Your guess is low! Try again.";
    wrongInput.load();
    wrongInput.play();
  } else if (guess > randomNumber) {
    document.getElementById("result").innerHTML =
      "Your guess is high! Try again.";
    wrongInput.load();
    wrongInput.play();
  } else {
    document.getElementById("result").innerHTML =
      "Congratulations! You guessed the correct number!";
    gameWon.load();
    gameWon.play();
    document.getElementById("guessInput").disabled = true;
  }
  previous.innerHTML += `<li>${guess}</li>`;

  document.getElementById("attempts").innerHTML =
    "Attempts remaining: " + attempts;

  if (attempts < 1) {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("result").innerHTML = "Game over!";
    document.getElementById("correctAnswer").innerHTML =
      "The correct answer was " + randomNumber;
    gameOver.load();
    gameOver.play();
  }
}

resetGame();
