class Game {
  constructor(options) {
    this.WIDTH = options.width;
    this.HEIGHT = options.height;
    this.ratio = this.ratio || 1;
    //if (this.WIDTH * this.ratio > this.HEIGHT * this.ratio) {
    //  this.HEIGHT = this.height*this.ratio;
    //} else {
    //  this.WIDTH = this.width;
    //}
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.context = this.canvas.getContext("2d");
  }
}

class BreakOutGame extends Game {
  constructor(options) {
    this.ratio = 1;
    super();
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    this.paddle = { //#! TODO: 
      w: 60,
      h: 15,
      y: this.HEIGHT - 30,
      color: "white"
    }

    //where paddle is defined, give the paddle a dx
    this.paddle.dx = 200;

    this.paddle.x = this.WIDTH/2 - this.paddle.w/2;

    this.ball = {
      r: 10,
      y: this.HEIGHT - 45,
      dx: 150, // speed is in pixels per second
      dy: -150, // up is negative!
      color: "white"
    }
    this.ball.x = this.WIDTH/2;// arc is already centered!

    this.beep = new Sound("beep",1);
    this.brick_sprites = document.createElement("img");
    this.brick_sprites.src = options.brick_src || "brick_sprites.png";
    this.brick_options = options.brick_options || {w: 40, h: 15, separation: 5, canvas: canvas, rows: 4};
    this.bricks = this.createBricks(brick_options);
    this.tick_proxy = this.tick.bind(this);
  }
  onKeyDown(event) {
    if (event.keyCode == 39) this.right_down = true;
    else if (event.keyCode == 37) this.left_down = true;
  }
  onKeyUp(event) {
    if (event.keyCode == 39) this.right_down = false;
    else if (event.keyCode == 37) this.left_down = false;
  }
  onMouseMove(event) {
    this.mouse_move = event.layerX-paddle.w/2;
  }
  createBricks(o) {
    this.bricks = []
    var x, y, col_max, color;
    var sw = 16;
    var sh = 8;
    var sprite_rows = [0,1,2,3,4,5,6,7];
    for (var row=0; row<o.rows; row++) {
      col_max = Math.floor(o.canvas.width / (o.w+o.separation));
      if (row%2 == 0) { col_max -=1; }
      y = (row+3)*(o.h + o.separation) + o.separation;
      for (var col=0; col<col_max; col++) {
        x = col*(o.separation + o.w) + o.separation;
        if (row%2 == 0) { x += o.w/2; }
        var sprite_row = sprite_rows[Math.floor((row+col)%sprite_rows.length)];
        sprite_col = Math.floor(Math.random()*5);
        var brick = {
          sx: sprite_col*sw,
          sy: sprite_row*sh,
          sw: sw,
          sh: sh,
          x: x,
          y: y,
          w: o.w,
          h: o.h,
          broken: false
        };
        this.bricks.push(brick);
      }
    }
  }
  collide(ball,brick) {
    var out = { x: false, y: false };
    var d_left = ball.x - brick.x+ball.r;
    var d_right = brick.x + brick.w - ball.x+ball.r;
    var d_top = ball.y - brick.y+ball.r;
    var d_bot = brick.y + brick.h - ball.y+ball.r;
    if (d_left > 0 && d_right > 0 && d_top > 0 && d_bot > 0) {
      beep.play();
      if (Math.min(d_left,d_right) > Math.min(d_top,d_bot)) {
        out.y = true;
      }
      else {
        out.x = true;
      }
    }
    return out;
  }
  doCollisions() {
    for (var i=0;i<this.bricks.length;i++) {
      var _b = this.bricks[i];
      if (_b.broken) { continue; }
      var _c = this.collide(ball,_b);
      if (_c.x || _c.y) {
        _b.broken = true;
        if (_c.x) { ball.dx = -ball.dx }
        if (_c.y) { ball.dy = -ball.dy }
      }
    }

    _c = this.collide(ball,paddle);
    if (_c.x || _c.y) {
      ball.dy = - ball.dy;
    }
  }
  move() {
    var ball = this.ball, elapsed_time = this.elapsed_time, paddle = this.paddle;
    // move ball
    if (ball.x < ball.r || ball.x > this.WIDTH - ball.r) { ball.dx = -ball.dx }
    if (ball.y < ball.r || ball.y > this.HEIGHT - ball.r) { ball.dy = -ball.dy }
    ball.x += ball.dx*this.elapsed_time;
    ball.y += ball.dy*this.elapsed_time;

    // move padle
    if (this.left_down) {
      paddle.x -= paddle.dx*elapsed_time;
      paddle.x = Math.max(0,paddle.x);
    }
    if (this.right_down) {
      paddle.x += paddle.dx*elapsed_time;
      paddle.x = Math.min(this.WIDTH-paddle.w,paddle.x)
    }
  }

  rect(r) { //#!
    this.context.fillStyle = r.color;
    this.context.beginPath();
    this.context.rect(r.x, r.y, r.w, r.h);
    this.context.fill();
    this.context.closePath();
  }

  circle(c) { //#!
    this.context.fillStyle = c.color;
    this.context.beginPath();
    this.context.arc(c.x, c.y, c.r, 0, Math.PI*2, true);
    this.context.fill();
    this.context.closePath();
  }

  clear() { this.context.clearRect(0,0,this.WIDTH,this.HEIGHT); } //#!

  draw_brick(b) {
    this.context.drawImage(this.brick_sprites,b.sx,b.sy,b.sw,b.sh,b.x,b.y,b.w,b.h);
  }
  draw() { //#!
    this.clear();

    this.circle(ball);
    this.rect(paddle);

    for (var i=0;i<this.bricks.length;i++) {
      _b = this.bricks[i];
      if (!_b.broken) { this.draw_brick(_b); }
    }
  }

  tick() { //#!
    this.now = new Date().valueOf();
    this.elapsed_time = (this.now-this.last_time)/1000;
    this.last_time = this.now;
    this.doCollisions();
    this.move();
    this.draw();
    this.current_frame = window.requestAnimationFrame(this.tick_proxy);
  }

  start() { //#!
    this.now = new Date().valueOf();
    this.last_time = new Date().valueOf();
    this.current_frame = window.requestAnimationFrame(this.tick_proxy);
  }

  stop() { //#!
    cancelAnimationFrame(current_frame);
  }
}

class Sound { //#!
  consructor(src,repeat) {
    this.repeat = repeat || 4;
    this.elements = [];
    for (var i=0;i<repeat;i++) {
      var audio = document.createElement("audio");
      var mp3 = document.createElement("source");
      mp3.src = src + ".mp3";
      audio.appendChild(mp3);
      var wav = document.createElement("source");
      wav.src = src + ".wav";
      audio.appendChild(wav);
      this.elements.push(audio);
    }
    this.last_played = 0;
    setVolume(0.5);
  }
  play() {
    this.last_played +=1;
    if (this.last_played >= repeat) { this.last_played = 0; }
    this.elements[this.last_played].play();
  }
  stop() { this.elements[this.last_played].stop(); }
  set_volume(level) {
    for (var i=0;i<this.elements.length;i++) { this.elements[i].volume=level; }
  }
}

