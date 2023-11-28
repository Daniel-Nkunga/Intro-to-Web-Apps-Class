const gridContainer = document.getElementById('grid-container');
const outputDiv = document.getElementById('output');

function createGridItem(value, row, col) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item', `grid-item-${value}`);
    gridContainer.appendChild(gridItem);

    gridItem.addEventListener('click', () => {
        handleCellClick(row, col);
    });
}

const boardSize = 10;

let board = [];
let game = -1;
let player1Start, player2Start;
let currentPlayer = 0;

function print(text) {
    outputDiv.innerText = text;
}

function render() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            createGridItem(board[i][j], i, j);
        }
    }
}

function startGame(selectedGame) {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 6) + 1;
            } while (
                (i > 0 && board[i - 1][j] === randomNumber) ||
                (j > 0 && board[i][j - 1] === randomNumber) ||
                (i > 0 && j > 0 && board[i - 1][j - 1] === randomNumber)
            );

            board[i][j] = randomNumber;
        }
    }
    game = selectedGame;
    if (game === 0) {
        player1Start = 0;
        player2Start = boardSize - 1;
    } else if (game === 1) {
        player1Start = Math.floor(boardSize / 2) - 1;
        player2Start = Math.floor(boardSize / 2);
    } else if (game === 2){
        player1Start = 0;
        player2Start = boardSize - 1;
        addBlocks();
    }
    render();
}

function addBlocks(){
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let randomNum = Math.floor(Math.random() * 4);
            if(randomNum == 0 && (i != 0 && j != 0) && (i != boardSize-1 && j != boardSize-1)){
                board[i][j] = 0;
            }
        }
    }

}

function isValid(target) {
    if (target < 1 || target > 6) {
        return false;
    }
    if (game === 0) {
        if (target === board[0][0] || target === board[boardSize - 1][boardSize - 1]) {
            return false;
        }
    } else if (game === 1) {
        if (target === board[player1Start][player1Start] || target === board[player2Start][player2Start]) {
            return false;
        }
    }
    return true;
}

function floodFill(row, col, targetColor, replacementColor) {
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
        return;
    }
    if (board[row][col] !== targetColor) {
        return;
    }
    board[row][col] = replacementColor;
    floodFill(row - 1, col, targetColor, replacementColor);
    floodFill(row + 1, col, targetColor, replacementColor);
    floodFill(row, col - 1, targetColor, replacementColor);
    floodFill(row, col + 1, targetColor, replacementColor);
}

function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 0;
    } else {
        currentPlayer = 1;
    }
}

function checkWin() {
    const uniqueColors = new Set();
    uniqueColors.add(0);
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            uniqueColors.add(board[i][j]);
        }
    }
    if (uniqueColors.size > 3) {
        return false;
    } else {
        let player1Count = board[player1Start][player1Start];
        let player2Count = board[player2Start][player2Start];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] == board[player1Start][player1Start]) {
                    player1Count++;
                } else if (board[i][j] == board[player2Start][player2Start]) {
                    player2Count++;
                } else {
                    console.log();
                }
            }
        }
        if (player1Count > player2Count) {
            // alert(`Player 1: ${player1Count} Player 2: ${player2Count}\nPlayer 1 Wins!`);
            print(`Player 1: ${player1Count} Player 2: ${player2Count}\nPlayer 1 Wins!`);
        } else if (player1Count < player2Count) {
            // alert(`Player 1: ${player1Count} Player 2: ${player2Count}\nPlayer 2 Wins!`);
            print(`Player 1: ${player1Count} Player 2: ${player2Count}\nPlayer 2 Wins!`);
        } else {
            // alert(`Player 1: ${player1Count} Player 2: ${player2Count}\nIt's a tie!`);
            print(`Player 1: ${player1Count} Player 2: ${player2Count}\nIt's a tie!`);
        }
        return true;
    }
}

function handleCellClick(row, col) {
    const targetColor = board[row][col];
    if (isValid(targetColor)) {
        if (currentPlayer === 0) {
            floodFill(player1Start, player1Start, board[player1Start][player1Start], targetColor);
        } else {
            floodFill(player2Start, player2Start, board[player2Start][player2Start], targetColor);
        }
        render();
        switchPlayer();
        if (checkWin()) {
        }
    }
}

startGame(0);
