var express = require('express');
var json = require('express-json');
var app = express().use(json());
var core = require("./core.js");
var logic = require("./logic.js");
var roster = require("./roster.js");
var gameLoader = require("./game_loader.js");
var games = [];

app.get('/game/:id/board', function (req, res) {
	game = gameLoader.findGame(req);
	if (!game) {
		res.json({'error' : 'No game found'});
		return;
	}

	res.json(game.board);
});

app.get('/game/:id/move', function (req, res) {
	game = findGame(req);
	game = core.move(game, req.query);
	res.json(game);
});

app.get('/game/new', function (req, res) {
	game = {};
	game = logic.setupGame(game, req.query);
	game.game_id = games.length + 1;
	games.push(game);
	res.json(game);
});

app.get('/game/play', function (req, res) {
	game = gameLoader.play(req);
	res.json(game);
})

app.get('/account/new', function (req, res) {
	account = {};
	account = roster.registerAccount(account, req);
	res.json(account);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Quantum Productions Game server listening at http://%s:%s', host, port);
});

