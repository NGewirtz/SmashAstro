import Enemy from './enemy.js';

class Hurricane extends Enemy {
  constructor(level) {
    super(level, { height:16, width: 16 }, "hurricane");
    this.speed = .5 * level;
    this.score = 200;
    this.img = "./imgs/meteor2.gif";
  }
}

export default Hurricane;
