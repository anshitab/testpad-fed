const apiUrl = "http://codeapi.net.cws18.my-hosting-panel.com/hangman.php";

let currentQ = null;
let displayWord = [];
let usedLetters = [];
let lives = 6;

const questionEl = document.getElementById("question");
const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const livesEl = document.getElementById("lives");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restart");

// Fetch questions from API
async function fetchQuestions() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  startGame(data);
}

function startGame(questions) {
  const randomQ = questions[Math.floor(Math.random() * questions.length)];
  currentQ = randomQ;
  displayWord = Array(randomQ.Answer.length).fill("_");
  usedLetters = [];
  lives = 6;

  questionEl.textContent = randomQ.Question;
  updateWord();
  renderLetters();
  livesEl.textContent = `Lives: ${lives}`;
  messageEl.textContent = "";
  restartBtn.style.display = "none";
}

function updateWord() {
  wordEl.innerHTML = "";
  displayWord.forEach(ch => {
    const span = document.createElement("span");
    span.textContent = ch;
    wordEl.appendChild(span);
  });
}

function renderLetters() {
  lettersEl.innerHTML = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alphabet.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.disabled = usedLetters.includes(letter);
    btn.onclick = () => handleGuess(letter, btn);
    lettersEl.appendChild(btn);
  });
}

function handleGuess(letter, btn) {
  usedLetters.push(letter);
  btn.disabled = true;

  let found = false;
  const answer = currentQ.Answer.toUpperCase();

  displayWord = displayWord.map((ch, i) => {
    if (answer[i] === letter) {
      found = true;
      return currentQ.Answer[i]; // keep original case
    }
    return ch;
  });

  if (found) {
    updateWord();
    if (!displayWord.includes("_")) {
      messageEl.textContent = "🎉 You Won!";
      endGame();
    }
  } else {
    lives--;
    livesEl.textContent = `Lives: ${lives}`;
    if (lives === 0) {
      messageEl.textContent = `❌ Game Over! Answer was: ${currentQ.Answer}`;
      endGame();
    }
  }
}

function endGame() {
  document.querySelectorAll(".letters button").forEach(btn => btn.disabled = true);
  restartBtn.style.display = "inline-block";
}

restartBtn.onclick = () => fetchQuestions();

// Start game on load
fetchQuestions();
