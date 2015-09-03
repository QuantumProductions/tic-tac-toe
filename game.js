var game = {};

game.players = {'1': {'piece':'x', 'data':{'team':'X'}}, '2': {'piece':'o', 'data':{'team':'O'}} }
game.board = [[' ', ' ', ' '],
              [' ', ' ', ' '],
              [' ', ' ', ' ']]; 

game.pieces = {
	' ': function(board, piece, x, y, data) {
		if (piece === 'x') {
			board[y][x] = "X";
		}
	}
};

console.log(game.board[0][0]);

game.pieces[game.board[0][0]](game.board, "x", 0, 0);

console.log(game.board[0][0]);