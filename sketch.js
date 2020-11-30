//Final Project: Game Development
//Game Title: Go Home, Goat!
//Concept: a game where the mechanics are similar to the app game Scream Go Hero: audio input makes your character move & jump based on volume.  However, in this game, the theme is very different.  You play as a kid goat who is lost and trying to make his way back home.

let state = 1; // tell which screen its on
let cloud1, cloud2, cloud3;

function preload(){
  sky = loadImage('images/background sky.png');
  goathead = loadImage('images/goat head.png');
  myFont = loadFont('fonts/FredokaOne-Regular copy.ttf');
  myCloud = loadImage('images/clouds.png');
}

function setup() {
  createCanvas(1300, 750);
  cloud1 = new Clouds(200, 100, 1.5)
  cloud2 = new Clouds(1000, 250, 2)
  cloud3 = new Clouds(750, 400, 1)
}

function draw(){
  imageMode(CORNER)
  background(sky);
  cloud1.display();
  cloud2.display();
  cloud3.display();
  cloud1.move();
  cloud2.move();
  cloud3.move();
  if (state == 1){
    startScreen();
  } else if (state == 2){
    game();
  }
}

function startScreen(){ //code for home screen
  fill(255);
  strokeWeight(10);
  stroke(163, 71, 255)
  textSize(100);
  textFont(myFont);
  textAlign(CENTER);
  text('GO HOME, GOAT!', width/2, 150); //title
  textSize(50);
  text('press enter to start', width/2, 550);
  imageMode(CENTER)
  image(goathead, width/2, height/2, 500, 500)
}

function game(){ //code for game

}

function keyPressed(){
  if (state == 1){
    if (keyCode == ENTER){ // press enter to start game
      state += 1
    }
  }
}
