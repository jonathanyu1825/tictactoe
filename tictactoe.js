// final variables
const ROW = 3;
const COL = 3;


// setting up boards

let cell = document.getElementsByClassName("cell");
let grid = [[],[],[]];
for (let i = 0; i < ROW * COL; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    grid[row].push(cell.item(i));
}

for (let i = 0; i < ROW * COL; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    grid[row][col].addEventListener("click", (event) => userClick(row, col));
}

let curGame = Array.from({ length: 3 }, () => ["", "", ""]);

// setting up game variables

let curSymbol = "X";
let color = {
    "X": "red",
    "O": "blue",
    "Tie": "grey"
};

let o = document.createElement("img");
o.src = "symbols/O.png";
let x = document.createElement("img");
x.src = "symbols/X.png";
o.style.width = "70px";
x.style.width = "70px";

let onePlayer = true;
let twoPlayer = false;

// game over message feature

let gameOverMessage = document.getElementById("over-message");
let newGameOverMessage = gameOverMessage.cloneNode(true);
let finalMessage = newGameOverMessage.children[0];

let gridContainer = document.getElementsByClassName("grid-container")[0];
let gameContainer = document.getElementById("game-container");

gameOverMessage.remove();

function messageSwitch(winner) {
    gridContainer.classList.add("fade-out");
    if (winner == "tie") {
        finalMessage.innerHTML = "Tie Game";
        curSymbol = "Tie";
    } else {
        finalMessage.innerHTML = `Player ${winner} Wins`;
    }
    newGameOverMessage.style.color = color[curSymbol];
    gameContainer.appendChild(newGameOverMessage);
    newGameOverMessage.classList.add("fade-in");
}

// single or multiplayer feature
let singlePlayerButton = document.getElementById("one-player-button");
let twoPlayerButton = document.getElementById("two-player-button");

singlePlayerButton.addEventListener('click', (event) => {
    restartGame();
    onePlayer = true;
    twoPlayer = false;
});
twoPlayerButton.addEventListener('click', (event) => {
    restartGame();
    onePlayer = false;
    twoPlayer = true;
});

// restart button feature

let restartButton = document.getElementById("restart");

restartButton.addEventListener('click', (event) => {
    restartGame();
  });

  function restartGame() {
    for (i = 0; i < ROW; i++) {
        for (j = 0; j < COL; j++) {
          curGame[i][j] = ""
          grid[i][j].innerHTML = "";
        }
      }
      curSymbol = "X";
      if (gridContainer.classList.contains('fade-out')) {
        gridContainer.classList.remove('fade-out');
        gameContainer.removeChild(newGameOverMessage);
      }
  }

// creating game logic

function gameLogic(row, col) {    
  horizontal = true;
  vertical = true;
  diagonal1 = true
  diagonal2 = true
  for (let i = 0; i < 3; i++) {
    if (curGame[row][i] != curSymbol) {
        horizontal = false
    }
    if (curGame[i][col] != curSymbol) {
        vertical = false
    }
    if (curGame[i][i] != curSymbol) {
        diagonal1 = false
    }
    if (curGame[2 - i][i] != curSymbol) {
        diagonal2 = false
    }
  }
  let tie = 0;
  for (let j = 0; j < ROW * COL; j++) {
    let r = Math.floor(j / 3);
    let c = j % 3;
    if (curGame[r][c] != "") {
        tie++;
    }
  }
  
  if (!horizontal && !vertical && !diagonal1 && !diagonal2 && tie == 9) {
    return "tie";
  } else if (horizontal || vertical || diagonal1 || diagonal2) {
    return curSymbol == "X" ? "1": "2";
  } else {
    return "continue"
  }
}


// creating player move interactions

function userClick(row, col) {
    let validClick = false;
    if (curGame[row][col] == "") {
        addMark(row, col);
        validClick = true;
        let gL = gameLogic(row, col);
        if (gL == "tie" || gL == "1" || gL == "2") {
            messageSwitch(gL);
            validClick = false;
        }
    }
    curSymbol = curSymbol == "X" ? "O": "X";
    if (twoPlayer && validClick) {
        let computerMove = easyMode();
        let r = computerMove[0];
        let c = computerMove[1];
        addMark(r, c);
        let gL = gameLogic(r, c);
        if (gL == "tie" || gL == "1" || gL == "2") {
            messageSwitch(gL);
            validClick = false;
        }
        curSymbol = curSymbol == "X" ? "O": "X";
    }
}

function addMark(row, col) {
    grid[row][col].appendChild(curSymbol == "X" ? x.cloneNode(true): o.cloneNode(true));
    curGame[row][col] = curSymbol;
}

// computer game logic

function easyMode() {
    let row = -1;
    let col = -1
    while (row == -1 && col == -1) {
        let r = Math.floor((Math.random() * 3));
        let c = Math.floor((Math.random() * 3));
        if (curGame[r][c] == "") {
            row = r;
            col = c;
        }
    }
    return [row, col];
}

