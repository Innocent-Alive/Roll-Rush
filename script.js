"use strict";

// Selecting the elements
const player1e = document.querySelector(".player-0");
const player2e = document.querySelector(".player-1");
const score1e = document.getElementById("score-0");
const score2e = document.getElementById("score-1");
const currentScore0 = document.getElementById("current-0");
const currentScore1 = document.getElementById("current-1");
const dice = document.querySelector(".dice-image");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const resetBtn = document.querySelector(".btn-new");
const rulesBtn = document.querySelector(".btn-rules");
const closeBtn = document.querySelector("#close-btn");
const modal = document.querySelector(".modal");
const main = document.querySelector("#main");

//Initial Conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  dice.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1e.textContent = 0;
  score2e.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player1e.classList.remove("player-winner");
  player2e.classList.remove("player-winner");
  player1e.classList.add("player-active");
  player2e.classList.remove("player-active");
};
init();

//switching players
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1e.classList.toggle("player-active");
  player2e.classList.toggle("player-active");
};

//Adding Event Listeners to Buttons
//When User Dice Rolls
rollBtn.addEventListener("click", function () {
  if (playing) {
    // 1. Generating Random Number
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Displaying the Dice
    dice.classList.remove("hidden");
    console.log(diceRoll);
    dice.src = `./assets/dice-${diceRoll}.png`;

    // 3 Checking for the conditions
    // if value is not 1
    if (diceRoll !== 1) {
      // Adding Dice Roll To Current Score
      currentScore += diceRoll;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    }
    //if value is 1
    else {
      switchPlayer();
    }
  } else {
  }
});
holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-active");
      alert(`Player ${activePlayer + 1} wins the match !!!`);
      init();
    } else {
      switchPlayer();
    }
  }
});
resetBtn.addEventListener("click", init);

rulesBtn.addEventListener("click", function () {
  modal.style.display = "block";
  main.style.display = "none";
});
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  main.style.display = "flex";
});

document.getElementById("backgroundMusic").play();
