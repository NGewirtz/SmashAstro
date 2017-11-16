import Enemy from './enemy';

class Astro extends Enemy {
  constructor(level, size, type, posX, posY, speed, angle) {
    super(level, size, type, posX, posY, speed, angle);
    this.score = this.size.width === 8 ? 200 : 100;
  }
}

export default Astro;
