//global variables
let gameStatus = "running";
let turn = "player";
let playerSymbol = "X";
let computerSymbol = "O";

//html elements
const cells = document.querySelectorAll(".cell");
const symbols = document.querySelectorAll(".symbol");
const result = document.querySelector(".result");

//add listeners
Array.from(symbols).forEach(x => x.addEventListener("click", symbolChoice));
Array.from(cells).forEach(x => x.addEventListener("click", playerTurn));

//function to check game status
const isGameRunning = () => gameStatus === "running";

//function to simulate cpu thinking time
const cpuThinkingTime = () => Math.random() * 1000;

const isComputerTurn = () => turn === 'computer';

//assign 'x' or 'o' according to player's choice
function symbolChoice() {
  playerSymbol = this.textContent;
  computerSymbol = playerSymbol === "X" ? "O" : "X";

  //change style
  Array.from(symbols).forEach(x => x.classList.remove("active"));
  this.classList.add("active");
  resetGame();
}

//handle player turn
function playerTurn() {
  //if game is not running, reset the game and continue
  if (!isGameRunning()) resetGame();

   if (isComputerTurn()) return;
  //check if the cell is empty
  if (this.textContent !== "") return;
  this.textContent = playerSymbol;
  turn = 'computer';
  if (checkWin(Array.from(cells), playerSymbol)) {
    gameStatus = "Player wins";
    result.textContent = gameStatus;
    return;
  }
  //brief timeout before computer move
  setTimeout(computerTurn, cpuThinkingTime());
}

function computerTurn() {
  //select only empty cells
  const freeCells = Array.from(cells).filter(x => !x.textContent);

  //check if there are still cells available
  if (freeCells.length == 0) {
    //if there are no cells available, the game is draw
    gameStatus = 'Draw';
    result.textContent = gameStatus;
    return;
  }
  //chose a cell among the available
  const chosenCell = pickRandomCell(freeCells);

  chosenCell.textContent = computerSymbol;

  //check game status
  if (checkWin(Array.from(cells), computerSymbol)) {
    gameStatus = "Computer wins";
    result.textContent = gameStatus;
    return;
  }
  turn = 'player';
}

/*Computer only choose a random cell
AI to be improved*/
function pickRandomCell(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//check if there's a winner
function checkWin(arr, symbol) {
  const table = arr.map(x => x.textContent);
  return checkRows() || checkColumns() || checkDiags();

  function checkRows() {
    return (
      (table[0] == symbol && table[1] == symbol && table[2] == symbol) ||
      (table[3] == symbol && table[4] == symbol && table[5] == symbol) ||
      (table[6] == symbol && table[7] == symbol && table[8] == symbol)
    );
  }

  function checkColumns() {
    return (
      (table[0] == symbol && table[3] == symbol && table[6] == symbol) ||
      (table[1] == symbol && table[4] == symbol && table[7] == symbol) ||
      (table[2] == symbol && table[5] == symbol && table[8] == symbol)
    );
  }

  function checkDiags() {
    return (
      (table[0] == symbol && table[4] == symbol && table[8] == symbol) ||
      (table[2] == symbol && table[4] == symbol && table[6] == symbol)
    );
  }
}

//reset game
function resetGame() {
  cells.forEach(x => (x.textContent = ""));
  turn = 'player';
  gameStatus = "running";
  result.textContent = '';
}
