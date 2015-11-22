"use strict";

window.client = new Client();
console.log(window.client.game.board);

var context = window.client.canvas.getContext('2d');

context.clearRect(0, 0, 500, 500);
context.fillStyle = "black";
context.fillRect(0,0, 500, 500);
