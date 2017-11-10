import Ship from './ship.js';
import Bullet from './bullet.js';
import Astro from './astro.js'
class Game {
  constructor() {
    this.ship = new Ship(this);
    this.bullets = [];
    this.astros = [];
    this.hurricane = null;
    this.score = 0;
    this.lives = 3;
  }
  
  draw(ctx) {
    const ship = this.ship;
    const bullets = this.bullets;
    const astros = this.astros;
    this.addAstro();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(ship.posX, ship.posY, ship.width, ship.height);
    bullets.forEach(bullet => {
      bullet.posY -= 6;
      if (bullet.posY < 0) {
        this.removeObject(bullet)
      }
      ctx.fillRect(bullet.posX, bullet.posY, 2, 2);
    })
    astros.forEach(astro => {
      astro.posY += astro.speed
      astro.posX += astro.angle
      this.outOfBoundsCheck(astro);
      ctx.fillRect(astro.posX, astro.posY, 10, 10);
    })
  }
  
  addBullet(bullet) {
    this.bullets.push(bullet)
  }
  
  addAstro() {
    if (this.astros.length < 6 && (Math.random() > .95)) {
      this.astros.push (new Astro());
    }
  }
  
  outOfBoundsCheck(enemy) {
    if (enemy.posX < 0 || enemy.posX > 300 || enemy.posY > 150) {
      this.removeObject(enemy);
    }
  }
  
  removeObject(object) {
    if (object instanceof Bullet) {
     this.bullets.splice(this.bullets.indexOf(object), 1);
   } else if (object instanceof Astro) {
     this.astros.splice(this.astros.indexOf(object), 1);
   } else if (object instanceof Hurricane) {
     this.objects.hurricane = null;
   } 
  }
  
}

Game.DIM_X = 800;
Game.DIM_Y = 600;




export default Game;