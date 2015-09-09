function processClick() {
	console.log("X: " + cursor.x + "Y:" + cursor.y);
	var x = Math.floor(cursor.x / game.render_distances['tile_size']);
	var y = Math.floor(cursor.y / game.render_distances['tile_size']);
	console.log("X" + x + "Y" + y);

	move(game, game.current_player, x, y);
}

function processMouseMove() {
	//;
}

function draw() {
	var i = 0;
	var j = 0;

	for (i = 0; i < game.board.length; i++) {
		var row = game.board[i];
		for (j = 0; j < row.length; j++) {
			var piece = game.board[i][j];
			game.render_pieces[piece](game.board, j, i, null);
		}

	}

}