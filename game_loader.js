var roster = require("./roster.js");
var games = [];

findGame = function(req) {
	var game_id = parseInt(req.params.id);
	if (game_id <= games.length) {
		var game = games[game_id-1];
		game.error = null;
		return game;
	}

	return {'error' : 'Game not found'};
};

play = function(req) {
	account = roster.findAccount(req);
	if (account.error) {
		return {'error' : account.error };
	}

	for (var i = 0; i < games.length; i++) {
		var game = games[i];
		if (openToPlayer(game, account)) {
			game = enterPlayer(game, account);
			return game;
		}
	} 

	game = startGame(account);
	return game;
}

openToPlayer = function(game, account) {

}

startGame = function(game, account) {
	
}

module.exports = {
	"findGame": findGame
};