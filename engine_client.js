"use strict";

class Client {
	constructor(options) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = 500;
		this.canvas.height = 500;

		this.canvas.addEventListener("click", this.onMouseDown.bind(this), false);
		document.body.appendChild(this.canvas);

		window.addEventListener("keydown", this.onKeyDown.bind(this), true);
		
		this.key_map = {
			37: 'L1',
			38: 'U1',
			39: 'R1',
			40: 'D1'
		}

		this.game = new TicTacToe();
	}


	onKeyUp(event) {
		this.game.onKeyUp(this.key_map[event.keyCode]);
	}

	onKeyDown(event) {
		console.log(event.keyCode);
		this.game.onKeyDown(this.key_map[event.keyCode]);
	}

	onMouseUp(event) {
		var x = event.layerX;
		var y = event.layerY;
		this.game.onMouseUp(x, y);
	}

	onMouseDown(event) {
		var x = event.layerX;
		var y = event.layerY;
		this.game.onMouseDown(x, y);
	}
}
