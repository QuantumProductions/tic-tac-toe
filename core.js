var logic = require('./logic.js');

var move = function(game, query) {
	var player = query.player;
	var x = query.x;
	var y = query.y;
	if (player != game.current_player) {
		console.log("Not your turn");
		return game;
	}
	var piece = game.players[player]; //loadPiece(game,query)
	var targetPiece = game.board[y][x];
	var pieceFunction = game.pieces[targetPiece];
	pieceFunction(game.board, piece, x, y, null);
	logic.evaluateResolution(game);
	if (game.board.error != null) {
		console.log(game.board.error)
		game.board.error = null;
	} else {
		logic.cyclePlayers(game);
	}

	return game;
}

module.exports = {
	"move": move
};