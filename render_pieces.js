game.render_distances = {};
game.render_distances["tile_size"] = 50;

var renderW = game.render_distances["tile_size"];

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