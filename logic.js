setupGame = function(game, query){
	game.current_player = "X";
	game.players = {'X':'X', 'O':'O'}
	game.board = [[' ', ' ', ' '],
	              [' ', ' ', ' '],
	              [' ', ' ', ' ']]; 

	game.pieces = {
		' ': function(board, piece, x, y, data) {
			if (piece === 'X') {
				board[y][x] = "X"; //data = query.data; moving piece: fboard[data][y][data][x] = ""
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

	return game;
}

var cyclePlayers = function(game) {
		if (game.current_player === "X") {
			game.current_player = "O";
		} else if (game.current_player === "O") {
			game.current_player = "X";
		}
}

var evaluateResolution = function(game) {
	var board = game.board;
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
			game.winner = "X";
			break;
		} else if (oTiles == 3) {
			game.winner = "O";
			break;
		}
	}
 
 	console.log("winner: " + game.winner);
}

module.exports = {
	"setupGame": setupGame,
	"cyclePlayers": cyclePlayers,
	"evaluateResolution": evaluateResolution,
};