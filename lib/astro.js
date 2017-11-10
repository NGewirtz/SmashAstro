class Astro {
  constructor(posX, posY, speed, angle, size) {
    this.posX = posX || this.randX();
    this.posY = posY || 0;
    this.speed = speed || this.randSpeed();
    this.angle = angle || this.randAngle();
    this.size = size || this.randSize();
    this.color = "black"
  }
  
  randX() {
    return Math.floor(Math.random() * 283);
  }
  
  randAngle() {
    const angles = [-1.75, -1.5, -1.25, -1, -.75, -.5, .5, .75, 1, 1.25, 1.5, 1.75];
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
  
  randSize() {
    const weightSize = Math.floor(Math.random() * 100)
    if (weightSize < 75) {
      return {
        size: 'large',
        width: 16,
        height: 12
      }
    }else {
      return {
        size: 'small',
        width: 8,
        height: 6
      }
    }
  }
}

export default Astro;