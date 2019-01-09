//Snake v 1.0 - JcW Electronics Principals and Engineering

//Defining Variables
var s; //global variable for snake
var scl = 30; //creates scale for grid layout
var food; //global variable for food
var rightDir = true; //comes in later to protect against going back on yourself and dying
var leftDir = false; //^^^
var upDir = false; //^^^
var downDir = false; //^^^
var goal = [];
var pos = [];
var currentPath = [];
var playArea = [[]];


//Setup
function setup(){
	createCanvas(600, 600); //Creates the playing space
  initPlayArea();
	s = new Snake(); //Creates a user defined object for snake
	frameRate(60); //Sets framerate to 10 to give a retro feel
	pickLocation(); //function that is defined on line 19
}

//Function for picking a location for food spawns
function pickLocation(){
	var cols = floor(width/scl); //Creating a 30x30 grid to make it easy to line up
	var rows = floor(height/scl); //^^^^
  var rCols = floor(random(cols));
  var rRows = floor(random(rows));
	food = createVector(rCols, rRows); //Will generate a food object in a random column and row
	food.mult(scl); //Multiplies the food object by our scale so it will be the same size as snake
  console.log(s);
	console.log(food);
}



function initPlayArea(){
  for (var i = 0; i < 20; i++){
    playArea[i] = []
    for (var j = 0; j < 20; j++){
      playArea[i][j] = 0;
    }
  }
}
//Where all of the graphics are created
function draw(){
	background(34, 49, 63); //Background color for the canvas
	s.update(); //function defined in snake.js
	s.show(); //^^^
	ai();

	if (s.eat(food)){ //Checking a variable in snake.js that looks to see if snake crossed a food vector
    playArea[food.x/scl][food.y/scl] = 0;
		pickLocation(); //If the snake does, it will pick a new food location
		ai();
    updatePos();
	}
	


	if (s.death()) { //Checking a variable in snake.js that checks if the snake crossed itself or hit a wall
		s.total = 0; //Clears s.total
		s.tail = []; //Clears array for the tail
	}



//Drawing the food object, and the score counter
	fill(255, 0, 100); //Color of the food
	rect(food.x, food.y, scl, scl); //Creates a rectangle associated with food var
	fill(255); //Text fill color
	textSize(20); //Text size
	text('Score: ' + s.total, 5, 550); //Creates a text element at the bottom left to read the score
}



function ai(){ //The control logic
	/*
	This part right here I'm really proud of because I struggled to put something in place
	to prevent the player from going backwards and hitting themselves and ending the game.
	So what I did is defined 4 booleans at the top, then every time a keypress is seen
	it runs through the logic and prevents the player from going backwards
	*/
	updatePos();
	// if (key == 'w' && !downDir){ //If the up arrow is pressed and the downDir variable is false
	// 	s.dir(0, -1); //Set the s.dir var (declared in snake.js) to (0, -1) (which goes up)
	// 	upDir = true; //Since the snake is now moving up, set upDir to true
	// 	rightDir = false; //keep rightDir and leftDir false
	// 	leftDir = false; //^^^
	// } else if (key == 's' && !upDir){ //If down arrow is pressed and upDir is false
	// 	s.dir(0, 1); //s.dir is set to (0, 1)
	// 	downDir = true; //downDir is set to true
	// 	rightDir = false; //rightDir and leftDir are left to false
	// 	leftDir = false; //^^^
	// } else if (key == 'd' && !leftDir){ //If right arrow is pressed and leftDir is false
	// 	s.dir(1, 0); //s.dir is set to (1, 0)
	// 	rightDir = true; //rightDir  is now true
	// 	upDir = false; //upDir and downDir stay false
	// 	downDir = false; //^^^
	// } else if (key == 'a' && !rightDir){ //If left arrow is pressed and rightDir is false
	// 	s.dir(-1, 0); //s.dir is set to (-1, 0)
	// 	leftDir = true; //leftDir is now true
	// 	upDir = false; //upDir and leftDir are still false
	// 	downDir = false; //^^^
	// }

	if (pos[1] < goal[1] && !upDir){
		s.dir(0, 1);
		downDir = true;
		upDir = false;
		leftDir = false;
		rightDir = false;
	}
	else if (pos[1] > goal[1] && !downDir){
		s.dir(0, -1);
		downDir = false;
		upDir = true;
		leftDir = false;
		rightDir = false;
	}
	else if (pos[0] < goal[0] && !leftDir){
		s.dir(1, 0);
		downDir = false;
		upDir = false;
		leftDir = false;
		rightDir = true;
	}

	else if (pos[0] > goal[0] && !rightDir){
		s.dir(-1, 0);
		downDir = false;
		upDir = false;
		leftDir = true;
		rightDir = false;
	}
}




	function updatePos(){
		goal = [
			food.x / scl,
			food.y / scl
		];

		pos = [
			s.x / scl,
			s.y / scl
		];

	}

	function checkForCollisions(){

	}
