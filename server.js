var express = require('express');
var json = require('express-json');
var app = express().use(json());
var core = require("./core.js");
var logic = require("./logic.js");
var roster = require("./roster.js");
var gameLoader = require("./game_loader.js");
var games = [];

app.get('/game/:id/move', function (req, res) {
	game = gameLoader.findGame(req);  //server.move
	game = core.move(game, req);
	res.json(game);
});

app.get('/game/play', function (req, res) {
	game = gameLoader.play(req); //server.play
	//game
	//load any game.
	res.json(game);
})

app.get('/game/load', function (req, res) {
	game = gameLoader.findGame(req); //server.load -- load a specific game
	res.json(game);
})

app.get('/account/new', function (req, res) {
	account = {};
	account = roster.registerAccount(account, req);
	res.json(account);
});

app.get('/account/status', function (req, res) {
	console.log("getting status");
	account = roster.findAccount(req);
	console.log("account status" + account.game_ids);
	res.json(account);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Quantum Productions Game server listening at http://%s:%s', host, port);
});

