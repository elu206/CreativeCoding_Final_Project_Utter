//test to make birds a class - did not work
class Birds{
  constructor(x, y, speed){ //creating birds
    this.x = x; //x position
    this.speed = speed; //speed of movement
		this.birdsprites = createSprite(this.x, this.y)
  }

  display(){
    this.birdsprites.addImage(bird);
		this.birdsprites.setCollider("circle", 0, 0, 10)
  }

  move(){ //move clouds across the screen
    this.birdsprites.velocity.x = this.speed
    if (this.birdsprites.collide(goat)){
      state = 4
    }
  }

}
