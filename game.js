var game = {};

game.players = {'1': {'piece':'_', 'data':{'team':'X'}}, '2': {'piece':'_', 'data':{'team':'O'}} }
game.board = [[' ', ' ', ' '],
              [' ', ' ', ' '],
              [' ', ' ', ' ']]; 

game.pieces = {
	' ':'empty'
};

console.log(game.pieces[' ']);
console.log(game.pieces[game.board[0][0]]);
