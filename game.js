var game = {};

game.players = {'1': {'piece':'_', 'data':{'team':'X'}}, '2': {'piece':'_', 'data':{'team':'O'}} }
game.board = [[' ', ' ', ' '],
              [' ', ' ', ' '],
              [' ', ' ', ' ']]; 

game.pieces = {
	' ': function(board, piece, x, y) {
		console.log('x' + x);
		console.log('y' + y);
	}
};

game.pieces[game.board[0][0]](game.board, null, 3, 5);

