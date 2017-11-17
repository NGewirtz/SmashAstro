/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Bullet {
  constructor(posX){
    this.posX = posX + 6;
    this.posY = 285;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(7);


class Astro extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
  constructor(level, size, type, posX, posY, speed, angle) {
    super(level, size, type, posX, posY, speed, angle);
    this.score = this.size.width === 8 ? 100 : 50;
    this.img = this.size.width === 8 ? "./imgs/Asteroid3.png" : "./imgs/Asteroid2.png";
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Astro);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_js__ = __webpack_require__(6);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
  canvas.height = 300;
  canvas.width = 300;
  const view = new __WEBPACK_IMPORTED_MODULE_1__view_js__["a" /* default */](game, ctx);
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    view.start();
    view.toggleAudio();
  });
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__astro_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hurricane_js__ = __webpack_require__(5);





class Game {
  constructor() {
    this.ship = new __WEBPACK_IMPORTED_MODULE_0__ship_js__["a" /* default */](this);
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
    this.checkCollision();
    this.checkGameOver();
    this.addEnemies();
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
      const enemyImg = new Image;
      enemyImg.src = enemy.img;
      ctx.drawImage(enemyImg, enemy.posX, enemy.posY);
    });
  }

  playHurricaneAudio() {
    if (this.hurricanes.length > 0 && this.sounds) {
      const audio = new Audio('./sounds/space1.wav');
      audio.volume = .2;
      audio.play();
    }
  }

  displayGameState(ctx) {
    ctx.font = "12px Comic Sans MS";
    const color = this.hurricanes.length > 0 ? "red" : "white";
    ctx.fillStyle = color;
    const displayLives = this.lives === -1 ? 0 : this.lives;
    ctx.fillText(`Score :${this.score}`,10,20);
    ctx.fillText(`Lives :${displayLives}`,240,20);
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  addEnemies() {
    if (this.astros.length < 6 && (Math.random() > .95)) {
      this.astros.push(new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](this.level));
    }
    if (Math.floor(Math.random() * 1000) > 997) {
      this.hurricanes.push(new __WEBPACK_IMPORTED_MODULE_3__hurricane_js__["a" /* default */](this.level));
    }
  }

  outOfBoundsCheck(enemy) {
    if(enemy.posY > 300){
      if (enemy instanceof __WEBPACK_IMPORTED_MODULE_3__hurricane_js__["a" /* default */]) {
        this.loseLife();
      }else{
        this.score -= 20;
      }
      this.removeObject(enemy);
    }
  }

  removeObject(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bullet_js__["a" /* default */]) {
     this.bullets.splice(this.bullets.indexOf(object), 1);
   } else if (object instanceof __WEBPACK_IMPORTED_MODULE_3__hurricane_js__["a" /* default */]) {
     this.hurricanes.splice(this.hurricanes.indexOf(object), 1);
   } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */]) {
     this.astros.splice(this.astros.indexOf(object), 1);
   }
  }

  checkCollision() {
    const enemies = this.astros.concat(this.hurricanes);
    enemies.forEach(enemy => {
      if (((enemy.posY + enemy.size.height) >= 285) && this.shipHitEnemy(enemy)) {
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
      newAstros.push(new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](this.level, size, "astro", astro.posX, astro.posY, undefined, angle));
    });
    return newAstros;
  }

  setLevel() {
    if (this.score < 1000) {
      this.level = 1;
    }else if (this.score >= 1000 && this.score < 4000) {
      this.level = 2;
    }else if (this.score >= 4000 && this.score < 10000){
      this.level = 3;
    }else {
      this.level = 4;
    }
  }

  checkGameOver() {
    if (this.lives < 0) {
      this.gameOver = true;
    }
  }

  resetGame(cb) {
    this.score = 0;
    this.lives = 5;
    this.astros = [];
    this.hurricanes = [];
    this.bullets = [];
    this.ship.posX =143;
    this.gameOver = false;
    this.level = 1;
    document.removeEventListener("keydown", cb);
  }

  toggleSounds() {
    this.sounds = !this.sounds;
  }

}

Game.DIM_X = 800;
Game.DIM_Y = 600;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(0);


class Ship {
  constructor(game) {
    this.game = game;
    this.posX = 143;
    this.posY = 285;
    this.height = 15;
    this.width = 8;
  }

  shoot() {
    const bullet = new __WEBPACK_IMPORTED_MODULE_0__bullet__["a" /* default */](this.posX);
    this.game.addBullet(bullet);
    this.game.playGameSounds('./sounds/fire.wav');
  }

  move(dir) {
    if (dir === "left") {
      this.posX = this.posX <= 8 ? 0 : this.posX - 8;
    }else {
      this.posX = this.posX >= 277 ? 285 : this.posX + 8;
    }
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Ship);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(7);


class Hurricane extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */] {
  constructor(level) {
    super(level, { height:16, width: 16 }, "hurricane");
    this.speed = .5 * level;
    this.score = 200;
    this.img = "./imgs/meteor2.gif";
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Hurricane);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class View {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.stars = this.setStars();
    this.music = this.setMusic();
    this.volume = 0;
    this.paused = false;
    this.viewInstructions = true;
  }

  setMusic() {
    const audio = new Audio('./sounds/throughspace.ogg');
    audio.loop = true;
    audio.volume = 0;
    audio.play();
    return audio;
  }

  setStars() {
    const stars = [];
    for(let i = 0; i < 200; i++) {
      stars.push([Math.floor(Math.random() * 300),
      Math.floor(Math.random() * 220)]);
    }
    return stars;
  }

  bindKeyHandlers() {
    const ship = this.game.ship;
    key("left", () => { ship.move("left"); } );
    key("right", () => { ship.move("right"); });
    key("space", () => { ship.shoot(); } );
    key("s", () => { this.toggleAudio(); } );
    key("p", () => { this.togglePaused(); });
  }

  drawBackgroundMountains(ctx) {
    ctx.beginPath();
    ctx.moveTo(0,250);
    ctx.lineTo(50, 220);
    ctx.lineTo(220, 260);
    ctx.lineTo(260, 240);
    ctx.lineTo(300, 240);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  drawBackground(ctx) {
    ctx.fillStyle = "white";
    this.stars.forEach(([x, y]) => {
      ctx.fillRect(x, y, 1, 1);
    });
    this.drawBackgroundMountains(ctx);
  }

  start() {
    this.bindKeyHandlers();
    game.style.display = "inline";
    instructions.style.display = "none";
    requestAnimationFrame(this.animate.bind(this));
  }

  toggleAudio() {
    this.volume = this.volume === 0 ? 1 : 0;
    this.music.volume = this.volume;
    this.game.toggleSounds();
  }

  togglePaused() {
    this.paused = !this.paused;
    if (this.paused) {
      this.displayPaused();
    }else{
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  displayPaused() {
    this.ctx.font = "32px Comic Sans MS";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("PAUSED",85,120);
  }

  handleGameOver() {
    this.ctx.font = "32px Comic Sans MS";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER",60,120);
    this.ctx.font = "16px Comic Sans MS";
    this.ctx.fillText("Press R to play again.",75,180);
    const cb = document.addEventListener("keydown", (e) => {
      if(e.key === "r") {
        this.game.resetGame(cb);
        requestAnimationFrame(this.animate.bind(this));
      }
    });
  }

  setBackgroundColor() {
    const level = this.game.level;
    const background = document.getElementById("game");
    switch(level) {
      case 1:
        background.className = "black";
        break;
      case 2:
        background.className = "blue";
        break;
      case 3:
        background.className = "grey";
        break;
      case 4:
        background.className = "black";
    }
  }

  animate() {
    if (this.game.gameOver) {
      this.handleGameOver();
    }else if (!this.paused) {
      this.game.draw(this.ctx);
      this.drawBackground(this.ctx);
      this.setBackgroundColor();
      requestAnimationFrame(this.animate.bind(this));
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    const small = { height: 8, width: 8 };
    const large = { height: 16, width: 16 };
    return weightSize < 75 ? large : small;
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

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map