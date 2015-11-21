function setupClient(client) {
	client.base_url = "http://localhost:3000";
	client.local = false
	installRendering(client);

  //custom function -- custom_client_setup?
	client.playLocal = function() {
		client.local = true;
		//setup local play (custom game function)
		game.players = {};
		game.players["X"] = {"account" : {"name" : "foo"}, "piece" : "X"};
		game.players["O"] = {"account" : {"name" : "bar"}, "piece" : "O"};
		console.log(game.players["X"]);
		game.current_player = "X";
		console.log(game.current_player);

		game = setupGame(game);
		game.players["X"] = {"account" : {"name" : "foo"}, "piece" : "X"};
		game.players["O"] = {"account" : {"name" : "bar"}, "piece" : "O"};
		console.log("LOCAL current player" + game.current_player);
	}

  //custom parsing on account matching for local data
	client.loadPlayersForGame = function(game) {
		var players = Object.keys(game.players);
	 	for (var i = 0; i < players.length; i++) {
  		var player = game.players[players[i]];
  		if (player.account.name === client.account.name) {
  			client.player = player.piece;
	    	}
	   }
	}

	//standard, overridable callback
	client.findGame = function() {
		alert('client account name' + client.account.name);
		client.local = false;
		http.get({
	    url: "http://localhost:3000/game/play?name=" + client.account.name,
	    onload: function() { //extract to standard overridable callback
	    	game = JSON.parse(this.responseText);
	    	client.players = game.players;
	    	client.new_game_id = game.game_id;
	    }
		});
	}

	//standardize function, custom req input params
	client.processClick = function(game, x, y, callback) {
		console.log("local" + game.current_player + "" + client.local);
		if (client.local == true) { //extract to evaluate resolution || update?
				req = {"query" : {"player" : game.current_player, "x" : x, "y" : y}};
				game = move(game, req);
				if (game.error) {
					alert(game.error);
				}
				game.error = null;
				if (game.winner) {
					alert("Winner: " + game.winner);
				}
				callback(game);
				return;
		}
		//server.move({game_id:})
		//server.move[0](game_id...)
		//server.move[1](game_id...)
		//server.move[client.offlineOrOnlineServerId](params);
		
		// console.log(game.board[0]);
		
		// return game;	
		console.log("callback" + callback);
		var url = client.base_url;
		url = url + "/game/" + game.game_id;
		url = url + "/move?player=" + client.player + "&x=" + x + "&y=" + y; //extract as input_params
		//server.move[client.offlineOrOnlineServerId](input_params);
		http.get({
	    url: url,
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	if (game.winner != undefined) {
	    		//assignWinner
	    		if (game.winner) {
					alert("Winner: " + game.winner);
					}
	    	} else if (game.error) {
	    		alert("Error: " + game.error);
	    	} else {
					var node = document.getElementById('cycle');
		    	node.style.visibility = 'visible';	    		
	    	}
	    	console.log("real callback" + callback);
	    	callback(game);
	    	return;
//	    	return game;
	    }
		});
	}

  //standard function, extract render call
  //this is download current Game == continuously update the active game
	client.downloadGame = function() {
		//server.loadCurrentGame()
		//load game, render

		if (client.local == true) {
			return;
		}
		if (game && game.game_id) {
			var url = client.base_url;
			url = url + "/game/load?game_id=" + game.game_id;
			http.get({
		    url: url,
		    onload: function() { 
		    	game = JSON.parse(this.responseText);
 					client.players = game.players;
 					client.loadPlayersForGame(game);
 					//render call out for player text display
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


	client.login = function() {
		var node = document.getElementById('name');
    if (!node.value) {
    	alert("Enter player name.");
    	return;
    }

    //params overridable
    client.name = node.value;
    client.account = {"name" : node.value}
    client.findGame();
	}

  //overridable requirements
  //overridable params
	client.register = function() {
		//overridable requirements
		var node = document.getElementById('name');
    if (!node.value) {
    	alert("Enter player name.");
    	return;
    }

    //params overridable
    client.name = node.value;
    var url = client.base_url + "/account/new?name=" + client.name;

    	http.get({
		    url: url,
		    onload: function() { 
		    	account = JSON.parse(this.responseText);
		    	client.account = account;
		    	client.findGame();
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
