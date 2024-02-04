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
let guessedNumber = 0;

function start(){
    console.log("Javascript running!");
}

function startGame(){
    minRange = parseInt(document.getElementById("minRange").value, 10) || 1;
    maxRange = parseInt(document.getElementById("maxRange").value, 10) || 100;

    guessedNumber = getGuessedNumber(minRange, maxRange);
    displayOutput(`Computer guessed: ${guessedNumber}`);
    startGameBtn.disabled = true;
    lowBtn.disabled = false;
    highBtn.disabled = false;
    correctBtn.disabled = false;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGuessedNumber(min, max) {
    let fuzzyMaxRange = Math.ceil((max + min) / 2 * 1.1);
    let fuzzyMinRange = Math.floor((max + min ) / 2 * 0.9);

    let guessedNumber = Math.floor(Math.random() * (fuzzyMaxRange - fuzzyMinRange + 1)) + fuzzyMinRange;
    if (guessedNumber<min){
        guessedNumber = min
    }
    if (guessedNumber>max){
        guessedNumber = max
    }
    return guessedNumber
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
        document.getElementById('output').innerHTML = `i guessed ${guessedNumber} in ${attempts} attempts`;
        playAgainBtn.style.visibility = "visible"
        lowBtn.disabled = true;
        highBtn.disabled = true;
        correctBtn.disabled = true;
    }

    if (maxRange-minRange < 1 ){
        displayOutput("i give up")
        playAgainBtn.style.visibility = "visible"
        lowBtn.disabled = true;
        highBtn.disabled = true;
        correctBtn.disabled = true;
    } else {
        guessedNumber = getGuessedNumber(minRange, maxRange);
        displayOutput(`Computer guessed: ${guessedNumber}`);
    }
}
