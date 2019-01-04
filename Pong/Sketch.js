let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(800, 400);
  frameRate(120);
  ball = new Ball();
  left = new PlayerPaddle();
  right = new AIPaddle();
}

function draw() {
  background(51);
  ball.checkLeftCollisions(left);
  ball.checkRightCollisions(right);

  left.update();
  right.update();
  right.move();
  left.show();
  right.show();
  ball.update();
  ball.edges();
  ball.show();

  dispScore();
}


function dispScore() {
  fill(255);
  textSize(32);
  text(leftScore, 32, 40);
  text(rightScore, width - 64, 40);
}

function keyReleased(){
  left.move(0);
}

function keyPressed(){
  console.log("pressed");
  if (key == 'r'){
    left.move(-7);
  }
  else if (key == 'v'){
    left.move(7);
  }

}
