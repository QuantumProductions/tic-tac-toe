var setupGame = function(){
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

}

cyclePlayers = function() {
		if (game.current_player === "X") {
			game.current_player = "O";
		} else if (game.current_player === "Y") {
			game.current_player = "X";
		}
}