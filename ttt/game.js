function Game(reader, board) {
  this.reader = reader;
  this.board = board;
  this.currentMark = "x";
}

Game.prototype.otherMark = function (mark) {
  return (mark === "x") ? "o" : "x";
};

Game.prototype.getMove = function (completionCallback) {
  console.log("\033[2J\033[1;1H");
  this.board.display();
  console.log(this.currentMark + "'s turn");
  this.reader.question("Input row and column\n", function (userInput) {
    var inputs = userInput.split(",");
    var pos = [parseInt(inputs[0]), parseInt(inputs[1])];
    var waitTime = 0;
    if (this.board.posIsValid(pos)) {
      this.board.placeMark(pos, this.currentMark);
      this.currentMark = this.otherMark(this.currentMark);
    } else {
      console.log("Erroneous!");
      waitTime = 1250;
    }
    setTimeout(this.run.bind(this, completionCallback), waitTime);
  }.bind(this));
};

Game.prototype.run = function (completionCallback) {
  if (this.board.isOver()) {
    console.log("\033[2J\033[1;1H");
    this.board.display();
    if (this.board.winner()) {
      console.log(this.board.winner() + " won!");
    } else {
      console.log("Draw!");
    }
    completionCallback();
  } else {
    this.getMove(completionCallback);
  }
};

module.exports = Game;
