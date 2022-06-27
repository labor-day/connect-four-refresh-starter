const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("return", "place piece", ConnectFour.place.bind(this));
    Screen.addCommand("up", "move up", ConnectFour.moveUp.bind(this));
    Screen.addCommand("down", "move down", ConnectFour.moveDown.bind(this));
    Screen.addCommand("left", "move left", ConnectFour.moveLeft.bind(this));
    Screen.addCommand("right", "move right", ConnectFour.moveRight.bind(this));

    this.cursor.setBackgroundColor();
    Screen.message = `It is ${this.playerTurn}'s turn`;
    Screen.render();
  }

  // Remove this
  static place() {

    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {

      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);


      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else {this.playerTurn = "O"}

      Screen.message = `It is ${this.playerTurn}'s turn`;
      Screen.setBackgroundColor(this.cursor.row, this.cursor.col, "green");

      if (ConnectFour.checkWin(Screen.grid)) {
         ConnectFour.endGame(ConnectFour.checkWin(Screen.grid));
      }

    } else {

      Screen.message = Screen.message = `Invalid move: It is ${this.playerTurn}'s turn`;
      Screen.setBackgroundColor(this.cursor.row, this.cursor.col, "red");
    }



  }

  static moveUp() {
    this.cursor.up();
  }
  static moveDown() {
    this.cursor.down();
  }
  static moveLeft() {
    this.cursor.left();
  }
  static moveRight() {
    this.cursor.right();
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    let winner = false;

    //empty
    let empty = true;
    grid.forEach(
      row => row.forEach(
        cell => {
          if (cell !== " ") {empty = false}
        }
      )
    );
    if (empty) {return winner}

    //horizontal
    grid.forEach(
      row => {
        if (rowCheck(row)) {
          winner = rowCheck(row)}
      }
    );

    if (winner) {return winner};

    //vertical
    winner = colCheck(grid);
    if (winner) {return winner};

    //diagDown
    winner = diagDownCheck(grid);
    if (winner) {return winner};

    //diagUp
    winner = diagUpCheck(grid);
    if (winner) {return winner};

    //tie
    if (checkGridFull(grid)) {
      return "T"
    } else {return winner}


  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

let rowCheck = function(row) {
  for (let i = 0; i < row.length - 3; i++) {
    if (row[i] !== " "
    && row[i] === row[i+1]
    && row[i] === row[i+2]
    && row[i] === row[i+3]) {
      return row[i];
    }
  }
  return false;
}

let colCheck = function(grid) {
  let winner = false;
  for (let i = 0; i < grid[0].length; i++) {
    let col = grid[0][i];
    for (let j = 0; j < grid.length -3; j++) {
      let cell = grid[j][i];
      if (cell !== " "
      && cell === grid[j+1][i]
      && cell === grid[j+2][i]
      && cell === grid[j+3][i]) {
        winner = cell;
      }
    }
  }
  return winner;
}

let diagDownCheck = function(grid) {
  let winner = false;
  for (let i = 0; i < grid.length - 3; i++) {
    for (let j = 0; j < grid[i].length -3; j++) {
      let cell = grid[i][j];
      if (cell !== " "
      && cell === grid[i+1][j+1]
      && cell === grid[i+2][j+2]
      && cell === grid[i+3][j+3]) {
        winner = cell;
      }
    }
  }
  return winner;
}

let diagUpCheck = function(grid) {
  let winner = false;
  for (let i = grid.length - 1; i > 2; i--) {
    for (let j = 0; j < grid[i].length -3; j++) {
      let cell = grid[i][j];
      if (cell !== " "
      && cell === grid[i-1][j+1]
      && cell === grid[i-2][j+2]
      && cell === grid[i-3][j+3]) {
        winner = cell;
      }
    }
  }
  return winner;
}

let checkGridFull = function(grid) {
  let full = true;
  grid.forEach(
    row => {
      if (!checkRowFull(row)) {
        full = false;
      }
    }
  );

  return full;
}

let checkRowFull = function(row) {
  return row.every(
    cell => cell !== " "
    );
}

let grid1 = [
['X','O','X',' ','X','X','X'],
['X','O','X','O','X','O','X'],
['O','X','O','X','O','X','O'],
['O','X','O','X','O','X','O'],
['O','X','O','X','O','X','O'],
['X','O','X','O','X','O','X']
];

console.log(checkGridFull(grid1));

module.exports = ConnectFour;
