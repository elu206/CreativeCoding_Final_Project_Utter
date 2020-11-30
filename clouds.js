class Clouds{
  constructor(x, y, speed){ //creating clouds
    this.x = x; //x position
    this.y = y; //y position
    this.speed = speed; //speed of movement
  }

  display(){ //draw clouds
    imageMode(CORNER);
    image(myCloud, this.x, this.y, 500, 300); //cloud
  }

  move(){ //move clouds across the screen
    this.x += this.speed;
    if (this.x > width){ //screen wrapping cloud movement
      this.x = -500;
    }
  }

}
