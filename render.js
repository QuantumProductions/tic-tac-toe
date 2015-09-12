function installRendering(client) {
	client.render_distances = {};
	client.render_distances["tile_size"] = 50;

	var renderW = client.render_distances["tile_size"];

	client.render_pieces = {
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
}

