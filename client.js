function processClick() {
	console.log("X: " + cursor.x + "Y:" + cursor.y);
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