let gameStatus = "running";
let playerSymbol = "X";
let computerSymbol = "O";

const cells = document.querySelectorAll(".cell");
const symbols = document.querySelectorAll(".symbol");

//add listeners
symbols.forEach(x => x.addEventListener("click", symbolChoice));
cells.forEach(x => x.addEventListener("click", playerTurn));

//check game status
const isGameRunning = () => gameStatus === 'running';

function symbolChoice() {
  playerSymbol = this.textContent;
  computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
  resetGame(); 
}

function playerTurn() {
  if (!isGameRunning()) resetGame();
  //check if the cell is empty
  if (this.textContent !== "") return;
  this.textContent = playerSymbol;
  if (checkWin(Array.from(cells), playerSymbol)) {
    gameStatus = "Player wins";
    return;
  }
  computerTurn();
}

function computerTurn() {
  //select only empty cells
  const freeCells = Array.from(cells).filter(x => !x.textContent);
  //check if there are still cells available
  if (freeCells.length == 0) return;
  const randomFreeCell = pickRandomCell(freeCells);
  randomFreeCell.textContent = computerSymbol;
  if (checkWin(Array.from(cells), computerSymbol)) {
    gameStatus = "Computer wins";
    return;
  }
}

function pickRandomCell(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

function resetGame() {
  cells.forEach(x => x.textContent = '');
  gameStatus = 'running';
}


