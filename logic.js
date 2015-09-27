var setupGame = function(game, query){
	game.current_player = "X";
	game.players = {};
	game.board = [[' ', ' ', ' '],
	              [' ', ' ', ' '],
	              [' ', ' ', ' ']]; 

	game.pieces = {
		' ': function(board, piece, x, y, data) {
			if (piece === 'X') {
				board[y][x] = "X"; //data = query.data; moving piece: fboard[data][y][data][x] = ""
			} else if (piece === "O") {
				board[y][x] = "O";
			}
		},
		'X': function(board, piece, x, y, data) {
			board.error = 'X Occupied space' + x + "y" + y;
		},
		'O': function(board, piece, x, y, data) {
			board.error = 'O Occupied space' + x + "y" + y;
		}
	};

	return game;
}

var cyclePlayers = function(game) {
		if (game.current_player === "X") {
			game.current_player = "O";
		} else if (game.current_player === "O") {
			game.current_player = "X";
		}
}

var evaluateResolution = function(game) {
	var board = game.board;
	var winningAlignments = [
	 	[[0,0], [0,1], [0,2]],
	 	[[1,0], [1,1], [2,1]],
	 	[[2,0], [2,1], [2,2]],
	 	[[0,0], [1,1], [2,2]],
	 	[[2,0], [1,1], [0,2]],
	 	[[0,0], [1,0], [2,0]],
	 	[[0,1], [1,1], [2,1]],
		[[0,2], [1,2], [2,2]]];

	var i = 0;
	var j = 0;
	
	for (i = 0; i < winningAlignments.length; i++) {
		var alignment = winningAlignments[i];
		var xTiles = 0;
		var oTiles = 0;

		for (j = 0; j < alignment.length; j++) {
			var position = alignment[j];
			var tile = board[position[0]][position[1]];
			if (tile === "X") {
				xTiles++;
			} else if (tile === "O") {
				oTiles++;
			}
		}

		if (xTiles == 3) {
			game.winner = "X";
			break;
		} else if (oTiles == 3) {
			game.winner = "O";
			break;
		}
	}
 
 	console.log("winner: " + game.winner);
}

var loadPiece = function(game, req) {
	return game.players[req.query.player].piece;
}

var announceMove = function(game, req) {
	var accountIds = [];
	var i = 0;

  var gamePlayers = Object.keys(game.players);

	for (i = 0; i < gamePlayers.length; i++) {
		var player = game.players[gamePlayers[i]];
		console.log("player piece" + player.piece);
		console.log("req.query.player" + req.query.player);
	  if (player.piece === req.query.player) {
			removeGameFromAnnounce(game, player);
		} else {
			addGameToAnnounce(game, player);
		}
	}
}

var removeGameFromAnnounce = function(game, player) {
	var accountName = player.account.name;
	var announceGameIds = player.account.announceGameIds;
	if (announceGameIds) {
		var j = 0;
		for (j = 0; j < announceGameIds.length; j++) {
			var gameId = announceGameIds[j];
			if (gameId === game.game_id) {
				announceGameIds.splice(j, 1);
				console.log("REMOVING");
				player.account.announceGameIds = announceGameIds;
				console.log(player.account.announceGameIds);
				console.log(player.account.name);
				return;
			}
		}
	}
}

var addGameToAnnounce = function(game, player) {
	var accountName = player.account.name;
	var announceGameIds = player.account.announceGameIds;		
	console.log("Adding announce FOR "+ accountName + "to their announceIds" + announceGameIds);
	console.log("game id" + game.game_id);
	if (announceGameIds) {
		var j = 0;
		var exists = false;
		for (j = 0; j < announceGameIds.length; j++) {
			var gameId = announceGameIds[j];
			if (gameId === game.game_id) {
				exists = true;
				break;
			}
		}
		if (!exists) {
			announceGameIds.push(game.game_id);
			player.account.announceGameIds = announceGameIds;
		}
	}
}

module.exports = {
	"setupGame": setupGame,
	"cyclePlayers": cyclePlayers,
	"evaluateResolution": evaluateResolution,
	"loadPiece" : loadPiece,
	"announceMove" : announceMove
};