var express = require('express');
var json = require('express-json');
var app = express().use(json());
var core = require("./core.js");
var logic = require("./logic.js");
var games = [];

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/game/:id/board', function (req, res) {
	game = findGame(req);
	res.json(game.board);
});

app.get('/game/:id/move', function (req, res) {
	game = findGame(req);
	if (game === null) {
		res.json({'error' : 'No game found'});
		return;
	}

	game = core.move(game, req.query);
	res.json(game.board);
});

app.get('/game/new', function (req, res) {
	game = {};
	game = logic.setupGame(game, req.query);
	game.game_id = games.length + 1;
	games.push(game);
	res.json(game);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

findGame = function(req) {
	var game_id = parseInt(req.params.id);
	if (games.length <= game_id) {
		return games[game_id-1];
	}

	return null;
};
