function printBoard(board) {
  let boardString = '';
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          boardString += board[i][j] + ' ';
      }
      boardString += '\n';
  }
  return boardString;
}

function randomize(board) {
  const rows = board.length;
  const columns = board[0].length;
  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
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
  if (board[0][0] === board[board.length - 1][board.length - 1]) {
      if (board[0][0] < 6) {
          board[0][0]++;
      } else {
          board[0][0]--;
      }
  }
}

function floodFill(board, row, col, targetColor, replacementColor) {
  const rows = board.length;
  const columns = board[0].length;
  if (row < 0 || row >= rows || col < 0 || col >= columns) {
      return;
  }
  if (board[row][col] !== targetColor) {
      return;
  }
  board[row][col] = replacementColor;
  floodFill(board, row - 1, col, targetColor, replacementColor);
  floodFill(board, row + 1, col, targetColor, replacementColor);
  floodFill(board, row, col - 1, targetColor, replacementColor);
  floodFill(board, row, col + 1, targetColor, replacementColor);
}

function contains(array, target) {
  return array.includes(target);
}

function isGameOver(board) {
  const colorList = [0];
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          if (!contains(colorList, board[i][j])) {
              colorList.push(board[i][j]);
          }
      }
  }
  return colorList.length > 3 ? false : true;
}

function winner(board) {
  const player1 = board[0][0];
  let palyer1Count = 0;
  const player2 = board[board.length - 1][board.length - 1];
  let palyer2Count = 0;
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === player1) palyer1Count++;
          if (board[i][j] === player2) palyer2Count++;
      }
  }
  if (palyer1Count > palyer2Count) {
      console.log(`Player 1: ${palyer1Count}`);
      console.log(`Player 2: ${palyer2Count}`);
      console.log('Player 1 Wins!');
  } else if (palyer2Count > palyer1Count) {
      console.log(`Player 1: ${palyer1Count}`);
      console.log(`Player 2: ${palyer2Count}`);
      console.log('Player 2 Wins!');
  } else {
      console.log("It's a tie");
  }
}

function isValidS(board, target) {
  if (target < 1) {
      return false;
  } else if (target > 6) {
      return false;
  } else if (target === board[0][0]) {
      return false;
  } else if (target === board[board.length - 1][board.length - 1]) {
      return false;
  } else {
      return true;
  }
}

function standard() {
  console.log("This is the standard version of filler. You start at the edges and conquer inwards.");
  const boardSize = 10;
  const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(0));
  randomize(board);
  let prevColor = board[0][0];
  let doublePrevColor = board[board.length - 1][board.length - 1];
  console.log(printBoard(board));
  const readline = require('readline');
  const scan = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  
  const playTurn = () => {
      scan.question('Capture: ', (target) => {
          if (target == prevColor || target == doublePrevColor || isValidS(board, target) == false) {
              console.log('Invalid move. Try again.');
              playTurn();
          } else {
              floodFill(board, 0, 0, board[0][0], target);
              console.log('\nPlayer 1 Turn');
              console.log(printBoard(board));
              doublePrevColor = prevColor;
              prevColor = target;
              playTurn();
          }
      });
  }
  
  playTurn();
}

function isValidC(board, target) {
  if (target < 1) {
      return false;
  } else if (target > 6) {
      return false;
  } else if (target === board[4][4]) {
      return false;
  } else if (target === board[5][5]) {
      return false;
  } else {
      return true;
  }
}

function closeQuarters() {
  console.log("In this version of filler, you start in the middle of the board and take over moving outwards.");
  const boardSize = 10;
  const player1Start = Math.floor(boardSize / 2) - 1;
  const player2start = Math.floor(boardSize / 2);
  const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(0));
  randomize(board);
  let prevColor = board[4][4];
  let doublePrevColor = board[5][5];
  console.log(printBoard(board));
  const readline = require('readline');
  const scan = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  
  const playTurn = () => {
      scan.question('Capture: ', (target) => {
          if (target == prevColor || target == doublePrevColor || isValidC(board, target) == false) {
              console.log('Invalid move. Try again.');
              playTurn();
          } else {
              floodFill(board, player1Start, player1Start, board[player1Start][player1Start], target);
              console.log('\nPlayer 1 Turn');
              console.log(printBoard(board));
              doublePrevColor = prevColor;
              prevColor = target;
              playTurn();
          }
      });
  }
  
  playTurn();
}

console.log('Which gamemode would you like to play?');
console.log('Standard (0) or Close Quarters (1):');
const readline = require('readline');
const scan = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

scan.question('Enter the game mode (0 or 1): ', (game) => {
  if (game == 0) {
      standard();
  } else if (game == 1) {
      closeQuarters();
  } else {
      console.log('Invalid game mode. Please enter 0 for Standard or 1 for Close Quarters.');
  }
});