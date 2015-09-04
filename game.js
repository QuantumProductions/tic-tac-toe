var game = {};

game.current_player = "X";
game.players = {'X':'X', 'O':'O'}
game.board = [[' ', ' ', ' '],
              [' ', ' ', ' '],
              [' ', ' ', ' ']]; 

game.pieces = {
	' ': function(board, piece, x, y, data) {
		if (piece === 'X') {
			board[y][x] = "X";
		} else if (piece === "O") {
			board[y][x] = "O";
		}
	},
	'X': function(board, piece, x, y, data) {
		board.error = 'Occupied space';
	},
	'O': function(board, piece, x, y, data) {
		board.error = 'Occupied space';
	}
};

var cyclePlayers = function() {
		if (game.current_player === "X") {
			game.current_player = "O";
		} else if (game.current_player === "Y") {
			game.current_player = "X";
		}
}

var move = function(player, x, y) {
	if (player != game.current_player) {
		console.log("Not your turn");
		return;
	}
	var piece = game.players[player];
	var targetPiece = game.board[y][x];
	var pieceFunction = game.pieces[targetPiece];
	pieceFunction(game.board, piece, x, y, null);
	if (game.board.error != null) {
		console.log(game.board.error)
	} else {
		cyclePlayers();
	}
}

move("X", 0, 0);
move("O", 1, 0);

console.log(game.board[0][0]);
console.log(game.board[0][1]);
console.log(game.board[1][0]);
console.log(game.board[1][1]);
