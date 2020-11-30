// Final Project: Game Development
// Game Title: Go Home, Goat!
// Concept: a game where the mechanics are similar to the app game Scream Go Hero: audio input makes your character
// move & jump based on volume.  However, in this game, the theme is very different.  You play as a kid goat who is
// lost and trying to make his way back home.
// The goat keeps going until he reaches the farm, where his dad is. (maybe after like, fifteen obstacles ?)
// All images & sprites are my own.
// Font is Fredoka One Regular from https://fonts.google.com/specimen/Fredoka+One?query=fredoka
// Libraries used: p5 sound library (for audio input) & p5 play library (for collisions, sprites, animations, etc.)

// To do:
// Finish drawing sprites for the walking goat, the grass, the farm & goat dad, and the sad goat face for the lose screen.
// Finish coding the actual game.
// Figure out how many obstacles there should be / when to stop the game
// Decide whether to add background music/sound effects (should i do it if the player is basically screaming over it?)

let state = 1; //tell which screen its on
let cloud1, cloud2, cloud3; //only three clouds (too many would seem too cluttered) so i didn't think it was necessary to do an array
let mic; //microphone

function preload(){ //loading images and font
  sky = loadImage('images/background sky.png');
  goathead = loadImage('images/goat head.png');
  myCloud = loadImage('images/clouds.png');
	twogoats = loadImage('images/goatsplural.png');
	goatlost = loadImage('images/sadgoat.png');
	myFont = loadFont('fonts/FredokaOne-Regular copy.ttf');
}

function setup() {
  createCanvas(1300, 725);
  cloud1 = new Clouds(200, 100, 1.5); //creating clouds
  cloud2 = new Clouds(1000, 250, 2);
  cloud3 = new Clouds(750, 400, 1);
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
	imageMode(CENTER);

	//controlling which screen you are on through state variable
  if (state == 1){ //home screen
    homeScreen();
  } else if (state == 2){ //game state
    game();
  } else if (state == 3){
		howToPlay();
	} else if (state == 4){
		loseScreen();
	} else if (state == 5){
		winScreen();
	}
}

function homeScreen(){ //code for home screen (STATE = 1)
	textSize(100);
  text('GO HOME, GOAT!', width/2, 125); //title

	//instructions
  textSize(50);
  text('press ENTER to start the game', width/2, 480); //start
	text('press OPTION to learn how to play', width/2, 550); //rules
  image(goathead, width/2, 330, 450, 450); //goat head
}

function game(){ //code for game (STATE = 2)

}

function howToPlay(){ //code for rules page (STATE = 3)
	textSize(100);
  text('HOW TO PLAY', width/2, 125); //headline
	textSize(30);
	strokeWeight(5);

	//instructions
	text('allow the computer access to your mic &', width/2, 200);
	text('yell to guide the goat home.', width/2, 250);
	text('the louder you yell, the higher you jump.', width/2, 300);
	textSize(50);
	text('press ENTER to start the game', width/2, 380);
}

function loseScreen(){ //code for lose (STATE = 4)
	textSize(100);
  text('YOU LOSE', width/2, 125);
	image(goatlost, width/2, 330, 450, 450); //goat lost
	textSize(50);
	text('press ENTER to try again', width/2, 525);
	text('press OPTION to learn how to play', width/2, 600);
}

function winScreen(){ //code for win (STATE = 5)
	textSize(100);
  text('YOU WIN!', width/2, 125);
	image(twogoats, width/2, 330, 650, 450); //goat is back with goat dad image
	textSize(50);
	text('press ENTER to play again', width/2, 525);
	text('press OPTION to learn how to play', width/2, 600);
}

function keyPressed(){
  if (state == 1 || state == 4 || state == 5){
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
	if (keyCode == CONTROL){ //go to lose screen (COMMENT OUT LATER)
		state = 4
	}
	if (keyCode == SHIFT){ //go to win screen (COMMENT OUT LATER)
		state = 5;
	}
	console.log(state) //log state # to console (COMMENT OUT LATER)
}
