var gamePieces = require("./index.js");
var Board = gamePieces.board;
var Game = gamePieces.game;
var readline = require("readline");

var reader = readline.createInterface(process.stdin, process.stdout, null);

var board = new Board();
var game = new Game(reader, board);
game.run(function () {
  reader.close();
});
