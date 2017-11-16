import Enemy from './enemy';

class Astro extends Enemy {
  constructor(level, size, type, posX, posY, speed, angle) {
    super(level, size, type, posX, posY, speed, angle);
    this.score = this.size.width === 8 ? 100 : 50;
    this.img = this.size.width === 8 ? "./imgs/Asteroid3.png" : "./imgs/Asteroid2.png";
  }
}

export default Astro;
