//Snake.js goes in hand with sketch.js

//Function for snake
function Snake(){
	this.x = 0; //Setting its x and y positions to 0
	this.y = 0; //^^^
	this.xspeed = 0; //Setting x and y speeds to 0
	this.yspeed = 0; //^^^
	this.total = 0; //Declaring total/score
	this.tail = []; //Declaring the tail as an array

//Function for collision involving snake and food vectors
this.eat = function(pos){
	var d = dist(this.x, this.y, pos.x, pos.y); //Calculates the distance between snake(x, y) and food(x, y)
	if (d < 1){ //If its less than 1
		this.total++; //The total/score goes up by one
		return true; //Returns this.eat as true so when its referenced in sketch.js pickLocation() works
	} else {
		return false; //If distance > 1 it returns as false
	}
}

	//Function which declares the x and y speeds
	this.dir = function(x, y){
		this.xspeed = x; //just sets it as x and y for later use
		this.yspeed = y; //^^^
	}

	//Fuction which checks for whether or not the snake collided with itself or a wall
	this.death = function(){
		for (var i = 0; i < this.tail.length; i++){ //Defines the length of the tail, i being length, and it increases based on the length of the tail array until it is equal
			var pos = this.tail[i]; //Defines pos as any block in the tail
			var d = dist(this.x, this.y, pos.x, pos.y); //Calculates the distance between the head and any block of the tail
			if (d < 1){ //If this distance is less than one
				return true; //Returns this.death as true which is called in sketch.js
			}
		}
	}

	this.checkSelfCollisions = function(){
		for (var i = 0; i < this.tail.length; i++){
			if (this.xspeed == 1){
				if ((this.x / scl) + 1 == this.tail[i].x / scl && (this.y / scl) == this.tail[i].y / scl){
					s.dir(0, 1);
					downDir = true;
					console.log(0);
				}
			}
			else if (this.xspeed == -1){
				if ((this.x / scl) - 1 == this.tail[i].x / scl && this.y / scl == this.tail[i].y / scl){
					s.dir(0, -1);
					upDir = true;
					console.log(1)
				}
			}
			else if (this.yspeed == 1){

			}
			else if (this.yspeed == -1){

			}
			else{
				ai();
			}
		}

	}

	//Function for making the tail of the snake actually work
	this.update = function(){
		for (var i = 0; i < this.tail.length-1; i++) { //For i(tail) it will increase until it is equal to the length of the array
			this.tail[i] = this.tail[i+1]; //Shifts tail over one to make a space for new tail piece
		}
		this.tail[this.total-1] = createVector(this.x, this.y); //Creates a vector at the next open slot in the tail array

		this.x = this.x + this.xspeed*scl; //Setting this.x and y equal to its positions + speed then multiplied by scale to bring it up to size of the canvas
		this.y = this.y + this.yspeed*scl; //^^^^

		this.x = constrain(this.x, 0, width - scl); //Creates a barrier on the walls so the snake object cant go off canvas
		this.y = constrain(this.y, 0, height - scl); //^^^



	}

	//Drawing of actual snake and tail
	this.show = function(){
		stroke(0); //Stroke on snake
		strokeWeight(5); //Stroke weight (5px)
		fill(255); //Fills it in white
		for (var i = 0; i < this.total; i++) { //This just adds another tail piece on for everytime the total increases
			rect(this.tail[i].x, this.tail[i].y, scl, scl); //Tail pieces
		}
		fill(155, 255, 0);
		rect(this.x, this.y, scl, scl); //Head of the snake
	}


}
