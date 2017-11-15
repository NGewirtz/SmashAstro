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
  }

  draw(ctx) {
    const astros = this.astros;
    this.checkCollision();
    this.checkGameOver();
    this.addAstro();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.drawShip(this.ship, ctx);
    this.drawBullets(this.bullets, ctx);
    this.drawEnemies(this.astros.concat(this.hurricanes), ctx);
    this.displayGameState(ctx);
    this.playHurricaneAudio();
    this.setLevel();
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
      let enemyImg;
      if (enemy.size.size === "large") {
        enemyImg = new Image(16, 16);
        enemyImg.src = './imgs/Asteroid2.png';
      }else if (enemy.size.size === "small") {
        enemyImg = new Image(8, 8);
        enemyImg.src = './imgs/Asteroid3.png';
      }else if (enemy.size.size === "hurricane") {
        enemyImg = new Image(16, 16);
        enemyImg.src = './imgs/hurricane.png';
      }
      ctx.drawImage(enemyImg, enemy.posX, enemy.posY);
    });
  }

  playHurricaneAudio() {
    if (this.hurricanes.length > 0) {
      const audio = new Audio('./sounds/space1.wav');
      audio.volume = .2;
      audio.play();
    }
  }

  displayGameState(ctx) {
    ctx.font = "12px Comic Sans MS";
    const color = this.hurricanes.length > 0 ? "red" : "white";
    ctx.fillStyle = color;
    ctx.fillText(`Score :${this.score}`,10,20);
    ctx.fillText(`Lives :${this.lives}`,240,20);
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  addAstro() {
    if (this.astros.length < 6 && (Math.random() > .95)) {
      this.astros.push(new Astro(this.level));
    }
    if (Math.floor(Math.random() * 1000) > 997) {
      this.hurricanes.push(new Hurricane(this.level));
    }
  }

  outOfBoundsCheck(enemy) {
    if (enemy instanceof Hurricane) {
      if (enemy.posY > 300) {
        this.removeObject(enemy);
        this.loseLife();
      }else if (enemy.posX <= 0 || enemy.posX + enemy.size.width > 300) {
        enemy.angle = enemy.angle * -1;
      }
    }else {
      if (enemy.posY > 300) {
        this.score -= 20;
      }
      if (enemy.posX <= 0 || enemy.posX > 300 || enemy.posY > 300) {
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

  checkCollision() {
    this.astros.concat(this.hurricanes).forEach(enemy => {
      if (((enemy.posY + enemy.size.height) >= 285) && this.shipHitEnemy(enemy)) {
        this.removeObject(enemy);
        this.loseLife();
      }else if (this.shotEnemy(enemy)){
        this.resolveShotEnemy(enemy);
        const audio = new Audio('./sounds/beat2.wav');
        audio.play();
      }
    });
  }

  loseLife(){
    this.lives -= 1;
    const container = document.querySelector(".container");
    container.classList.add("shake");
    const audio = new Audio('./sounds/bangLarge.wav');
    audio.play();
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
    if (enemy.size.size === "small") {
      this.removeObject(enemy);
      this.score += 100;
    }else if (enemy.size.size === "large"){
      const angle = enemy.angle > 0 ? enemy.angle : -enemy.angle;
      const newAstroLeft = new Astro(this.level, enemy.posX, enemy.posY, null, -.25, {
        size: 'small',
        width: 8,
        height: 6
      });
      const newAstroRight = new Astro(this.level, enemy.posX, enemy.posY, null, .25, {
        size: 'small',
        width: 8,
        height: 6
      });
      this.astros.push(newAstroLeft, newAstroRight);
      this.removeObject(enemy);
      this.score += 50;
    }else if (enemy.size.size === "hurricane") {
      this.removeObject(enemy);
      this.score += 200;
    }
  }

  setLevel() {
    if (this.score < 1000) {
      this.level = 1;
      document.getElementById("game").className = "black";
    }else if (this.score >= 1000 && this.score < 4000) {
      this.level = 2;
      document.getElementById("game").className = "blue";
    }else if (this.score >= 4000 && this.score < 10000){
      this.level = 3;
      document.getElementById("game").className = "grey";
    }else {
      this.level = 4;
      document.getElementById("game").className = "black";
    }
  }

  checkGameOver() {
    if (this.lives < 0) {
      alert("Game Over. Click OK to play again!");
      this.score = 0;
      this.lives = 5;
      this.astros = [];
      this.hurricanes = [];
      this.bullets = [];
      this.ship.posX =143;
    }
  }

}

Game.DIM_X = 800;
Game.DIM_Y = 600;

export default Game;
