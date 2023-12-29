let randomNum, attempts, guesses;
let running = false;

const guessField = document.getElementById("guessField");
const submitBtn = document.getElementById("submitBtn");
const startMsg = document.getElementById("startMsg");
const resultMsg = document.getElementById("resultMsg");
const resultParas = document.getElementById("resultParas");
const guessesPara = document.getElementById("guessesPara");
const attemptsPara = document.getElementById("attemptsPara");


startMsg.addEventListener('click', () => {
    if (!running) {
        startGame();
    }
});

submitBtn.addEventListener('click', (event) => {
    if (running) {
        event.preventDefault();
        const guessedNum = parseInt(guessField.value);
        validateGuess(guessedNum);
    }
});

function startGame() {
    console.log("Game Start");
    guessField.removeAttribute("disabled");
    submitBtn.removeAttribute("disabled");
    randomNum = parseInt(Math.random() * 100 + 1);
    guesses = [];
    attempts = 10;
    running = true;
    guessesPara.innerText = `[${guesses}]`;
    attemptsPara.innerText = attempts;
    startMsg.innerText = "Best of Luck";
    resultMsg.innerText = '';
}

function validateGuess(guessedNum) {
    if (isNaN(guessedNum)) {
        alert('PLease enter a valid number');
    }
    else if (guessedNum < 1) {
        alert('PLease enter a number more than 1');
    }
    else if (guessedNum > 100) {
        alert('PLease enter a  number less than 100');
    }
    else {
        guesses.push(guessedNum);
        updateResParas();

        if (attempts === 0) {
            displayMsg(`Game Over. Random number was ${randomNum}`);
            endGame();
        }
        else {
            checkGuess(guessedNum);
        }
    }
}

function checkGuess(guessedNum) {
    console.log(guessedNum);
    console.log(randomNum);

    if (guessedNum < randomNum) {
        displayMsg(`Number is TOOO low`);
    }
    else if (guessedNum > randomNum) {
        displayMsg(`Number is TOOO High`);
    }
    else if (guessedNum === randomNum) {
        displayMsg(`You guessed it right`);
        endGame();
    }
}

function updateResParas() {
    guessesPara.innerText = `[${guesses}]`;
    attemptsPara.innerText = --attempts;
}

function displayMsg(message) {
    resultMsg.innerText = message;
}

function endGame() {
    guessField.value = '';
    guessField.setAttribute("disabled", "");
    submitBtn.setAttribute("disabled", "");
    startMsg.innerText = "Start Game";
    running = false;
}