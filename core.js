var logic = require('./logic.js');

var move = function(game, req) {
	if (game.error) {
		return game;
	}
	var player = req.query.player;
	var x = req.query.x;
	var y = req.query.y;

	if (!game.players[game.current_player]) {
		console.log("game.current_player" + game.current_player);
		console.log(game.players);
		game.error = game.current_player + " has not joined yet.";
		return game;
	}

	if (player != game.current_player) {
		game.error = "Not your turn";
		return game;
	}
	//ensure within board bounds
	var piece = logic.loadPiece(game, req);
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
		logic.announceMove(game, req);
		logic.evaluateResolution(game);
		logic.cyclePlayers(game);
	}

	return game;
}

module.exports = {
	"move": move
};