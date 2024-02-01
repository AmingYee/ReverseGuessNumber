window.addEventListener("load", start)

const startGameBtn = document.getElementById("startGame");
const playAgainBtn = document.getElementById("PlayAgain")
const lowBtn = document.getElementById("lowBtn")
const highBtn = document.getElementById("highBtn")
const correctBtn = document.getElementById("correctBtn")
const outputList = document.getElementById("output");

startGameBtn.addEventListener("click", startGame);

playAgainBtn.addEventListener("click", () => {
    location.reload();
});

lowBtn.addEventListener('click', function() {
    checkGuess('low');
});

highBtn.addEventListener('click', function() {
    checkGuess('high');
});

correctBtn.addEventListener('click', function() {
    checkGuess('correct');
});

let attempts = 0;
let minRange = 1;
let maxRange = 100;
let guessedNumber = getRandomNumber(minRange, maxRange);

function start(){
    console.log("Javascript running!");
}

function startGame(){
    minRange = parseInt(document.getElementById("minRange").value, 10) || 1;
    maxRange = parseInt(document.getElementById("maxRange").value, 10) || 100;

    guessedNumber = getRandomNumber(minRange, maxRange);
    displayOutput(`Computer guessed: ${guessedNumber}`);
    startGameBtn.disabled = true;
    lowBtn.disabled = false;
    highBtn.disabled = false;
    correctBtn.disabled = false;
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayOutput(message) {
    const listItem = document.createElement("li");
    listItem.textContent = message;
    outputList.appendChild(listItem);
}

function checkGuess(result) {
    attempts++;
    if (result === 'low') {
        minRange = guessedNumber + 1;
    } else if (result === 'high') {
        maxRange = guessedNumber - 1;
    } else if (result === 'correct') {
        document.getElementById('output').innerHTML = `congratz its correct: ${guessedNumber}`;
        playAgainBtn.style.visibility = "visible";
        return;
    } else if (result === 'initial') {
        displayOutput(`Congratulations! You guessed the number: ${guessedNumber}`);
        playAgainBtn.style.visibility = "visible";
        lowBtn.disabled = true;
        highBtn.disabled = true;
        correctBtn.disabled = true;
        return;
    }

    guessedNumber = getRandomNumber(minRange, maxRange);
    displayOutput(`Computer guessed: ${guessedNumber}`);
}
