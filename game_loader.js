var roster = require('./roster.js');
var logic = require('./logic.js');
var games = [];

var findGame = function(req) {
	var game_id = parseInt(req.params.id);
	console.log("game id" + game_id);
	console.log("games" + games);
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

	game = startGame(game, account, req);
	game = enterPlayer(game, account);
	game.game_id = games.length + 1;
	games.push(game);

	return game;
}

var openToPlayer = function(game, account) {
	if (Object.keys(game.dictionary).length) {
		return true;
	}

	return false;
}

var enterPlayer = function(game, account) {
	if (game.players['X']) {
		game.players['O'] = {'account_name' : account.name, 'account_id' : account.id, 'piece' : 'O'};
	} else {
		game.players['X'] = {'account_name' : account.name, 'account_id' : account.id, 'piece' : 'X'};
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