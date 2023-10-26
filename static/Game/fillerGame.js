const terminal = document.getElementById('terminal');
        const output = document.getElementById('output');
        const input = document.getElementById('input');

        let board = [];
        let game = -1;
        let boardSize = 10;
        let player1Start, player2Start;
        let prevColor, doublePrevColor;
        let currentPlayer = 1;

        function print(text) {
            output.textContent += text;
            terminal.scrollTop = terminal.scrollHeight;
        }

        function println(text) {
            print(text + '\n');
        }

        function randomizeBoard() {
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
            if (game === 0) {
                prevColor = board[0][0];
                doublePrevColor = board[boardSize - 1][boardSize - 1];
            } else if (game === 1) {
                prevColor = board[player1Start][player1Start];
                doublePrevColor = board[player2Start][player2Start];
            }
            println(printBoard());
        }

        function printBoard() {
            let boardString = '\n'; // Add '\n' here
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    boardString += board[i][j] + ' ';
                }
                boardString += '\n';
            }
            return boardString;
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

        function isGameOver() {
            const colorSet = new Set([0]);
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    colorSet.add(board[i][j]);
                }
            }
            return colorSet.size <= 3;
        }

        function winner() {
            const player1 = game === 0 ? board[0][0] : board[player1Start][player1Start];
            let player1Count = 0;
            const player2 = game === 0 ? board[boardSize - 1][boardSize - 1] : board[player2Start][player2Start];
            let player2Count = 0;
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    if (board[i][j] === player1) player1Count++;
                    if (board[i][j] === player2) player2Count++;
                }
            }
            if (player1Count > player2Count) {
                println(`Player 1: ${player1Count}`);
                println(`Player 2: ${player2Count}`);
                println('Player 1 Wins!');
            } else if (player2Count > player1Count) {
                println(`Player 1: ${player1Count}`);
                println(`Player 2: ${player2Count}`);
                println('Player 2 Wins!');
            } else {
                println(`Player 1: ${player1Count}`);
                println(`Player 2: ${player2Count}`);
                println("It's a tie");
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

        function playGame() {
            if (isGameOver()) {
                winner();
            } else {
                println(`Player ${currentPlayer} Turn`);
                print('Capture: ');
                input.value = '';
                input.focus();
            }
        }

        input.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                const inputValue = parseInt(input.value);
                if (!isNaN(inputValue)) {
                    if (isValid(inputValue)) {
                        if (game === 0) {
                            if (currentPlayer === 1) {
                                floodFill(0, 0, board[0][0], inputValue);
                            } else {
                                floodFill(boardSize - 1, boardSize - 1, board[boardSize - 1][boardSize - 1], inputValue);
                            }
                        } else if (game === 1) {
                            if (currentPlayer === 1) {
                                floodFill(player1Start, player1Start, board[player1Start][player1Start], inputValue);
                            } else {
                                floodFill(player2Start, player2Start, board[player2Start][player2Start], inputValue);
                            }
                        }
                        println(printBoard());
                        doublePrevColor = prevColor;
                        prevColor = inputValue;
                        currentPlayer = currentPlayer === 1 ? 2 : 1;
                    } else {
                        println('Invalid input. Try again.');
                    }
                } else {
                    println('Invalid input. Try again.');
                }
                playGame();
            }
        });

        function startGame(selectedGame) {
            game = selectedGame;
            if (game === 0) {
                player1Start = 0;
                player2Start = boardSize - 1;
            } else if (game === 1) {
                player1Start = Math.floor(boardSize / 2) - 1;
                player2Start = Math.floor(boardSize / 2);
            }

            println(`This is the ${game === 0 ? 'standard' : 'close quarters'} version of filler.`);
            println(`You start at the edges and conquer inwards.`);
            randomizeBoard();
            playGame();
        }

        startGame(0);