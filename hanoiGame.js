var readline = require("readline");
var reader = readline.createInterface(process.stdin, process.stdout, null);

function HanoiGame() {
  this.stacks = [[3, 2, 1], [], []];
  this.winSize = this.stacks[0].length;
}

HanoiGame.prototype.promptMove = function () {
  this.print();
  reader.question("Select start tower:\n", function (startTowerIdx) {
    reader.question("Select end tower:\n", function (endTowerIdx) {
      startTowerIdx = parseInt(startTowerIdx);
      endTowerIdx = parseInt(endTowerIdx);
      var didMove = this.move(startTowerIdx, endTowerIdx);

      if (!didMove) {
        console.log("Erroneous!");
      }

      this.run();

    }.bind(this));
  }.bind(this));
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  if ([0, 1, 2].indexOf(startTowerIdx) === -1 ||
      [0, 1, 2].indexOf(endTowerIdx) === -1) {
    return false;
  } else if (this.stacks[startTowerIdx].length === 0) {
    return false;
  } else if (this.stacks[endTowerIdx].length === 0) {
    return true;
  } else if (this.stacks[startTowerIdx][this.stacks[startTowerIdx].length - 1] >
             this.stacks[endTowerIdx][this.stacks[endTowerIdx].length - 1]) {
    return false;
  } else {
    return true;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    var disc = this.stacks[startTowerIdx].pop();
    this.stacks[endTowerIdx].push(disc);
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.isWon = function () {
  if (this.stacks[1].length === this.winSize ||
      this.stacks[2].length === this.winSize) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.run = function (completionCallback) {
  if (completionCallback) {
    this.completionCallback = completionCallback;
  }
  if (this.isWon()) {
    console.log("Winner!");
    this.completionCallback();
  } else {
    this.promptMove();
  }
};

testGame = new HanoiGame();
testGame.run(function () {
  reader.close();
});
