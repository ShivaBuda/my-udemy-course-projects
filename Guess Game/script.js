const playBtnEl = document.querySelector(".js-play__btn");
playBtnEl.addEventListener("click", playAgain);

document.querySelector(".js-check__btn").addEventListener("click", checkResult);

const displayEl = document.querySelector(".js-display__result");
const guessResult = document.querySelector(".js-guess");
const inputNumEl = document.querySelector(".js-input__num");
const scoreEl = document.querySelector(".js-score__text");
const highScoreEl = document.querySelector(".js-score__highest");
const checkResultBtn = document.querySelector(".js-check__btn");

let randomNum = Math.trunc(Math.random() * 20 + 1);
let html = "";
let score = 20;
let highestScore = 0;


function checkResult() {
    if (inputNumEl.value) {
        const inputNum = Number(inputNumEl.value);
        if (randomNum === inputNum) {
            displayEl.innerHTML = randomNum;
            html = "You guess correct!";
            document.querySelector(".main__container").style.backgroundColor =
                "green";
            playBtnEl.value = "play again";
            highestScore =
                highestScore < score
                    ? (highestScore = score)
                    : (highestScore = highestScore);
            highScoreEl.innerHTML = `Highest Score: ${highestScore}`;
            checkResultBtn.disabled = true;
        } else if (randomNum !== inputNum)
            if (score > 1) {
                randomNum > inputNum ? (html = "Too low") : (html = "Too high");
                score--;
            } else {
                html = "Sorry you lost the game!";
                playBtnEl.value = "play again";
                inputNumEl.value = "";
                score = 0;
                displayEl.innerHTML = randomNum;
                document.querySelector(
                    ".main__container",
                ).style.backgroundColor = "orange";
                checkResultBtn.disabled = true;
            }
    } else {
        html = "No number!";
    }

    guessResult.innerHTML = html;
    scoreEl.innerHTML = `Score: ${score}`;
}

function playAgain() {
    displayEl.innerHTML = "?";
    guessResult.innerHTML = "Start guessing";
    document.querySelector(".main__container").style.backgroundColor = "black";
    inputNumEl.value = "";
    score = 20;
    scoreEl.innerHTML = `Score: ${score}`;
    randomNum = Math.trunc(Math.random() * 20 + 1);
    playBtnEl.value = "Reset";
    checkResultBtn.disabled = false;
}
