let sessionTime = 25;
let breakTime = 5;
let isRunning = false;
let isSession = true;
let timer;
let timeLeft = sessionTime * 60;

const sessionDisplay = document.getElementById("session-time");
const breakDisplay = document.getElementById("break-time");
const timeDisplay = document.getElementById("timeDisplay");
const modeLabel = document.getElementById("modeLabel");

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timeDisplay.textContent = `${minutes}:${seconds}`;
  sessionDisplay.textContent = sessionTime;
  breakDisplay.textContent = breakTime;
}

function disableControls(disabled) {
  document.querySelectorAll(".control-btns button").forEach(btn => btn.disabled = disabled);
}

function toggleMode() {
  isSession = !isSession;
  modeLabel.textContent = isSession ? "Session" : "Break";
  timeLeft = (isSession ? sessionTime : breakTime) * 60;
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  disableControls(true);

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      toggleMode();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isSession = true;
  timeLeft = sessionTime * 60;
  modeLabel.textContent = "Session";
  updateDisplay();
  disableControls(false);
}

document.getElementById("session-increase").onclick = () => {
  if (!isRunning) {
    sessionTime++;
    timeLeft = sessionTime * 60;
    updateDisplay();
  }
};

document.getElementById("session-decrease").onclick = () => {
  if (!isRunning && sessionTime > 1) {
    sessionTime--;
    timeLeft = sessionTime * 60;
    updateDisplay();
  }
};

document.getElementById("break-increase").onclick = () => {
  if (!isRunning) {
    breakTime++;
    updateDisplay();
  }
};

document.getElementById("break-decrease").onclick = () => {
  if (!isRunning && breakTime > 1) {
    breakTime--;
    updateDisplay();
  }
};

document.getElementById("startBtn").onclick = startTimer;
document.getElementById("resetBtn").onclick = resetTimer;

updateDisplay();
