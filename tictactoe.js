let cells = document.getElementsByClassName("cell");
let gameContainer = document.getElementById("game-container");
let board = document.getElementsByClassName("grid-container")[0];
let gameOverMessageTemp = document.getElementById("over-message");
let gameOverMessage = gameOverMessageTemp.cloneNode(true);
gameOverMessageTemp.remove();
let cur = "X"
let color = {
    "X": "red",
    "O": "blue"
};
let rows = 3, columns = 3;
let grid = []
for (let r = 0; r < rows; r++) {
    row = []
    for (let c = 0; c < columns; c++) {
        index = r * 3 + c;
        row.push(cells.item(index));
    }
    grid.push(row);
}
for (let i = 0; i < rows * columns; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    grid[row][col].addEventListener('click', (event) => addMark(row, col));
}
function addMark(row, col) {
    let selectedCell = grid[row][col];
    if (selectedCell.innerHTML == "") {
        selectedCell.innerHTML = cur;
        // selectedCell.innerHTML.style.color = color[cur];
        if (gameLogic(row, col)) {
            board.classList.add('gameOver');
            messageSwitch();
        }
        cur = (cur === "X") ? "O": "X";
    }
}

function gameLogic(row, col) {
    horizontal = checkRow(row); 
    vertical = checkCol(col);
    diagonal = checkDiagonal();
    return horizontal || vertical || diagonal;
}

function checkRow(row) {
    ret = true
    for (let i = 0; i < columns; i++) {
        if (grid[row][i].innerHTML != cur) {
            ret = false;
            break
        }
    }
    return ret
}

function checkCol(col) {
    ret = true
    for (let i = 0; i < rows; i++) {
        if (grid[i][col].innerHTML != cur) {
            ret = false;
            break
        }
    }
    return ret
}

function checkDiagonal() {
    dg1 = true
    dg2 = true
    for (let i = 0; i < 3; i++) {
        if (grid[i][i].innerHTML != cur) {
            dg1 = false;
        }
        if (grid[2 - i][i].innerHTML != cur) {
            dg2 = false;
        }
    }
    return dg1 || dg2;
}

function messageSwitch() {
    gameContainer.appendChild(gameOverMessage);
}