var roster = require('./roster.js');
var logic = require('./logic.js');
var games = [];

var findGame = function(req) {
	var game_id = parseInt(req.params.id);
	// console.log("game id" + game_id);
	// console.log("games" + games);
	if (game_id <= games.length) {
		var game = games[game_id-1];
		game.error = null;
		return game;
	}

	return {'error' : 'Game not found'};
};

var play = function(req) {
	account = roster.findAccount(req);
	if (account.error) {
		return {'error' : account.error };
	}

	var game = {};

	for (var i = 0; i < games.length; i++) {
		game = games[i];
		if (openToPlayer(game, account)) {
			game = enterPlayer(game, account);
			return game;
		}
	}

	game = {};
	game = startGame(game, account, req);
	var gamePlayers = Object.keys(game.players);
	console.log("game started, players: " + gamePlayers.length);
	game.game_id = games.length + 1;
	game = enterPlayer(game, account);
	console.log("game id: " + game.game_id);
	linkGameToAccount(game, account);
	console.log("account games_ids" + account.game_ids);
	games.push(game);

	return game;
}

var linkGameToAccount = function(game, account) {
	if (!account.game_ids) {
		account.game_ids = [];
	}

	account.game_ids.push(game.game_id);
}

var openToPlayer = function(game, account) {
	//extract to logic
	var playerKeys = Object.keys(game.players);
	console.log("player keys" + playerKeys + "" + playerKeys.length);
	if (playerKeys.length < 2) {
		for (var i = 0; i < playerKeys.length; i++) {
			var player = game.players[playerKeys[i]];
			console.log('player.account.name' + player.account.name);
			console.log('account.name' + account.name);
			if (player.account.name === account.name) {
				return false;
			}
		}

		console.log('game ' + game.game_id + 'open to player ' + account.name);
		return true;
	}

	return false;
}

var enterPlayer = function(game, account) {
	console.log(account.name + "entering game" + game.game_id);
	if (game.players['X']) {
		game.players['O'] = {'account' : account, 'piece' : 'O'};
		console.log('game.players.O' + game.players['O']);
	} else {
		game.players['X'] = {'account' : account, 'piece' : 'X'};
		console.log('game.players.X' + game.players['X']);
	}
	return game;
}

var startGame = function(game, account, req) {
	game = logic.setupGame(game, req);
	return game;
}

module.exports = {
	"findGame": findGame,
	"play" : play
};