// Final Project: Game Development
// Game Title: Go Home, Goat!
// Concept: a game where the mechanics are similar to the app game Scream Go Hero: audio input makes your character
// move & jump based on volume.  However, in this game, the theme is very different.  You play as a kid goat who is
// lost and trying to make his way back home.
// All images & sprites are my own.
// Font is Fredoka One Regular from https://fonts.google.com/specimen/Fredoka+One?query=fredoka
// Libraries used: p5 sound library (for audio input) & p5 play library (for collisions, sprites, animations, etc.)

// Considering: should I add background music/sound effects?  should i do it if the player is basically screaming over it?

let state = 1; //tell which screen its on
let cloud1, cloud2, cloud3; //only three clouds (too many would seem too cluttered) so i didn't think it was necessary to do an array
let mic; //microphone

function preload(){ //loading images and font
  sky = loadImage('images/background sky.png');
  goathead = loadImage('images/goat head.png');
  myCloud = loadImage('images/clouds.png');

	myFont = loadFont('fonts/FredokaOne-Regular copy.ttf');
}

function setup() {
  createCanvas(1300, 750);
  cloud1 = new Clouds(200, 100, 1.5) //creating clouds
  cloud2 = new Clouds(1000, 250, 2)
  cloud3 = new Clouds(750, 400, 1)
}

function draw(){
  imageMode(CORNER);
  //background is sky & clouds
	background(sky);
  cloud1.display(); //displaying & moving each cloud
  cloud2.display();
  cloud3.display();
  cloud1.move();
  cloud2.move();
  cloud3.move();

	fill(255);
  strokeWeight(10);
  stroke(163, 71, 255);
  textFont(myFont);
  textAlign(CENTER);

	//controlling which screen you are on through state variable
  if (state == 1){ //home screen
    homeScreen();
  } else if (state == 2){ //game state
    game();
  } else if (state == 3){
		howToPlay();
	}
}

function homeScreen(){ //code for home screen
	textSize(100);
  text('GO HOME, GOAT!', width/2, 125); //title

	//instructions
  textSize(50);
  text('press enter to start the game', width/2, 480); //start
	text('press option to learn how to play', width/2, 550); //rules
  imageMode(CENTER);
  image(goathead, width/2, 330, 450, 450); //goat head
}

function howToPlay(){ //code for rules page
	textSize(100);
  text('HOW TO PLAY', width/2, 125); //headline
	textSize(30);
	strokeWeight(5);

	//instructions
	text('allow the computer access to your mic &', width/2, 200);
	text('scream into the microphone to guide the goat home.', width/2, 250);
	textSize(50);
	text('press enter to start the game', width/2, 350);
}

function game(){ //code for game

}

function keyPressed(){
  if (state == 1){
    if (keyCode == ENTER){ // press enter to start game
      state = 2;
    } else if (keyCode == OPTION){
			state = 3;
		}
  }
	if (state == 2){
		if (keyCode == LEFT_ARROW){ //go back to home screen (COMMENT OUT LATER)
			state = 1;
		}
	}
	if (state == 3){
		if (keyCode == LEFT_ARROW){ //go back to home screen (COMMENT OUT LATER)
			state = 1;
		}
		if (keyCode == ENTER){ //start game
			state = 2;
		}
	}
	console.log(state) //log state # to console (COMMENT OUT LATER)
}
