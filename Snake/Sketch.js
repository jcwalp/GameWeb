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


//Setup
function setup(){
	createCanvas(600, 600); //Creates the playing space
	s = new Snake(); //Creates a user defined object for snake
	frameRate(10); //Sets framerate to 10 to give a retro feel
	pickLocation(); //function that is defined on line 19
}

//Function for picking a location for food spawns
function pickLocation(){
	var cols = floor(width/scl); //Creating a 30x30 grid to make it easy to line up
	var rows = floor(height/scl); //^^^^
	if (cols == s.tail || rows == s.tail){
		cols = floor(width/scl);
		rows = floor(height/scl);
	}
	food = createVector(floor(random(cols)), floor(random(rows))); //Will generate a food object in a random column and row
	food.mult(scl); //Multiplies the food object by our scale so it will be the same size as snake
}

//Where all of the graphics are created
function draw(){
	background(34, 49, 63); //Background color for the canvas
	s.update(); //function defined in snake.js
	s.show(); //^^^
	initPath();
	console.log(currentPath);


	if (s.eat(food)){ //Checking a variable in snake.js that looks to see if snake crossed a food vector
		pickLocation(); //If the snake does, it will pick a new food location
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
function keyPressed(){ //The control logic
	/*
	This part right here I'm really proud of because I struggled to put something in place
	to prevent the player from going backwards and hitting themselves and ending the game.
	So what I did is defined 4 booleans at the top, then every time a keypress is seen
	it runs through the logic and prevents the player from going backwards
	*/
	if (key == 'w' && !downDir){ //If the up arrow is pressed and the downDir variable is false
		s.dir(0, -1); //Set the s.dir var (declared in snake.js) to (0, -1) (which goes up)
		upDir = true; //Since the snake is now moving up, set upDir to true
		rightDir = false; //keep rightDir and leftDir false
		leftDir = false; //^^^
	} else if (key == 's' && !upDir){ //If down arrow is pressed and upDir is false
		s.dir(0, 1); //s.dir is set to (0, 1)
		downDir = true; //downDir is set to true
		rightDir = false; //rightDir and leftDir are left to false
		leftDir = false; //^^^
	} else if (key == 'd' && !leftDir){ //If right arrow is pressed and leftDir is false
		s.dir(1, 0); //s.dir is set to (1, 0)
		rightDir = true; //rightDir  is now true
		upDir = false; //upDir and downDir stay false
		downDir = false; //^^^
	} else if (key == 'a' && !rightDir){ //If left arrow is pressed and rightDir is false
		s.dir(-1, 0); //s.dir is set to (-1, 0)
		leftDir = true; //leftDir is now true
		upDir = false; //upDir and leftDir are still false
		downDir = false; //^^^
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

	function initPath(){
		updatePos();

		currentPath = findPath(pos, goal);
	}

	function findPath(pos, goal){
		var abs = Math.abs;
		var max = Math.max;
		var pow = Math.pow;
		var sqrt = Math.sqrt;

		var maxWalkTileNum = 0;

		var playWidth = 20;
		var playHeight = 20;
		var playSize = 400;

		var distanceFunction = ManhattanDistance;
		var findNeighbours = function(){};


	function ManhattanDistance(pos, goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(pos.x - goal.x) + abs(pos.y - goal.y);
	}

	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < playHeight && canWalkHere(x, S),
		myE = E < playWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	function canWalkHere(x, y)
	{
		return true;
	};

	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * playWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}

	function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pos[0], y:pos[1]});
		var mypathEnd = Node(null, {x:goal[0], y:goal[1]});
		// create an array that will contain all world cells
		var AStar = new Array(playSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = playSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();
}
