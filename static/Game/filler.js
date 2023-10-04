function setup() {
    let board = document.getElementById("board");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell_${i}_${j}`;
            // cell.addEventListener('click', () => {
            //     const clickedCell = document.getElementById(`cell_${i}_${j}`);
            //     highlight(clickedCell);
            // });
            board.appendChild(cell);
        }
    }

    // document.getElementById("botton1").addEventListener("click", floodFill(grid, 0, 0, 'cell_${i}_${j}', 1));

    const colorButtons = document.querySelectorAll('.button');
    colorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const color = button.getAttribute('data-color');
            const targetColorCell = document.getElementById('cell_0_0');
            const targetColor = parseInt(targetColorCell.textContent);
            floodFill(grid, 0, 0, targetColor, parseInt(color));
        });
    });
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

function repaint() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.getElementById(`cell_${i}_${j}`);
            const cellValue = parseInt(cell.textContent);
            let color;

            switch (cellValue) {
                case 1:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color1');
                    break;
                case 2:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color2');
                    break;
                case 3:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color3');
                    break;
                case 4:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color4');
                    break;
                case 5:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color5');
                    break;
                case 6:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color6');
                    break;
                case 0:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--color0');
                    break;
                default:
                    color = getComputedStyle(document.documentElement).getPropertyValue('--colorNone');
                    break;
            }
            cell.style.backgroundColor = color;
        }
    }
}

function highlight(cell) {
    const cellValue = parseInt(cell.textContent);
    if (cellValue !== 0) {
        cell.textContent = '0';
    }
    repaint();
}

function floodFill(matrix, x, y, targetColor, replacementColor) {
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length) {
      return;
    }
    if (matrix[x][y] !== targetColor) {
      return;
    }
    matrix[x][y] = replacementColor;
    floodFill(matrix, x + 1, y, targetColor, replacementColor); 
    floodFill(matrix, x - 1, y, targetColor, replacementColor); 
    floodFill(matrix, x, y + 1, targetColor, replacementColor); 
    floodFill(matrix, x, y - 1, targetColor, replacementColor); 
  }