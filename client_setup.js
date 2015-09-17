function setupClient(client) {
	client.base_url = "http://localhost:3000";

	client.player = "X";

	client.startNewGame = function() {
		http.get({
	    url: "http://localhost:3000/game/play?name=xyz",
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	alert(game.board);
	    	installRendering(client);
	    }
		});
	}

	client.processClick = function(x, y) {
		//server.move({game_id:})
		//server.move[0](game_id...)
		//server.move[1](game_id...)
		//server.move[client.offlineOrOnlineServerId](params);
		var url = client.base_url;
		url = url + "/game/" + game.game_id;
		url = url + "/move?player=" + client.player + "&x=" + x + "&y=" + y;

		http.get({
	    url: url,
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	client.player = game.current_player;
	    	if (game.winner != undefined) {
	    		alert("Winner is " + game.winner);
	    	} else if (game.error) {
	    		alert("Error: " + game.error);
	    	}
	    }
		});
	}

	return client;
}
