"use strict";

class Game {
	constructor(options) {
		this.setupPlayers();
		this.resetBoard();
		this.resetGame();
	}
	setupPlayers() {
		this.players = {};
	}
	resetBoard() {
		this.board = [];
	}

	onMoveComplete(req) {
		this.announceMove(req);
		this.evaluateResolution();
	}

	evaluateResolution() {
		//override
	}

	onKeyUp(key) {
	}

	onKeyDown(key) {

	}

	onMouseUp(x, y) {

	}

	onMouseDown(x, y) {

	}


}

class TicTacToe extends Game {
  setupPlayers() {
		super.setupPlayers();
		this.current_player = "X";
  }

  resetBoard() {
  	this.board =  [[' ', ' ', ' '],
	              [' ', ' ', ' '],
	              [' ', ' ', ' ']]; 
  }

  resetGame() {
  	this.setupPieces();
  }

  setupPieces() {
  	this.pieces = {
      ' ': function(board, piece, x, y, data) {
			  if (piece === 'X') {
				  board[y][x] = "X";
			  } else if (piece === "O") {
				  board[y][x] = "O";
			  }
		  },
		  'X': function(board, piece, x, y, data) {
			  board.error = 'X Occupied space' + x + "y" + y;
		  },
		  'O': function(board, piece, x, y, data) {
			  board.error = 'O Occupied space' + x + "y" + y;
		  }
    }
	};

	onMoveComplete(player) {
		super.onMoveComplete(player);
		this.cyclePlayers();
	}

	cyclePlayers() {
		if (this.current_player === "X") {
			this.current_player = "O";
		} else if (this.current_player === "O") {
			this.current_player = "X";
		}
	}

	permitPlayer(player) {
		if (player != this.current_player) {
			this.error = "Not your turn.";
		}

		if (!this.players[game.current_player]) {
			this.error = game.current_player + " has not joined yet.";
		}
	}

	permitMove(player, req) {
		var x = req.query.x;
		var y = req.query.y;

		if (x < 0 || y < 0 || x > this.board.length - 1 || y > this.board.length - 1) {
			this.error = "Placement out of bounds.";
		}
	}


	evaluateResolution() {
		var board = this.board;
		var winningAlignments = [
		 	[[0,0], [0,1], [0,2]],
		 	[[1,0], [1,1], [2,1]],
		 	[[2,0], [2,1], [2,2]],
		 	[[0,0], [1,1], [2,2]],
		 	[[2,0], [1,1], [0,2]],
		 	[[0,0], [1,0], [2,0]],
		 	[[0,1], [1,1], [2,1]],
			[[0,2], [1,2], [2,2]]];

		var i = 0;
		var j = 0;
		
		for (i = 0; i < winningAlignments.length; i++) {
			var alignment = winningAlignments[i];
			var xTiles = 0;
			var oTiles = 0;

			for (j = 0; j < alignment.length; j++) {
				var position = alignment[j];
				var tile = board[position[0]][position[1]];
				if (tile === "X") {
					xTiles++;
				} else if (tile === "O") {
					oTiles++;
				}
			}

			if (xTiles == 3) {
				this.winner = "X";
				break;
			} else if (oTiles == 3) {
				this.winner = "O";
				break;
			}
		}

		konsole.watch("winner",game.winner);
	}

	move(req) {
		if (this.error) {
			return game;
		}

		var player = req.query.player;
		
		this.permitPlayer(player);
		this.permitMove(player, req);


		if (this.error) {
			return this;
		}

		var x = req.query.x;
		var y = req.query.y;

		var piece = loadPiece(game, req);
		var targetPiece = this.board[y][x];
		var pieceFunction = this.pieces[targetPiece];
		pieceFunction(this.board, piece, x, y, null);
		if (this.board.error) {
			this.error = this.board.error;
			this.board.error = null;
		}

		if (this.error) {
			return this;
		} else {
			onMoveComplete(req);
		}

		return this;
	}

	loadPlayer(req) {
		return this.players[req.query.player].piece;
	}

	onMouseDown(x, y) {
		var x = Math.floor(x / 50);
    var y = Math.floor(y / 50);
    console.log("x" + x);
    console.log("y" + y);
	}

	onKeyDown(event) {
		console.log(event);
	}

}
