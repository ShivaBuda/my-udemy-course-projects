const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const player0BoxEl = document.querySelector(".player__box-0");
const player1BoxEl = document.querySelector(".player__box-1");

const newGameBtnEl = document.querySelector(".newGame__btn");
const rollBtnEl = document.querySelector(".roll__btn");
const holdBtnEl = document.querySelector(".hold__btn");

const diceImgEl = document.querySelector(".dice__img");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playGame = true;

function switchPlayer() {
    currentScore = 0;
    document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0BoxEl.classList.toggle("playerActive");
    player1BoxEl.classList.toggle("playerActive");
}

newGameBtnEl.addEventListener("click", newGame);
rollBtnEl.addEventListener("click", rollDice);
holdBtnEl.addEventListener("click", holdGame);

function newGame() {
     scores = [0, 0]
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceImgEl.classList.add("hidden");
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0BoxEl.classList.remove("winning__player");
    player1BoxEl.classList.remove("winning__player");
    player1BoxEl.classList.remove("activePlayer");   
}
newGame();

function rollDice() {
    const randomNum = Math.trunc(Math.random() * 6 + 1);
    diceImgEl.classList.remove("hidden");
    diceImgEl.src = `./img/face-${randomNum}.png`;

    if (randomNum !== 1) {
        currentScore += randomNum;
    } else {
        switchPlayer();
    }
    document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
}

function holdGame() {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
        scores[activePlayer];

    if (scores[activePlayer] >= 30) {
        document
            .querySelector(`.score--${activePlayer}`)
            .classList.remove("playerActive");
        document
            .querySelector(`.player__box-${activePlayer}`)
            .classList.add("winning__player");
    }
    switchPlayer();
}
