// Final Project: Game Development
// Game Title: Go Home, Goat!
// Concept: a game where the mechanics are similar to the app game Scream Go Hero: audio input makes your character
// move & jump based on volume.  However, in this game, the theme is very different.  You play as a kid goat who is
// lost and trying to make his way back home.
// The goat keeps going until he reaches the farm, where his dad is.
// Also, when I get frustrated coding it, now I will have a reason to yell at my project.
// All images & sprites are my own.
// Font is Fredoka One Regular from https://fonts.google.com/specimen/Fredoka+One?query=fredoka
// Libraries used: p5 sound library (for audio input) & p5 play library (for collisions, sprites, animations, etc.)
// Sounds from freesound.org
// Referenced p5 play website & Dan Shiffman's video on microphone input: https://www.youtube.com/watch?v=q2IDNkUws-A

// Finished 12/15/2020:
// Player mechanics with microphone input
// Continuous side scrolling camera.
// Compiled game & screens.
// BG music, sound effects
// Added bird obstacle.
// Sprites are finished

let state = 1; //tell which screen its on
let clouds = []; //cloud array
let sky, goathead, myCloud, twogoats, goatlost, grassimg, waterimg, farm, bird; //images
let myFont; //fonts
let bgmusic, splash, squawk; //sounds
let mic; //microphone
let SCENE_W = 13000; //scene width - using camera for sidescrolling effect
let ground, grass, birds; //groups
let grounded = true; //boolean to check if landed after jumping
let gravity = 5;
let jump = -6;
let title, losewords, winwords, howtoplaywords, xpos, ypos; //text
let goat; //player character

function preload(){ //loading images, font, sounds
  sky = loadImage('images/background sky.png');
  goathead = loadImage('images/goat head.png');
  myCloud = loadImage('images/clouds.png');
	twogoats = loadImage('images/goatsplural.png');
	goatlost = loadImage('images/sadgoat.png');
	grassimg = loadImage('images/grass.png')
	waterimg = loadImage('images/thewater.png');
	// idlegoat = loadImage('idlegoat.png');
	farm = loadImage('images/farm.png');
	//carrot = loadImage('carrot1.png');
	bird = loadImage('images/bird1.png');

	myFont = loadFont('fonts/FredokaOne-Regular copy.ttf');

	bgmusic = loadSound('sounds/background music.mp3');
	bgmusic.setVolume(0.1);
	splash = loadSound('sounds/splash.wav');
	splash.setVolume(2);
	squawk = loadSound('sounds/squawk.wav');
	squawk.setVolume(1.5);
}

function setup() {
  createCanvas(1300, 725);
	for (let i=0; i < 30; i++){
    clouds[i] = new Clouds(random(0, width + SCENE_W),random(100, 500),random(1, 2));
  } //cloud array

	title = "GO HOME, GOAT!"
	losewords = "YOU LOSE..."
	winwords = "YOU WIN!"
	howtoplaywords = "HOW TO PLAY"
	xpos = width/2;
	ypos = 125;

	bgmusic.loop(); //loop music
	bgmusic.setVolume(0.5);

  // cloud1 = new Clouds(200, 100, 1.5); //creating clouds
  // cloud2 = new Clouds(1000, 250, 2);
  // cloud3 = new Clouds(750, 400, 1);
	mic = new p5.AudioIn(); //allowing for microphone input
	mic.start();
	ground = new Group();
	water = new Group();
	birds = new Group();
	for (let x = 50; x < SCENE_W + width; x += 100) { //creating grass sprites for beginning
		if (x < width){ //positioning grass sprites
			grass = createSprite(x, height - 50);
			grass.addImage(grassimg);
			ground.add(grass);
		} else if (x > width && x < SCENE_W){
				if ((x > width + 300 && x < width + 500) || (x > width + 900 && x < width + 1200) || (x > width + 1500 && x < width + 1700)|| (x > width + 2300 && x < width + 2500)|| (x > width + 3000 && x < width + 3500) || (x > width + 3700 && x < width + 4300)|| (x > width + 5000 && x < width + 5300)|| (x > width + 5700 && x < width + 5900)|| (x > width + 6000 && x < width + 6300) || (x > width + 6800 && x < width + 7300)|| (x > width + 7900 && x < width + 8300)|| (x > width + 9000 && x < width + 9500) || (x > width + 9700 && x < width + 9900) || (x > width + 10000 && x < width + 10300)){
					thewater = createSprite(x, height - 50); //positioning water
					thewater.addImage(waterimg);
					thewater.setCollider("rectangle", 50, 50, 100, 50); //fixing the collision detection for water
					water.add(thewater)
				} else {
					grass = createSprite(x, height - 50);
					grass.addImage(grassimg);
					ground.add(grass);
				}
		} else if (x > SCENE_W){
			grass = createSprite(x, height - 50);
			grass.addImage(grassimg);
			ground.add(grass);
		}
	}
// 	for (let i = 0; i < 20; i++){
// 		for (let j = width + 800; j < SCENE_W; j += 1500){
// 			birds[i] = new Birds(j, random(600, 250));
// 		}
// 	}

	for (let i = width + 800; i < SCENE_W; i += 1500){ //bird obstacles
		itsabird = createSprite(i, random(600, 250))
		itsabird.addImage(bird);
		itsabird.setCollider("circle", 0, 0, 10) //collision circle
		birds.add(itsabird);
	}

	goat = createSprite(width/2, height-300); //creating goat sprite

	let myAnimation = goat.addAnimation('running','images/goat_run1.png', 'images/idlegoat.png','images/goat_run2.png') //running animation
	myAnimation.offY = 18;
	goat.addAnimation('jumping', 'images/goat_scream.png') //scream with the goat!
}

function draw(){
  imageMode(CORNER);
  //background is sky & clouds
	background(sky);
  // cloud1.display(); //displaying & moving each cloud
  // cloud2.display();
  // cloud3.display();
  // cloud1.move();
  // cloud2.move();
  // cloud3.move();

	for (let i=0; i < 30; i++){ //display cloud array
		clouds[i].move();
		clouds[i].display();
  }

	// for (let i = 0; i < 20; i++){
	// 	for (let j = width + 800; j < SCENE_W; j += 1500){
	// 		birds[i].move();
	// 		birds[i].display();
	// 	}
	// }

	fill(255);
  strokeWeight(10);
  stroke(163, 71, 255);
  textFont(myFont);
  textAlign(CENTER);
	imageMode(CENTER);

	//controlling which screen you are on through state variable
  if (state == 1){
    homeScreen();
  } else if (state == 2){
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
	for (let i = 0; i < title.length; i ++){ //for title text wiggle
		text(title[i], xpos, ypos + random(-2, 2));
		xpos += textWidth(title[1])
	}
	xpos = 150

  // text('GO HOME, GOAT!', width/2, 125); //title
	for (let x = 50; x < width; x += 100) {
		image(grassimg, x, height - 50, 100, 100);
	}

	//instructions
  textSize(50);
  text('press ENTER to start the game', width/2, 480); //start
	text('press OPTION to learn how to play', width/2, 550); //rules
  image(goathead, width/2, 330, 450, 450); //goat head
}

function game(){ //code for game (STATE = 2)
  let vol = mic.getLevel(); //getting volume of microphone
	if (vol >= 0.1 && goat.position.y > 250){
		goat.changeAnimation('jumping')
		goat.velocity.y += jump; //if volume is greater than 0.1 & position is less than height/2, then goat jumps
	} else if (vol < 0.1){ // adding this part fixed the bug of glitching x movement when not jumping
		goat.velocity.y = 0;
		goat.changeAnimation('running')
	}

	goat.collide(ground); //collision detection with ground

	if (goat.collide(ground)){
		grounded = true
	} else{
		grounded = false
	}
	if (grounded == false){
		goat.velocity.y += gravity
	} //gravity brings goat back to ground

	goat.velocity.x = 10; // x speed of goat

	camera.position.y = height/2 //side scrolling camera
	camera.position.x = goat.position.x //placing goat in center of screen

	if (goat.overlap(water)){
		splash.play();
	}

	if (goat.overlap(birds)){
		squawk.play();
	}

	if(goat.position.x >= SCENE_W){ //so that the goat stops and does not go off the screen
    goat.position.x = SCENE_W;
		goat.velocity.x = 0;
		goat.velocity.y = 0;
		state = 5;
		goat.position.x = width/2;
		camera.position.x = goat.position.x;
	} else if (goat.overlap(water) || goat.overlap(birds)){ //collision for water is a little bit off, not sure why
		state = 4;
		goat.velocity.x = 0;
		goat.velocity.y = 0;
		goat.position.x = width/2; // not sure what happened to the goat, when you retry the game
		camera.position.x = goat.position.x;
	}

	image(farm, SCENE_W + width/2 - 300, height /2 + 13, 600, 500);

	drawSprites();
}

function howToPlay(){ //code for rules page (STATE = 3)
	textSize(100);
  for (let i = 0; i < howtoplaywords.length; i ++){
		text(howtoplaywords[i], xpos, ypos + random(-2, 2));
		xpos += textWidth(howtoplaywords[1])
	}
	xpos = 250;

	textSize(30);
	strokeWeight(5);
	for (let x = 50; x < width; x += 100) {
		image(grassimg, x, height - 50, 100, 100);
	}
	//instructions
	text('allow computer access to your mic &', width/2, 200);
	text('yell to guide the goat home.', width/2, 250);
	text('the louder you yell, the higher the goat jumps.', width/2, 300);
	text('try not to run into the birds or drown', width/2, 350);
	textSize(50);
	text('press ENTER to start the game', width/2, 430);
}

function loseScreen(){ //code for lose (STATE = 4)
	textSize(100);
  for (let i = 0; i < losewords.length; i ++){
		text(losewords[i], xpos, ypos + random(-2, 2));
		xpos += textWidth(losewords[1])
	}
	xpos = 275;

	image(goatlost, width/2, 330, 450, 450); //goat lost
	textSize(50);
	text('press ENTER to try again', width/2, 480);
	text('press OPTION to learn how to play', width/2, 550);
	for (let x = 50; x < width; x += 100) {
		image(waterimg, x, height - 50, 100, 100);
	}
}

function winScreen(){ //code for win (STATE = 5)
	textSize(100);
  for (let i = 0; i < winwords.length; i ++){
		text(winwords[i], xpos, ypos + random(-2, 2));
		xpos += textWidth(winwords[1]);
	}
	xpos = 375;

	image(twogoats, width/2, 330, 650, 450); //goat is back with goat dad image
	textSize(50);
	text('press ENTER to play again', width/2, 525);
	for (let x = 50; x < width; x += 100) {
		image(grassimg, x, height - 50, 100, 100);
	}
	image(farm, width - 300, height /2 + 13, 600, 500);
}

function keyPressed(){ //control which screen you are on
  if (state == 1 || state == 4 || state == 5){
    if (keyCode == ENTER){ // press enter to start game
      state = 2;
    } else if (keyCode == OPTION){
			state = 3;
		}
  }
	// if (state == 2){
	// 	if (keyCode == LEFT_ARROW){ //go back to home screen (COMMENT OUT LATER)
	// 		state = 1;
	// 	}
	// }
	if (state == 3){
		// if (keyCode == LEFT_ARROW){ //go back to home screen (COMMENT OUT LATER)
		// 	state = 1;
		// }
		if (keyCode == ENTER){ //start game
			state = 2;
		}
	}
	if (state == 4){
		if (keyCode == ENTER){ //start game
			state = 2;
		} else if (keyCode == OPTION){
			state = 3;
		}
	}
	if (state == 5){
		if (keyCode == ENTER){ //start game
			state = 2;
		} else if (keyCode == OPTION){
			state = 3;
		}
	}

	if (keyCode == CONTROL){ //go to lose screen (COMMENT OUT LATER)
		state = 4
	}
	if (keyCode == SHIFT){ //go to win screen (COMMENT OUT LATER)
		state = 5;
	}
	// console.log(state) //log state # to console (COMMENT OUT LATER)
}
