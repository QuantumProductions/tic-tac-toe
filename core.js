var game = {};

var move = function(player, x, y) {
	if (player != game.current_player) {
		console.log("Not your turn");
		return;
	}
	var piece = game.players[player];
	var targetPiece = game.board[y][x];
	var pieceFunction = game.pieces[targetPiece];
	pieceFunction(game.board, piece, x, y, null);
	evaluateResolution();
	if (game.board.error != null) {
		console.log(game.board.error)
	} else {
		cyclePlayers();
	}
}
