class Astro {
  constructor() {
    this.posX = this.randX();
    this.posY = 0;
    this.speed = this.randSpeed();
    this.angle = this.randAngle();
  }
  
  randX() {
    return Math.floor(Math.random() * 300);
  }
  
  randAngle() {
    const angles = [-2.5,-2,-1,-.5,.5,1,2,2.5];
    const idx = Math.floor(Math.random() * angles.length);
    return angles[idx];
  }
  
  randSpeed(level) {
    const weightSpeed = Math.floor(Math.random() * 100)
    if (weightSpeed > 90) {
      return 3;
    }else if (weightSpeed > 50) {
      return 2;
    }else {
      return 1;
    }
  }
}

export default Astro;