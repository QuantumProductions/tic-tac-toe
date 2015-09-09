var express = require('express');
var json = require('express-json');
var app = express().use(json());
var logic = require("./logic.js");

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/board', function (req, res) {
	var game = {};
	game = logic.setupGame(game);
	res.json(game.board);
	//res.json(logic.board);
	// res.json({
	// 	"board" : ["X", "O"]
	// });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
