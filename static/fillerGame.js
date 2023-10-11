let boardSize = 10;
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
          } while ((i > 0 && board[i - 1][j] === randomNumber) || (j > 0 && board[i][j - 1] === randomNumber) || (i > 0 && j > 0 && board[i - 1][j - 1] === randomNumber));

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
  if (board[row][col] !== targetColor) {
      return;
  }
  const stack = [{ row, col }];
  while (stack.length > 0) {
      const { row, col } = stack.pop();
      if (board[row][col] === targetColor) {
          board[row][col] = replacementColor;
          if (row > 0) {
              stack.push({ row: row - 1, col });
          }
          if (row < boardSize - 1) {
              stack.push({ row: row + 1, col });
          }
          if (col > 0) {
              stack.push({ row, col: col - 1 });
          }
          if (col < boardSize - 1) {
              stack.push({ row, col: col + 1 });
          }
      }
  }
}

function isGameOver(board) {
  const colorSet = new Set();
  colorSet.add(0);
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          if (!colorSet.has(board[i][j])) {
              colorSet.add(board[i][j]);
          }
      }
  }
  return colorSet.size <= 3;
}

function winner(board) {
  const player1 = board[0][0];
  let player1Count = 0;
  const player2 = board[board.length - 1][board.length - 1];
  let player2Count = 0;
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === player1) player1Count++;
          if (board[i][j] === player2) player2Count++;
      }
  }
  if (player1Count > player2Count) {
      console.log(`Player 1: ${player1Count}`);
      console.log(`Player 2: ${player2Count}`);
      console.log("Player 1 Wins!");
  } else if (player2Count > player1Count) {
      console.log(`Player 1: ${player1Count}`);
      console.log(`Player 2: ${player2Count}`);
      console.log("Player 2 Wins!");
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
  const board = new Array(boardSize).fill(0).map(() => new Array(boardSize).fill(0));
  randomize(board);
  let prevColor = board[0][0];
  let doublePrevColor = board[board.length - 1][board.length - 1];
  console.log(printBoard(board));

  function takeTurn() {
      const target = prompt("Capture: ");
      if (target == prevColor || target == doublePrevColor || !isValidS(board, target)) {
          takeTurn();
      } else {
          floodFill(board, 0, 0, board[0][0], target);
          console.log("\nPlayer 1 Turn");
          console.log(printBoard(board));
          doublePrevColor = prevColor;
          prevColor = target;

          const target2 = prompt("Capture: ");
          if (target2 == prevColor || target2 == doublePrevColor || !isValidS(board, target2)) {
              takeTurn();
          } else {
              floodFill(board, board.length - 1, board.length - 1, board[board.length - 1][board.length - 1], target2);
              console.log("\nPlayer 2 Turn");
              console.log(printBoard(board));
              doublePrevColor = prevColor;
              prevColor = target2;

              if (!isGameOver(board)) {
                  takeTurn();
              } else {
                  winner(board);
              }
          }
      }
  }

  takeTurn();
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
  const player2Start = Math.floor(boardSize / 2);
  const board = new Array(boardSize).fill(0).map(() => new Array(boardSize).fill(0));
  randomize(board);
  let prevColor = board[4][4];
  let doublePrevColor = board[5][5];
  console.log(printBoard(board));

  function takeTurn() {
      const target = prompt("Capture: ");
      if (target == prevColor || target == doublePrevColor || !isValidC(board, target)) {
          takeTurn();
      } else {
          floodFill(board, player1Start, player1Start, board[player1Start][player1Start], target);
          console.log("\nPlayer 1 Turn");
          console.log(printBoard(board));
          doublePrevColor = prevColor;
          prevColor = target;

          const target2 = prompt("Capture: ");
          if (target2 == prevColor || target2 == doublePrevColor || !isValidC(board, target2)) {
              takeTurn();
          } else {
              floodFill(board, player2Start, player2Start, board[player2Start][player2Start], target2);
              console.log("\nPlayer 2 Turn");
              console.log(printBoard(board));
              doublePrevColor = prevColor;
              prevColor = target2;

              if (!isGameOver(board)) {
                  takeTurn();
              } else {
                  winner(board);
              }
          }
      }
  }

  takeTurn();
}

console.log("Which gamemode would you like to play?");
console.log("Standard (0) or Close Quarters (1):");

const game = prompt("Enter the game mode (0 or 1):");
if (game == 0) {
  standard();
} else if (game == 1) {
  closeQuarters();
}
