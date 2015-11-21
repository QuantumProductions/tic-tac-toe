window.GAME = window.GAME || {};

GAME.client = (function() {
  function processClick(game, callback) {
    var x = Math.floor(cursor.x / client.render_distances['tile_size']);
    var y = Math.floor(cursor.y / client.render_distances['tile_size']);

    client.processClick(game, x, y, callback);
  }

  function processMouseMove() {
    //;
  }

  var last_frame;
  function draw() {
    if (!game || !game.board) {
      last_frame = window.requestAnimationFrame(draw);
      return;
    }

    var i = 0;
    var j = 0;

    for (i = 0; i < game.board.length; i++) {
      var row = game.board[i];
      for (j = 0; j < row.length; j++) {
        var piece = game.board[i][j];
        client.render_pieces[piece](game.board, j, i, null);
      }

    }

    client.render_status(game);
    last_frame = window.requestAnimationFrame(draw);
  }
  return {
    processClick: processClick,
    processMouseMove: processMouseMove,
    draw: draw
  }
})();
