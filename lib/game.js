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
    this.level = 1;
    this.sounds = false;
    this.gameOver = false;
  }

  draw(ctx) {
    const level = this.checkLevel();
    this.checkCollision();
    this.checkGameOver();
    this.addEnemies();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.drawShip(this.ship, ctx);
    this.drawBullets(this.bullets, ctx);
    this.drawEnemies(this.astros.concat(this.hurricanes), ctx);
    this.displayGameState(ctx);
    this.borderColorHurricaneAlert();
    this.setLevel(level);
  }

  drawShip(ship, ctx) {
    const shipImg = new Image(30, 30);
    shipImg.src = './imgs/ship3.png';
    ctx.drawImage(shipImg, ship.posX, ship.posY);
  }

  drawBullets(bullets, ctx) {
    bullets.forEach(bullet => {
      bullet.posY -= 6;
      if (bullet.posY < 0) {
        this.removeObject(bullet);
      }
      ctx.fillStyle = "white";
      ctx.fillRect(bullet.posX, bullet.posY, 2, 6);
    });
  }

  drawEnemies(enemies, ctx) {
    enemies.forEach(enemy => {
      enemy.posY += enemy.speed;
      enemy.posX += enemy.angle;
      this.outOfBoundsCheck(enemy);
      const enemyImg = new Image;
      enemyImg.src = enemy.img;
      ctx.drawImage(enemyImg, enemy.posX, enemy.posY);
    });
  }

  borderColorHurricaneAlert() {
    const canvas = document.getElementById("game");
    const color = this.hurricanes.length > 0 ? "red" : "white";
    canvas.style.borderColor = color;
  }

  displayGameState(ctx) {
    ctx.font = "12px Comic Sans MS";
    const color = this.hurricanes.length > 0 ? "red" : "white";
    ctx.fillStyle = color;
    const displayLives = this.lives === -1 ? " -" : this.lives;
    ctx.fillText(`Score :${this.score}`,10,20);
    ctx.fillText(this.getNextLevelText(),10,40);
    ctx.fillText(`Lives :${displayLives}`,240,20);
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  addEnemies() {
    if (this.astros.length < 6 && (Math.random() > .95)) {
      this.astros.push(new Astro(this.level));
    }
    if (Math.floor(Math.random() * 1000) > 997) {
      this.hurricanes.push(new Hurricane(this.level));
    }
  }

  outOfBoundsCheck(enemy) {
    if(enemy.posY > 300){
      if (enemy instanceof Hurricane) {
        this.loseLife();
      }else{
        this.score -= 20;
      }
      this.removeObject(enemy);
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

  checkCollision() {
    const enemies = this.astros.concat(this.hurricanes);
    enemies.forEach(enemy => {
      if (((enemy.posY + enemy.size.height) >= 285)
      && this.shipHitEnemy(enemy)) {
        this.removeObject(enemy);
        this.loseLife();
      }else if (this.shotEnemy(enemy)){
        this.resolveShotEnemy(enemy);
        this.playGameSounds('./sounds/beat2.wav');
      }
    });
  }

  playGameSounds(audioFile) {
    if (this.sounds) {
      new Audio(audioFile).play();
    }
  }

  loseLife(){
    this.lives -= 1;
    const container = document.querySelector(".container");
    container.classList.add("shake");
    this.playGameSounds('./sounds/bangLarge.wav');
    setTimeout(function(){
      container.classList.remove("shake");
   }, 1000);
  }

  shipHitEnemy(enemy) {
    const shipEnd = this.ship.posX + this.ship.width;
    const enemyEnd = enemy.posX + enemy.size.width;
    if (enemy.posX < this.ship.posX) {
      if (enemyEnd >= this.ship.posX) {
        return true;
      }
    } else if (enemy.posX === this.ship.posX) {
      return true;
    }else if (shipEnd >= enemy.posX ){
      return true;
    }
    return false;
  }

  shotEnemy(enemy) {
    const enemyXEnd = enemy.posX + enemy.size.width;
    const enemyYEnd = enemy.posY + enemy.size.height;
    let hit = false;
    this.bullets.forEach(bullet => {
      if( ( (bullet.posX >= enemy.posX) && bullet.posX <= enemyXEnd) &&
      (bullet.posY >= enemy.posY && bullet.posY <= enemyYEnd ) ){
        this.removeObject(bullet);
        hit = true;
      }
    });
    return hit;
  }

  resolveShotEnemy(enemy) {
    if (enemy.size.width === 16 && enemy.type === "astro") {
      const newAstros = this.createSmallAstros(enemy);
      this.astros.push(...newAstros);
    }
    this.score += enemy.score;
    this.removeObject(enemy);
  }

  createSmallAstros(astro){
    const newAstros = [];
    const size = { height: 8, width: 8 };
    [-Math.random()/2, Math.random()/2].forEach(angle => {
      newAstros.push(new Astro(this.level, size, "astro", astro.posX, astro.posY, undefined, angle));
    });
    return newAstros;
  }

  checkLevel() {
    if (this.score < 1000) {
      return 1;
    }else if (this.score >= 1000 && this.score < 4000) {
      return 2;
    }else if (this.score >= 4000 && this.score < 10000){
      return 3;
    }else {
      return 4;
    }
  }

  setLevel(level) {
    this.level = level;
  }

  checkGameOver() {
    if (this.lives < 0) {
      this.gameOver = true;
    }
  }

  resetGame(callBack) {
    this.score = 0;
    this.lives = 5;
    this.astros = [];
    this.hurricanes = [];
    this.bullets = [];
    this.ship.posX = 143;
    this.gameOver = false;
    this.level = 1;
    document.removeEventListener("keydown", callBack);
  }

  toggleSounds() {
    this.sounds = !this.sounds;
  }

  getNextLevelText() {
    if(this.level === 1) {
      return "Next Level :1000";
    }else if(this.level === 2) {
      return "Next Level :4000";
    }else if(this.level === 3){
      return "Next Level :10000";
    }else {
      return "Final Level!";
    }
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 600;

export default Game;
