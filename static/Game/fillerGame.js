const gridContainer = document.getElementById('grid-container');

function createGridItem(value) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item', `grid-item-${value}`);
    gridContainer.appendChild(gridItem);
}

const boardSize = 10;

let board = [];
let game = -1;
let player1Start, player2Start;

function printBoard() {
    let boardString = '\n';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            boardString += board[i][j] + ' ';
        }
        boardString += '\n';
    }
    return boardString;
}

function render() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            createGridItem(board[i][j]);
        }
    }
}

function startGame(selectedGame) {
    game = selectedGame;
    if (game === 0) {
        player1Start = 0;
        player2Start = boardSize - 1;
    } else if (game === 1) {
        player1Start = Math.floor(boardSize / 2) - 1;
        player2Start = Math.floor(boardSize / 2);
    }

    // Initialize the game board
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

    // Render the game board in the grid
    render();
}

startGame(0);  // Start the game
