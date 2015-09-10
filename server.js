var express = require('express');
var json = require('express-json');
var app = express().use(json());
var core = require("./core.js");
var logic = require("./logic.js");
var game = {};

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/board', function (req, res) {
	game = logic.setupGame(game, req.query);
	res.json(game.board);
});

app.get('/move', function (req, res) {
	game = core.move(game, req.query);
	res.json(game.board);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
