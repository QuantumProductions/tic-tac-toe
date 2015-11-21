class Game {
	constructor(options) {
		setupPlayers();
		setupBoard();
		setupPieces();
	}
	setupPlayers() {
		this.players = {};
	}
	setupBoard() {
		this.board = [];
	}
	setupPieces() {
		this.pieces = {};
	}

	completeTurn(player) {
		//override
	}

	evaluateResolution() {
		//override
	}
}

class TicTacToe(Game) {
  setupPlayers() {
		super.setupPlayers();
		this.current_player = "X";
  }

  setupBoard() {
  	this.board =  [[' ', ' ', ' '],
	              [' ', ' ', ' '],
	              [' ', ' ', ' ']]; 
  }

  setupPieces() {
  	this.pieces = ' ': function(board, piece, x, y, data) {
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
	};

	completeTurn(player) {
		if (this.current_player === "X") {
			this.current_player = "O";
		} else if (this.current_player === "O") {
			this.current_player = "X";
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

//		konsole.watch("winner",game.winner);
	}
}