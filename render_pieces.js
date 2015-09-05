var renderW = 50;

game.render_pieces = {
		' ': function(board, x, y, data) {
			drawRect(x * renderW, y * renderW, renderW, renderW, "white");
		},
		'X': function(board, x, y, data) {
			drawRect(x * renderW, y * renderW, renderW, renderW, "blue");
		},
		'O': function(board, x, y, data) {
			drawRect(x * renderW, y * renderW, renderW, renderW, "green");
		},
	}