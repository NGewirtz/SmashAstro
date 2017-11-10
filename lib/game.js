import Ship from './ship.js';
import Bullet from './bullet.js';
import Astro from './astro.js';
import Hurricane from './hurricane.js';

class Game {
  constructor() {
    this.ship = new Ship(this);
    this.bullets = [];
    this.astros = [];
    this.hurricanes = [];
    this.score = 0;
    this.lives = 5;
  }
  
  draw(ctx) {
    const astros = this.astros;
    this.checkCollision();
    this.addAstro();
    this.drawShip(this.ship, ctx);
    this.drawBullets(this.bullets, ctx);
    this.drawEnemies(this.astros.concat(this.hurricanes), ctx);
    this.displayGameState(ctx);
  }
  
  drawShip(ship, ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = ship.color;
    ctx.fillRect(ship.posX, ship.posY, ship.width, ship.height);
  }
  
  drawBullets(bullets, ctx) {
    bullets.forEach(bullet => {
      bullet.posY -= 6;
      if (bullet.posY < 0) {
        this.removeObject(bullet)
      }
      ctx.fillStyle = "black";
      ctx.fillRect(bullet.posX, bullet.posY, 2, 6);
    })
  }
  
  drawEnemies(enemies, ctx) {
    enemies.forEach(enemy => {
      enemy.posY += enemy.speed
      enemy.posX += enemy.angle
      this.outOfBoundsCheck(enemy);
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.posX, enemy.posY, enemy.size.width, enemy.size.height);
    })
  }
  
  displayGameState(ctx) {
    ctx.font = "8px";
    const color = this.hurricanes.length > 0 ? "red" : "black";
    ctx.fillStyle = color
    ctx.fillText(`Score :${this.score}`,20,8);
    ctx.fillText(`Lives :${this.lives}`,240,8);
  }
  
  addBullet(bullet) {
    this.bullets.push(bullet)
  }
  
  addAstro() {
    if (this.astros.length < 5 && (Math.random() > .95)) {
      this.astros.push(new Astro());
    }
    if (Math.floor(Math.random() * 1000) > 997) {
      this.hurricanes.push(new Hurricane());
    }
  }
  
  outOfBoundsCheck(enemy) {
    if (enemy instanceof Hurricane) {
      if (enemy.posY > 150) {
        this.removeObject(enemy);
        this.loseLife()
      }else if (enemy.posX <= 0 || enemy.posX + enemy.size.width > 300) {
        enemy.angle = enemy.angle * -1;
      }
    }else {
      if (enemy.posY > 150) {
        this.score -= 20
        console.log(this.score)
      }
      if (enemy.posX <= 0 || enemy.posX > 300 || enemy.posY > 150) {
        this.removeObject(enemy);
      }
    }
  }
  
  removeObject(object) {
    if (object instanceof Bullet) {
     this.bullets.splice(this.bullets.indexOf(object), 1);
   } else if (object instanceof Hurricane) {
     this.hurricanes.splice(this.hurricanes.indexOf(object), 1);
   } else if (object instanceof Astro) {
     this.astros.splice(this.astros.indexOf(object), 1);
   } 
  }
  
  checkShotAstro() {
    
  }
  
  checkCollision() {
    this.astros.concat(this.hurricanes).forEach(astro => {
      if (((astro.posY + astro.size.height) >= 135) && this.shipHitAstro(astro)) {
        this.removeObject(astro)
        this.loseLife()
      }else if (this.shotAstro(astro)){
        this.resolveShotAstro(astro)
      }
    });
  }
  
  loseLife(){
    this.lives -= 1;
    console.log("lives "+ this.lives)
  }
  
  shipHitAstro(astro) {
    const shipEnd = this.ship.posX + this.ship.width;
    const astroEnd = astro.posX + astro.size.width;
    if (astro.posX < this.ship.posX) {
      if (astroEnd >= this.ship.posX) {
        return true;
      }
    } else if (astro.posX === this.ship.posX) {
      return true;
    }else if (shipEnd >= astro.posX ){
      return true;
    }
    return false;
  }
  
  shotAstro(astro) {
    const astroXEnd = astro.posX + astro.size.width;
    const astroYEnd = astro.posY + astro.size.height;
    let hit = false;
    this.bullets.forEach(bullet => {
      if( ( (bullet.posX >= astro.posX) && bullet.posX <= astroXEnd) &&
      (bullet.posY >= astro.posY && bullet.posY <= astroYEnd ) ){
        this.removeObject(bullet)
        hit = true;
      }
    })
    return hit;
  }
  
  resolveShotAstro(astro) {
    if (astro.size.size === "small") {
      this.removeObject(astro);
      this.score += 100
      console.log(this.score)
    }else if (astro.size.size === "large"){
      const newAstroLeft =  new Astro(astro.posX, astro.posY, null, -1.25, {
        size: 'small',
        width: 8,
        height: 6
      })
      const newAstroRight =  new Astro(astro.posX, astro.posY, null, 1, {
        size: 'small',
        width: 8,
        height: 6
      })
      this.astros.push(newAstroLeft, newAstroRight);
      this.removeObject(astro)
      this.score += 50;
      console.log(this.score);
    }else if (astro.size.size === "hurricane") {
      this.removeObject(astro);
      this.score += 200
      console.log(this.score)
    }
  }
  
}

Game.DIM_X = 800;
Game.DIM_Y = 600;




export default Game;