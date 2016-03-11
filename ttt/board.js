function Board() {
  this.grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
}

Board.prototype.transpose = function (array) {
  var transposed = [];
  for (var i = 0; i < array[0].length; i++) {
    var row = [];
    for (var j = 0; j < array.length; j++) {
      row.push(array[j][i]);
    }
    transposed.push(row);
  }
  return transposed;
};

Board.prototype.triples = function () {
  var rows = this.grid;
  var cols = this.transpose(this.grid);
  var left_diag = [[this.grid[0][0],
                   this.grid[1][1],
                   this.grid[2][2]]];
  var right_diag = [[this.grid[2][0],
                    this.grid[1][1],
                    this.grid[0][2]]];
  return rows.concat(cols, left_diag, right_diag);
};

Board.prototype.winner = function () {
  var triples = this.triples();
  for (var i = 0; i < triples.length; i++) {
    var first_mark = triples[i][0];
    if (first_mark !== "0") {
      var all_same = true;
      for (var j = 1; j < triples[i].length; j++) {
        if (triples[i][j] !== first_mark) {
          all_same = false;
        }
      }
      if (all_same) {
        return first_mark;
      }
    }
  }
};

Board.prototype.isFull = function () {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[0].length; j++) {
      if (this.grid[i][j] === "0") {
        return false;
      }
    }
  }
  return true;
};

Board.prototype.isOver = function () {
  return (this.winner() || this.isFull());
};

Board.prototype.posIsValid = function (pos) {
  if ([0, 1, 2].indexOf(pos[0]) === -1 ||
      [0, 1, 2].indexOf(pos[1]) === -1) {
        return false;
  }
  return this.grid[pos[0]][pos[1]] === "0";
};

Board.prototype.placeMark = function (pos, mark) {
  this.grid[pos[0]][pos[1]] = mark;
};

Board.prototype.display = function () {
  console.log("-------------");
  for (var i = 0; i < this.grid.length; i++) {
    console.log(this.rowString(this.grid[i]));
    console.log("-------------");
  }
  console.log("\n");
};

Board.prototype.rowString = function (row) {
  var stringRow = [];
  for (var i = 0; i < row.length; i++) {
    if (row[i] === "0") {
      stringRow[i] = " ";
    } else {
      stringRow[i] = row[i];
    }
  }
  return "| " + stringRow[0] + " | " + stringRow[1] + " | " + stringRow[2] + " |";
};

module.exports = Board;
