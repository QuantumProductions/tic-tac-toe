var logic = require('./logic.js');

var move = function(game, query) {
	if (game.error) {
		return game;
	}
	var player = query.player;
	var x = query.x;
	var y = query.y;
	if (player != game.current_player) {
		game.error = "Not your turn";
		return game;
	}
	var piece = game.players[player]; //loadPiece(game,query)
	var targetPiece = game.board[y][x];
	var pieceFunction = game.pieces[targetPiece];
	pieceFunction(game.board, piece, x, y, null);
	if (game.board.error) {
		game.error = game.board.error;
		game.board.error = null;
	}

	if (game.error) {
		return game;
	} else {
		logic.evaluateResolution(game);
		logic.cyclePlayers(game);
	}

	return game;
}

module.exports = {
	"move": move
};