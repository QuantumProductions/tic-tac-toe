var game = {};

game.players = {'1': {'piece':'x', 'data':{'team':'X'}}, '2': {'piece':'o', 'data':{'team':'O'}} }
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

var move = function(player, x, y) {
	var piece = game.players[player];
	var targetPiece = game.board[y][x];
	var pieceFunction = game.pieces[targetPiece];
	pieceFunction(game.board, piece, x, y, null);
	if (game.board.error != null) {
		console.log(game.board.error)
	} else {
		//cycle players
		console.log(game.board[0][0]);
		console.log(game.board[1][0]);
	}
}

move("X", 0, 0);
move("O", 0, 1);
