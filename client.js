function processClick(game) {
	var x = Math.floor(cursor.x / client.render_distances['tile_size']);
	var y = Math.floor(cursor.y / client.render_distances['tile_size']);
	if (client.local == true) {
		game = client.processClick(game, x, y);
	 	return game;		
	} else {
	 	client.processClick(game, x, y);
	 	return game;
	}
	
	// }
	
}

function processMouseMove() {
	//;
}

function draw() {
	if (!game || !game.board) {
		console.log("no game or board");
		return;
	}

	var i = 0;
	var j = 0;
	
	for (i = 0; i < game.board.length; i++) {
		var row = game.board[i];
		for (j = 0; j < row.length; j++) {
			var piece = game.board[i][j];
			client.render_pieces[piece](game.board, j, i, null);
		}

	}

	client.render_status(game);

}