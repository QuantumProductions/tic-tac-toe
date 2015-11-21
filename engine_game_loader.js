class GameLoader {
	constructor() {
		this.games = this.storedGames() || [];
	}

	findGame(req) {
		var game_id = parseInt(req.query.game_id) || req.params.game_id;

		if (game_id <= games.length) {
			var game = this.findGameWithGameId(game_id);
			game.error = null;
			return game;
		}

		return {'error' : 'Game not found'};
	}

	findGameWithGameId(game_id) {
		 return games[game_id-1];
	}

	storedGames() {
		return [];
	}	
};


	
}