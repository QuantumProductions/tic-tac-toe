var players = {};

registerPlayer = function(player, req) {
	var name = req.query.name;
	if (players[name] === undefined) {
		player.name = name;
		players[name] = player;
	} else {
		player.error = "Player exists";
	}

	return player;
};

module.exports = {
	"registerPlayer" : registerPlayer,
	"players" : players
};