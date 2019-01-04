let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(800, 600);
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
  text("R:Up V:Down", 320, 40);
}

function keyReleased(){
  if (key == 'r'){
    left.move(-.1);
  }
  else if (key == 'v'){
    left.move(.1);
  }
}

function keyPressed(){
  console.log("pressed");
  if (key == 'r'){
    left.move(-8);
  }
  else if (key == 'v'){
    left.move(8);
  }

}
