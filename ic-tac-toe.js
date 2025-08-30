// Simple 2-player Tic Tac Toe (X starts)

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("board");
const resetBtn = document.getElementById("reset");
const cells = Array.from(document.querySelectorAll(".cell"));

let board;             // Array(9): "", "X", "O"
let currentPlayer;     // "X" or "O"
let gameOver;          // boolean

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function init() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "win");
    cell.disabled = false;
  });

  updateStatus();
}

function updateStatus(text) {
  if (text) {
    statusEl.textContent = text;
  } else {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function handleCellClick(e) {
  if (gameOver) return;
  const index = Number(e.currentTarget.dataset.index);
  if (board[index]) return; // already occupied

  board[index] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.classList.add(currentPlayer.toLowerCase());

  const winnerInfo = getWinner();
  if (winnerInfo) {
    const { player, line } = winnerInfo;
    line.forEach((i) => cells[i].classList.add("win"));
    gameOver = true;
    updateStatus(`🏆 Player ${player} wins!`);
    disableBoard();
    return;
  }

  if (board.every((c) => c)) {
    gameOver = true;
    updateStatus("🤝 It's a draw!");
    disableBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function getWinner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

function disableBoard() {
  cells.forEach((cell) => (cell.disabled = true));
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", init);

// start
init();
