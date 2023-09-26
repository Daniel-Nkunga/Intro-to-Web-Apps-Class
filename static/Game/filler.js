function setup(){
    let board = document.getElementById("board");
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell_${i}_${j}`;
            cell.addEventListener('click', () => {
                cell.classList.toggle("highlight");
                // alertCell(cell);
            });
            board.appendChild(cell);
        }
    }
    randomize(); 
}

function randomize(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
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

function repaint(){
    
}