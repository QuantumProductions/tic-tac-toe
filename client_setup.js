function setupClient(client) {
	client.base_url = "http://localhost:3000";
	client.playLocal = false
	installRendering(client);

	client.playLocal = function() {
		client.local = true;
		game.players = {"X" : {"name" : "foo"}, "Y" : {"name" : "bar"}};
		game.players = {};
		game.players["X"] = {"account" : {"name" : "foo"}, "piece" : "X"};
		game.players["O"] = {"account" : {"name" : "bar"}, "piece" : "O"};
		console.log(game.players["X"]);
		game.current_player = "X";
		console.log(game.current_player);

		game = setupGame(game);
		game.players["X"] = {"account" : {"name" : "foo"}, "piece" : "X"};
		game.players["O"] = {"account" : {"name" : "bar"}, "piece" : "O"};


	}

	client.loadPlayersForGame = function(game) {
		var players = Object.keys(game.players);
	 	for (var i = 0; i < players.length; i++) {
  		var player = game.players[players[i]];
  		if (player.account.name === client.account.name) {
  			client.player = player.piece;
	    	}
	   }
	}

	client.findGame = function() {
		alert('client account name' + client.account.name);
		http.get({
	    url: "http://localhost:3000/game/play?name=" + client.account.name,
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	client.players = game.players;
	    	client.new_game_id = game.game_id;
	    }
		});
	}

	client.processClick = function(game, x, y) {
		if (client.playLocal) {
				req = {"query" : {"player" : game.current_player, "x" : x, "y" : y}};
				game = move(game, req);
				if (game.error) {
					alert(game.error);
				}
				game.error = null;
				if (game.winner) {
					alert("Winner: " + game.winner);
				}
				return game;
		}
		//server.move({game_id:})
		//server.move[0](game_id...)
		//server.move[1](game_id...)
		//server.move[client.offlineOrOnlineServerId](params);
		
		// console.log(game.board[0]);
		
		// return game;	

		var url = client.base_url;
		url = url + "/game/" + game.game_id;
		url = url + "/move?player=" + client.player + "&x=" + x + "&y=" + y;

		http.get({
	    url: url,
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	if (game.winner != undefined) {
	    		//assignWinner
	    	} else if (game.error) {
	    		alert("Error: " + game.error);
	    	} else {
					var node = document.getElementById('cycle');
		    	node.style.visibility = 'visible';	    		
	    	}
	    }
		});
	}

	client.downloadGame = function() {
		//load game, render
		if (game && game.game_id) {
			var url = client.base_url;
			url = url + "/game/load?game_id=" + game.game_id;
			http.get({
		    url: url,
		    onload: function() { 
		    	game = JSON.parse(this.responseText);
 					client.players = game.players;
 					client.loadPlayersForGame(game);
 					//render call
 					var node = document.getElementById('turn');
 					node.innerText = game.current_player + "'s turn";

					node = document.getElementById('game-id');
 					node.innerText = "Game ID " + game.game_id;

	    		//resolution call
		    	if (game.winner != undefined) {
		    		//show winner
		    	} else if (game.error) {
		    		alert("Error: " + game.error);
		    	}
		    }
			});
		}
	}

	client.register = function() {
		var node = document.getElementById('name');
    if (!node.value) {
    	alert("Enter player name.");
    	return;
    }
    client.name = node.value;
    var url = client.base_url + "/account/new?name=" + client.name;

    	http.get({
		    url: url,
		    onload: function() { 
		    	account = JSON.parse(this.responseText);
		    	client.account = account;
		    	console.log(client.account.name);
		    	console.log(client.account.id)
		    	client.loadGames();
		    }
			});
	}

	client.loadGames = function() { //stub for initial
		//stub for load games success, callback
		var node = document.getElementById('name');
    if (!node.value) {
    	alert("Enter player name.");
    } //sign in and get account data

    client.account = {'name' : node.value };

 		var url = client.base_url + "/account" + "/status?name=" + client.account.name; //use auth token
		console.log("my url is " + url);

		http.get({
		    url: url,
		    onload: function() {  //this function could be a callback
		    	client.account = JSON.parse(this.responseText);
		    	alert("Game Ids" + client.account.game_ids);

		    	var node = document.getElementById('register');
		    	node.style.visibility = 'hidden';
		    	
		    	if (client.account.game_ids.length === 0) {
		    		console.log("no games, finding game");
		    		client.findGame();
		    	} else {
		    		var game_id = client.account.game_ids[0];

		    		if (client.new_game_id) {
		    			game_id = client.new_game_id;
		    			client.new_game_id = null;
		    			client.game_index = client.account.game_ids.length - 1;
		    		}
		    		alert("Game_id" + game_id);
		    		game = {'board' : [], 'game_id' : game_id};
		    		client.game_index = 0;
		    		console.log("downloading game" + game.game_id);
		    		client.downloadGame();
		    	}
		    }
			});
	}

	client.cycleGame = function() {
		if (!client.account) {
			alert("Sign in.");
			return;
		}

		client.findGame();
		return;
	}

	return client;
}
