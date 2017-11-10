import Ship from './ship.js';
import Bullet from './bullet.js';
import Astro from './astro.js'
class Game {
  constructor() {
    this.ship = new Ship(this);
    this.bullets = [];
    this.astros = [new Astro];
    this.hurricane = [];
    this.score = 0;
  }
  
  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(this.ship.posX, this.ship.posY, this.ship.width, this.ship.height);
    this.bullets.forEach(bullet => {
      bullet.posY -= 4;
      ctx.fillRect(bullet.posX, bullet.posY, 2, 2);
    })
    this.astros.forEach(astro => {
      astro.posY += astro.speed
      astro.posX += astro.angle
      ctx.fillRect(astro.posX, astro.posY, 10, 10);
    })
  }
  
  addBullet(bullet) {
    this.bullets.push(bullet)
  }
  
  addAstro() {
    this.astros.push (new Astro());
  }
  
}

Game.DIM_X = 800;
Game.DIM_Y = 600;




export default Game;