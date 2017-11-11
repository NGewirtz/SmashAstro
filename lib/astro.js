class Astro {
  constructor(level, posX, posY, speed, angle, size) {
    this.posX = posX || this.randX();
    this.posY = posY || 0;
    this.speed = speed || this.randSpeed(level);
    this.angle = angle || this.randAngle();
    this.size = size || this.randSize();
  }
  
  randX() {
    return Math.floor(Math.random() * 283);
  }
  
  randAngle() {
    const angles = [-1.1, -.9, -.65, -.25, .25, .65, .9, 1.1];
    const idx = Math.floor(Math.random() * angles.length);
    return angles[idx];
  }
  
  randSpeed(level) {
    const weightSpeed = Math.floor(Math.random() * 100)
    const odds = {
      1: [85, 40],
      2: [50, 10],
      3: [80, 35],
      4: [50, 10]
    }
    const speeds = {
      1: [3,2,1],
      2: [3,2,1],
      3: [4,3,2],
      4: [4,3,2]
    }
    if (weightSpeed > odds[level][0]) {
      return speeds[level][0];
    }else if (weightSpeed > odds[level][1]) {
      return speeds[level][1];
    }else {
      return speeds[level][2];
    }
  }
  
  randSize() {
    const weightSize = Math.floor(Math.random() * 100)
    if (weightSize < 75) {
      return {
        size: 'large',
        width: 16,
        height: 16
      }
    }else {
      return {
        size: 'small',
        width: 8,
        height: 8
      }
    }
  }
}

export default Astro;