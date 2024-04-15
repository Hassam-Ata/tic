x_CLASS = "x";
circle_CLASS = "circle";
WINNING_COMBINATIONS = [
  //Horizontals
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Verticals
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonals
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winScreen = document.querySelector(".winScreen");
const wintText = document.querySelector(".winText");
const restartBtn=document.querySelector(".restart");
restartBtn.addEventListener("click",start)
start();
function start() {
  circleTurn = false;

  cells.forEach((cell) => {
   cell.classList.remove(x_CLASS);
   cell.classList.remove(circle_CLASS);
 cell.removeEventListener("click",handleClick);

    cell.addEventListener("click", handleClick, { once: true });
  });
  setHover();
  winScreen.classList.remove("message");
}

function handleClick(e) {
  const cell = e.target;

  const currentClass = circleTurn ? circle_CLASS : x_CLASS;

  placeMark(cell, currentClass);
  if (checkwin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
  swapTurn();
  setHover();
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(x_CLASS) || cell.classList.contains(circle_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    wintText.innerText = "Draw";
  } else {
    wintText.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  }
  winScreen.classList.add("message");
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}
function setHover() {
  board.classList.remove(x_CLASS);
  board.classList.remove(circle_CLASS);

  if (circleTurn) {
    board.classList.add(circle_CLASS);
  } else {
    board.classList.add(x_CLASS);
  }
}

function checkwin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
