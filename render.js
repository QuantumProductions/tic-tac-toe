

function installRendering(client) {
	client.render_distances = {};
	client.render_distances["tile_size"] = 50;

	var renderW = client.render_distances["tile_size"];

//override
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
//override
	client.render_status = function(game) {

		if (game.players.X) {
			var node = document.getElementById('player-x');
			node.innerText = "X: " + game.players.X.account.name;
		}

		if (game.players.O) {
			var node = document.getElementById('player-o');
			node.innerText = "O: " + game.players.O.account.name;
		}
	}
}

