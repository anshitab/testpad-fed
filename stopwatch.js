let startTime = 0;
let interval = null;
let isRunning = false;
let lapCount = 1;

const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const sec = String(totalSec % 60).padStart(2, '0');
  const msPart = String(ms % 1000).substring(0, 2).padStart(2, '0');
  return `${min}:${sec}:${msPart}`;
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  timer.textContent = formatTime(elapsed);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    interval = setInterval(updateTimer, 50);
    isRunning = true;
    startBtn.textContent = "Stop";
    startBtn.classList.add("stop");
    lapBtn.textContent = "Lap";
  } else {
    clearInterval(interval);
    isRunning = false;
    startBtn.textContent = "Start";
    startBtn.classList.remove("stop");
    lapBtn.textContent = "Reset";
  }
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const currentTime = timer.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount++}   ${currentTime}`;
    laps.appendChild(li);
  } else {
    // Reset stopwatch
    timer.textContent = "00:00:00";
    laps.innerHTML = "";
    lapCount = 1;
  }
});
