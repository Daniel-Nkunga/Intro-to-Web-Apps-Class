const rows = 10;
const columns = 10;
const twoDArray = [];

function creation(){
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          row.push(0); 
        }
        twoDArray.push(row);
      }
      randomize();
}

function randomize(){
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            do {
                randomNumber = Math.floor(Math.random() * 6) + 1;
            } while ((i > 0 && grid[i - 1][j] === randomNumber) || (j > 0 && grid[i][j - 1] === randomNumber) || (j > 0 && i > 0 && grid[i - 1][j - 1] === randomNumber));
            grid[i][j] = randomNumber; 
        }
        twoDArray.push(row);
      }
}

creation();
console.log(twoDArray);