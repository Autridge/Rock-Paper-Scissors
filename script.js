"use strict";

const choiceBtns = document.querySelectorAll(".city-player--choice");
const resultText = document.querySelector(".victory");
const restartBtn = document.querySelector(".city-player--restart");

const playerImage = document.querySelector(".city-player--image");
const computerImage = document.querySelector(".jungle-computer--image");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
    img: "images/paper.png",
  },
  {
    name: "rock",
    beats: "scissors",
    img: "images/rock.png",
  },
  {
    name: "scissors",
    beats: "paper",
    img: "images/scissors.png",
  },
];

// Game
choiceBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

restartBtn.addEventListener("click", resetGame);

// Functions
function choose(playerChoice) {
  playerImage.src = playerChoice.img;

  // Hide the computer image until it makes a choice
  computerImage.classList.add("hidden");
  resultText.classList.add("hidden");

  // Add a slight delay for the computer to choose
  setTimeout(() => {
    const compChoice = compChoose();
    displayResults(playerChoice, compChoice);
  }, 1000); // 1-second delay
}

function compChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(playerChoice, compChoice) {
  computerImage.src = compChoice.img;

  // Show the computer image after it makes a choice
  computerImage.classList.remove("hidden");

  // Display the result text
  resultText.classList.remove("hidden");

  if (playerChoice.name === compChoice.name) {
    resultText.textContent = `It's a tie! Both chose ${playerChoice.name}.`;
  } else if (playerChoice.beats === compChoice.name) {
    resultText.textContent = `You win! ${playerChoice.name} beats ${compChoice.name}.`;
  } else {
    resultText.textContent = `You lose! ${compChoice.name} beats ${playerChoice.name}.`;
  }
}

function resetGame() {
  resultText.classList.add("hidden");
  playerImage.src = "images/rock.png";
  computerImage.src = "images/scissors.png";
  computerImage.classList.add("hidden");
}
