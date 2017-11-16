class Enemy {
  constructor(level, size = this.randSize(), type = "astro", posX = this.randX(), posY = 0, speed = this.randSpeed(level), angle = 0) {
    this.posX = posX;
    this.type = type;
    this.posY = posY;
    this.speed = speed;
    this.angle = angle;
    this.size = size;
  }

  randX() {
    return Math.floor(Math.random() * 283);
  }

  randSpeed(level) {
    const weightSpeed = Math.floor(Math.random() * 100);
    if (weightSpeed > Enemy.ODDS[level][0]) {
      return Enemy.SPEEDS[level][0];
    }else if (weightSpeed > Enemy.ODDS[level][1]) {
      return Enemy.SPEEDS[level][1];
    }else {
      return Enemy.SPEEDS[level][2];
    }
  }

  randSize() {
    const weightSize = Math.floor(Math.random() * 100);
    return weightSize < 75 ? { height: 16, width: 16 } : { height: 8, width: 8 };
  }

}

Enemy.ODDS = {
  1: [85, 40],
  2: [50, 10],
  3: [80, 35],
  4: [50, 10]
};

Enemy.SPEEDS = {
  1: [2.25,1.5,.75],
  2: [2.5,1.75,1],
  3: [3.5,2.5,1.5],
  4: [4,3,2]
};

export default Enemy;
