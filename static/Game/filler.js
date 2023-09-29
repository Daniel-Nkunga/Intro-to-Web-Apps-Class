function setup() {
    let board = document.getElementById("board");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell_${i}_${j}`;
            cell.addEventListener('click', () => {
                cell.classList.toggle("highlight");
            });
            board.appendChild(cell);
        }
    }
    randomize(); 
    repaint();
}

function randomize() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.getElementById(`cell_${i}_${j}`);
            const randomNumber = Math.floor(Math.random() * 6) + 1;
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

function floodFill(cell, newColor) {
    const queue = [cell];
    const visited = new Set();

    // Get the initial cell's original color
    const originalColor = cell.style.backgroundColor;

    while (queue.length > 0) {
        const currentCell = queue.shift();
        visited.add(currentCell);

        // Set the new color
        currentCell.style.backgroundColor = newColor;

        // Get adjacent cells
        const cellId = currentCell.id;
        const [i, j] = cellId.split('_').slice(1).map(Number);
        const neighbors = [
            document.getElementById(`cell_${i - 1}_${j}`),
            document.getElementById(`cell_${i + 1}_${j}`),
            document.getElementById(`cell_${i}_${j - 1}`),
            document.getElementById(`cell_${i}_${j + 1}`),
        ];

        for (const neighbor of neighbors) {
            if (neighbor && !visited.has(neighbor)) {
                const neighborColor = neighbor.style.backgroundColor;

                // Check if the neighbor has the same original color as the starting cell
                if (neighborColor === originalColor) {
                    queue.push(neighbor);
                }
            }
        }
    }
}

function click(cell) {
    const newColor = prompt("Enter the new color:"); // Prompt for the new color
    // const newColor = cellValue;
    if (newColor) {
        floodFill(document.getElementById('cell_0_0'), newColor);
        alertCell(cell);
    }
}