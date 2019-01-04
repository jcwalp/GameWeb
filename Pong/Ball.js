class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.r = 20;
    this.velocity = 10;

    this.reset();
  }

  checkLeftCollisions(p) {
    if (this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x - this.r < p.x + p.w / 2) {
      if (this.x > p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let rad = radians(60);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xspeed = this.velocity * cos(angle);
        this.yspeed = this.velocity * sin(angle);
        this.x = p.x + p.w / 2 + this.r;
      }
    }
  }

  checkRightCollisions(p) {
    if (this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x + this.r > p.x - p.w / 2) {

      if (this.x < p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let angle = map(diff, 0, p.h, radians(225), radians(135));
        this.xspeed = this.velocity * cos(angle);
        this.yspeed = this.velocity * sin(angle);
        this.x = p.x - p.w / 2 - this.r;
      }
    }
  }

  edges(){
    if (this.y < 0 || this.y > height){
      this.yspeed *= -1;
    }
    if (this. x - this.r > width){
      leftScore++;
      this.reset();
    }
    if (this.x + this.r < 0){
      rightScore++;
      this.reset();
    }
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.velocity = 10;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    let angle = random(-PI / 4, PI / 4);
    this.xspeed = this.velocity * Math.cos(angle);
    this.yspeed = this.velocity * Math.sin(angle);

    if (random(1) < 0.5) {
      this.xspeed *= -1;
    }
  }

  show() {
    fill(250);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }
}
