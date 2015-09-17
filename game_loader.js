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

	// for (var i = 0; i < games.length; i++) {
	// 	game = games[i];
	// 	if (openToPlayer(game, account)) {
	// 		game = enterPlayer(game, account);
	// 		return game;
	// 	}
	// }

	game = startGame(game, account, req);
	console.log("board" + game.board);
	game = enterPlayer(game, account);
	return game;
}

var openToPlayer = function(game, account) {
	if (game.players.length < 2) {
		return true;
	}

	return false;
}

var startGame = function(game, account, req) {
	game = logic.setupGame(game, req);
	return game;
}

module.exports = {
	"findGame": findGame,
	"play" : play
};