function setupClient(client) {
	client.base_url = "http://localhost:3000";

	installRendering(client);

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
	    	client.loadGames();
//	    	client.loadPlayersForGame(game);
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
			url = url + "/game/" + game.game_id + "/status";
			http.get({
		    url: url,
		    onload: function() { 
		    	game = JSON.parse(this.responseText);
 					client.players = game.players;
 					client.loadPlayersForGame(game);
 					//render call
 					var node = document.getElementById('turn');
 					node.innerText = game.current_player + "'s turn";

     //    	var players = Object.keys(game.players);
					// for (var i = 0; i < players.length; i++) {
		   //  		var player = game.players[players[i]];
		   //  		if (player.account.name === client.account.name) {
		   //  			client.player = player.piece;
		   //  		}
	    // 		}

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

	// client.findGame = function() {
 //    var node = document.getElementById('name');
 //    if (!node.value) {
 //    	alert("Enter player name.");
 //    } //sign in and get account data
 //    if (!client.account) {
 //    	client.account = {'name' : node.value };	
 //    } else {
 //    	client.account.name = node.value;
 //    }
    
 //    client.startNewGame();
	// }

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
		    	node = document.getElementById('new_game');
		    	node.style.visibility = 'visible';

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

		if (client.new_game_id) {
			game_id = client.new_game_id;
			client.new_game_id = null;
			client.game_index = client.account.game_ids.length - 1;
		}

		console.log("client.account.game_ids" + client.account.game_ids);
		if (client.game_index >= client.account.game_ids.length) {
			client.game_index = 0;
		}
		game.game_id = client.account.game_ids[client.game_index];
		console.log("Downloading game_id" + game.game_id);
		client.downloadGame();
		client.game_index++;

		if (client.shouldLoadGames) {
			client.loadGames();
			client.shouldLoadGames = false;
		}
	}

	return client;
}
