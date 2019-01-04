class PlayerPaddle {
  constructor(){
    this.y = height/2;
    this.w = 20;
    this.x = 40;
    this.h = 100;
    this.yChange = 0;
  }

  update(){
    this.y += this.yChange;
    this.y = constrain(this.y, this.h/2, height - this.h/2);
  }

  move(steps){
    this.yChange = steps;
  }

  show(){
    var clr = color(255);
    fill(clr);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }


}
