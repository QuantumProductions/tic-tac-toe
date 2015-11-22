class Client {
	constructor(options) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = 500;
		this.canvas.height = 500;		

		this.canvas.addEventListener("onMouseUp",this.onMouseUp.bind(this));
		this.canvas.addEventListener("onMouseDown",this.onMouseDown.bind(this));
		window.addEventListener("onKeyDown",this.onKeyDown.bind(this));
		window.addEventListener("onKeyUp",this.onKeyUp.bind(this));
		
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
		this.game.onKeyDown(this.key_map[event.keyDown]);
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