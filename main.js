import { clearCells, renderCells } from "./functions.js";

//////////////////////////////////////////////////
//CURSOR SHINY
const glow = document.querySelector("#glow-cursor");
window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});
//////////////////////////////////////////////////

const mainMenu = document.querySelector("#mainMenu");
const game = document.querySelector("#game");
const cells = document.querySelectorAll(".cell");
const turn = document.querySelector("#statusTurn");
const restartBtn = document.querySelector("#restart");
const oTakes = document.querySelector("#oTakes");
const xTakes = document.querySelector("#xTakes");
let turnX = true;
let botX = true;
let isBotGame = false;
let playerIsX = true; // se actualiza cuando el usuario elige X u O

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener(`click`, userMove);
}

///////////////////////////
//MAIN MANU

const selectX = document.querySelector("#selectX");
const selectO = document.querySelector("#selectO");
const selectPlayerContainer = document.querySelector("#selectPlayerContainer");
const newGameBot = document.querySelector("#newGameBot");
const twoPlayerGame = document.querySelector("#twoPlayerGame");
let playerSelected = false; //tiene que ser true para poder iniciar juego desde le main menu

selectX.addEventListener("click", () => {
  playerSelected = true;
  selectPlayerContainer.classList.remove("border", "border-green-600");
  selectPlayerContainer.classList.add("border", "border-purple-600");
  turnX = true;
  botX = false;
  turn.innerHTML = `X`;
});
selectO.addEventListener("click", () => {
  playerSelected = true;
  selectPlayerContainer.classList.remove("border", "border-purple-600");
  selectPlayerContainer.classList.add("border", "border-green-600");
  turnX = false;
  botX = true;
  turn.innerHTML = `O`;
});

twoPlayerGame.addEventListener("click", () => {
  if (!playerSelected) {
    alert("Primero seleccioná si querés ser X u O.");
    return;
  }

  mainMenu.classList.add("hidden");
  mainMenu.classList.remove("flex");
  game.classList.remove("hidden");
  game.classList.add("flex");
});

newGameBot.addEventListener("click", () => {
  if (!playerSelected) {
    alert("Primero seleccioná si querés ser X u O.");
    return;
  }

  
  isBotGame = true;
  playerIsX = turnX; // Ya fue definido en selectX/selectO
  turnX = true;

  mainMenu.classList.add("hidden");
  mainMenu.classList.remove("flex");
  game.classList.remove("hidden");
  game.classList.add("flex");

  // Si se elige O que bot empiece
  if (playerIsX == false) {
    setTimeout(botMove, 1000);
  }
});

////////////////////////
//GAME

let contadorDeJugadas = 0;
let endGame = false;

function userMove(e) {
  if (endGame) return;
  const cell = e.target;
  if (!cell.innerHTML.length && (!isBotGame || (isBotGame && turnX === playerIsX))) {
    const mark = turnX ? "X" : "O";
    placeMark(cell, mark);

    checkAllLines();

    if (!endGame && contadorDeJugadas === 9) {
      empate();
      contadorDeJugadas = 0;
      setTimeout(botMove, 500);
      return;
    }

    // Si estamos en modo bot y es turno del bot ahora
    if (isBotGame && turnX !== playerIsX && !endGame) {
      setTimeout(botMove, 500);
    }
  }
}

function placeMark(cell, mark) {
  cell.innerHTML =
    mark === "X"
      ? `<h2 class="text-8xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-800 via-purple-600 to-violet-700 drop-shadow-[0_0_8px_purple]">X</h2>`
      : `<h2 class="text-8xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 drop-shadow-[0_0_8px_teal]">O</h2>`;

  turnX = !turnX;
  contadorDeJugadas++;
  turn.innerHTML = turnX ? "X" : "O";
}

function checkAllLines() {
  checkLine(0, 1, 2);
  checkLine(3, 4, 5);
  checkLine(6, 7, 8);
  checkLine(0, 3, 6);
  checkLine(1, 4, 7);
  checkLine(2, 5, 8);
  checkLine(0, 4, 8);
  checkLine(6, 4, 2);
}

function checkLine(c1, c2, c3) {
  if (
    cells[c1].innerHTML.length &&
    cells[c1].innerHTML == cells[c2].innerHTML &&
    cells[c2].innerHTML == cells[c3].innerHTML
  ) {
    if (turnX) {
      console.log("Winner o");
      endGame = true;
      contadorDeJugadas = 0;
    } else {
      console.log("winner x");
      endGame = true;
      contadorDeJugadas = 0;
    }

    showWinner();
  }
}

const playerX = document.querySelector("#playerX");
const ties = document.querySelector("#ties");
const playerO = document.querySelector("#playerO");

let winnsX = 0;
let winnsO = 0;
let winnsTies = 0;

function empate() {
  restartGame();
  winnsTies = winnsTies + 1;
  ties.innerHTML = winnsTies;

}

function showWinner() {
  if (turnX) {
    oTakes.classList.remove("hidden");
    oTakes.classList.add("flex");
    winnsO = winnsO + 1;
    playerO.innerHTML = `${winnsO}`;
    console.log(winnsO);
  } else {
    xTakes.classList.remove("hidden");
    xTakes.classList.add("flex");
    winnsX = winnsX + 1;
    playerX.innerHTML = `${winnsX}`;
    console.log(winnsX);
  }
}

function restartGame() {
  cells.forEach((cell) => (cell.innerHTML = ""));
  endGame = false;
  contadorDeJugadas = 0;
}

restartBtn.addEventListener("click", () => {
  console.log("Btn Restart");
  restartGame();
});

////////////////////////////////////////////
//BOT SPACE

function botMove() {
  if (endGame) return;

  const emptyCells = Array.from(cells).filter((cell) => !cell.innerHTML.length);
  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  placeMark(randomCell, botX ? "X" : "O");

  checkAllLines();

  if (!endGame && contadorDeJugadas === 9) {
    empate();
    contadorDeJugadas = 0;
    userMove();
  }
}

//////////////////////////////////////////////////////////////////
//WHEN WINN
const quitX = document.querySelector("#quitX");
const nextX = document.querySelector("#nextX");
const quitO = document.querySelector("#quitO");
const nextO = document.querySelector("#nextO");

//MODAL X WINNS
quitX.addEventListener("click", () => {
  restartGame();
  mainMenu.classList.remove("hidden");
  mainMenu.classList.add("flex");
  game.classList.remove("flex");
  game.classList.add("hidden");
  xTakes.classList.remove("flex");
  xTakes.classList.add("hidden");
  endGame = false;
  contadorDeJugadas = 0;
  turnX = true;
  botX = true;
  isBotGame = false;
  playerIsX = true;
  playerSelected = false;
  selectPlayerContainer.classList.remove("border", "border-green-600");
});
nextX.addEventListener("click", () => {
  restartGame();
  xTakes.classList.remove("flex");
  xTakes.classList.add("hidden");
  endGame = false;
  contadorDeJugadas = 0;
  if (!botX) {
    setTimeout(botMove, 500);
  }
});

//MODAL O WINNS
quitO.addEventListener("click", () => {
  restartGame();
  mainMenu.classList.remove("hidden");
  mainMenu.classList.add("flex");
  game.classList.remove("flex");
  game.classList.add("hidden");
  oTakes.classList.remove("flex");
  oTakes.classList.add("hidden");
  endGame = false;
  contadorDeJugadas = 0;
  turnX = true;
  botX = true;
  isBotGame = false;
  playerIsX = true;
  playerSelected = false;
  selectPlayerContainer.classList.remove("border", "border-green-600");
});
nextO.addEventListener("click", () => {
  restartGame();
  oTakes.classList.remove("flex");
  oTakes.classList.add("hidden");
  endGame = false;
  contadorDeJugadas = 0;
  if (botX) {
    setTimeout(botMove, 500);
  }
});
