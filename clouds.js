class Clouds{
  constructor(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  display(){
    imageMode(CORNER);
    image(myCloud, this.x, this.y, 500, 300);
  }

  move(){
    this.x += this.speed;
    if (this.x > width){
      this.x = -500;
    }
  }

}
