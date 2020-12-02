//this is just where i am working to test out the actual game before compiling everything

let grass;
let mic;
let ground;
let gravity = 0.3;
let jump = -0.3;
let SCENE_W = 1300 * 10;

function preload(){
	grassimg = loadImage('grass.png');
	idlegoat= loadImage('idlegoat.png');
	water = loadImage('thewater.png');
}

function setup(){
	createCanvas(1300, 725);
	// mic = new p5.AudioIn();
	// mic.start();
	ground = new Group();
	for (let x = 50; x < width; x += 100) {
		grass = createSprite(x, height - 50);
		grass.addImage(grassimg);
		ground.add(grass);
	}

	for (let x2 = width; x2< SCENE_W + width; x2 += 100){
		grass = createSprite(x2, height - 50);
		grass.addImage(grassimg);
		ground.add(grass);
	}

	goat = createSprite(width/2, height-100);
	goat.addImage(idlegoat);

}

function draw(){
	background(100);
	game();

}

function game(){
	// let vol = mic.getLevel();
	// if (vol >= 0.1){
	// 	goat.velocity.y = jump;
	// }
	// goat.velocity.y += gravity;
	goat.velocity.x = 10;


	camera.position.y = height/2
	camera.position.x = goat.position.x + width/4

	if(goat.position.x < 0){
    goat.position.x = 0;
	}

	if(goat.position.x > SCENE_W){
    goat.position.x = SCENE_W;
	}


	goat.collide(ground);
	drawSprites();
}
