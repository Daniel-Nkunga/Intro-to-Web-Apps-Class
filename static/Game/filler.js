function setup() {
    let board = document.getElementById("board");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell_${i}_${j}`;
            cell.addEventListener('click', () => {
                const startCell = document.getElementById(`cell_${i}_${j}`);
            });
            board.appendChild(cell);
        }
    }
    randomize();
    repaint();
}

function randomize() {
    const grid = [];
    for (let i = 0; i < 10; i++) {
        grid[i] = [];
        for (let j = 0; j < 10; j++) {
            const cell = document.getElementById(`cell_${i}_${j}`);
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 6) + 1;
            } while ((i > 0 && grid[i - 1][j] === randomNumber) || (j > 0 && grid[i][j - 1] === randomNumber) || (j > 0 && i > 0 && grid[i - 1][j - 1] === randomNumber));         
            grid[i][j] = randomNumber;
            cell.textContent = randomNumber;
        }
    }
}

function alertCell(cell) {
    const cellValue = cell.textContent;
    alert(`Cell value: ${cellValue}`);
}

function repaint() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.getElementById(`cell_${i}_${j}`);
            const cellValue = parseInt(cell.textContent);
            let color;
            switch (cellValue) {
                case 1:
                    color = "red";
                    break;
                case 2:
                    color = "orange";
                    break;
                case 3:
                    color = "yellow";
                    break;
                case 4:
                    color = "green";
                    break;
                case 5:
                    color = "blue";
                    break;
                case 6:
                    color = "purple";
                    break;
                default:
                    color = "white";
                    break;
            }
            cell.style.backgroundColor = color;
        }
    }
}