//this is just where i am working to test out the actual game before compiling everything

let grass;
let mic;
let ground;
let gravity = 0.3;
let jump = -3;
let SCENE_W = 1300 * 10;

function preload(){
	grassimg = loadImage('grass copy.png');
	idlegoat= loadImage('idlegoat copy.png');
	water = loadImage('thewater copy.png');
}

function setup(){
	createCanvas(1300, 725);
	mic = new p5.AudioIn(); //allowing for microphone input
	mic.start();
	ground = new Group();
	for (let x = 50; x < width; x += 100) { //creating grass sprites
		grass = createSprite(x, height - 50);
		grass.addImage(grassimg);
		ground.add(grass);
	}

	for (let x2 = width; x2< SCENE_W + width; x2 += 100){
		grass = createSprite(x2, height - 50);
		grass.addImage(grassimg);
		ground.add(grass);
	}

	goat = createSprite(width/2, height-100); //creating goat sprite
	goat.addImage(idlegoat);

}

function draw(){
	background(100);
	game();
}

function game(){
	let vol = mic.getLevel(); //getting volume of microphone
	if (vol >= 0.1){
		goat.velocity.y = jump; //if volume is greater than 0.1, then goat jumps
	}
	goat.velocity.y += gravity; //gravity brings goat back to ground
	goat.velocity.x = 10; //x speed of goat - BUG: glitching x movement when not jumping... not sure why yet

	camera.position.y = height/2 //side scrolling camera
	camera.position.x = goat.position.x //placing goat in center of screen

	if(goat.position.x > SCENE_W){ //so that the goat stops and does not go off the screen
    goat.position.x = SCENE_W;
	}

	goat.collide(ground); //collision detection for goat & grass sprites
	drawSprites();
}
