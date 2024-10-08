const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 10;
const paddleHeight = grid;
const paddleWidth = grid * 10;
const maxPaddleY = canvas.height - grid - paddleHeight;

var ballSpeed = 5;

const paddle = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - paddleHeight,
  width: paddleWidth,
  height: paddleHeight,
  dx: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: grid,
  height: grid,

  resetting: false,

  dx: 0,
  dy: ballSpeed
};

function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // prevent paddles from going through walls
  if (paddle.x > canvas.width - grid - paddle.width) {
    paddle.x = canvas.width - grid - paddle.width;
    paddle.dx = 0;
  }
  else if (paddle.x < grid) {
    paddle.x = grid;
    paddle.dx = 0;
  }

  // draw paddle
  context.fillStyle = 'white';
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // move ball by its velocity
  ball.x += ball.dx;
  ball.y += ball.dy;

  // prevent ball from going through walls by changing its velocity
  if (ball.x < grid) {
    ball.x = grid;
    ball.dx *= -1;
  }
  else if (ball.x > canvas.width - grid) {
    ball.x = canvas.width - grid;
    ball.dx *= -1;
  }
  else if (ball.y < grid) {
    ball.y = grid;
    ball.dy *= -1.1;
  }

  // reset ball if it goes past paddle (but only if we haven't already done so)
  if ( ball.y > canvas.height && !ball.resetting) {
    ball.resetting = true;

    setTimeout(() => {
      ball.resetting = false;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = 0;
      ball.dy = ballSpeed;
    }, 400);
  }

  // check to see if ball collides with paddle.
  if (collides(ball, paddle)) {
    ball.dy *= -1;
    ball.y = paddle.y - paddle.height;
    ball.dx += paddle.dx;
  }

  // draw ball
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // draw walls
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, 0, grid, canvas.height);
  context.fillRect(canvas.width - grid, 0, grid, canvas.height);

}

// listen to mouse move
canvas.addEventListener('mousemove', function(evt) {
    var rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    dx = x - paddle.x;
    paddle.dx = dx;
    paddle.x = x;
});

// start the game
requestAnimationFrame(loop);
