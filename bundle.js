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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_js__ = __webpack_require__(3);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
  canvas.height = 300;
  canvas.width = 300;
  const view = new __WEBPACK_IMPORTED_MODULE_1__view_js__["a" /* default */](game, ctx);
  view.start();
})


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__astro_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hurricane_js__ = __webpack_require__(8);





class Game {
  constructor() {
    this.ship = new __WEBPACK_IMPORTED_MODULE_0__ship_js__["a" /* default */](this);
    this.bullets = [];
    this.astros = [];
    this.hurricanes = [];
    this.score = 0;
    this.lives = 5;
    this.level = 0
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
    this.setLevel()
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
        this.removeObject(bullet)
      }
      ctx.fillStyle = "white";
      ctx.fillRect(bullet.posX, bullet.posY, 2, 6);
    })
  }
  
  drawEnemies(enemies, ctx) {
    enemies.forEach(enemy => {
      enemy.posY += enemy.speed
      enemy.posX += enemy.angle
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
    })
  }
  
  displayGameState(ctx) {
    ctx.font = "12px Comic Sans MS";
    const color = this.hurricanes.length > 0 ? "red" : "white";
    ctx.fillStyle = color
    ctx.fillText(`Score :${this.score}`,10,20);
    ctx.fillText(`Lives :${this.lives}`,240,20);
  }
  
  addBullet(bullet) {
    this.bullets.push(bullet)
  }
  
  addAstro() {
    if (this.astros.length < 6 && (Math.random() > .95)) {
      this.astros.push(new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](this.level));
    }
    if (Math.floor(Math.random() * 1000) > 997) {
      this.hurricanes.push(new __WEBPACK_IMPORTED_MODULE_3__hurricane_js__["a" /* default */](this.level));
    }
  }
  
  outOfBoundsCheck(enemy) {
    if (enemy instanceof __WEBPACK_IMPORTED_MODULE_3__hurricane_js__["a" /* default */]) {
      if (enemy.posY > 300) {
        this.removeObject(enemy);
        this.loseLife()
      }else if (enemy.posX <= 0 || enemy.posX + enemy.size.width > 300) {
        enemy.angle = enemy.angle * -1;
      }
    }else {
      if (enemy.posY > 300) {
        this.score -= 20
      }
      if (enemy.posX <= 0 || enemy.posX > 300 || enemy.posY > 300) {
        this.removeObject(enemy);
      }
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
    this.astros.concat(this.hurricanes).forEach(enemy => {
      if (((enemy.posY + enemy.size.height) >= 285) && this.shipHitEnemy(enemy)) {
        this.removeObject(enemy)
        this.loseLife()
      }else if (this.shotEnemy(enemy)){
        this.resolveShotEnemy(enemy)
      }
    });
  }
  
  loseLife(){
    this.lives -= 1;
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
        this.removeObject(bullet)
        hit = true;
      }
    })
    return hit;
  }
  
  resolveShotEnemy(enemy) {
    if (enemy.size.size === "small") {
      this.removeObject(enemy);
      this.score += 100
    }else if (enemy.size.size === "large"){
      const angle = enemy.angle > 0 ? enemy.angle : -enemy.angle 
      const newAstroLeft =  new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](this.level, enemy.posX, enemy.posY, null, -angle - .1, {
        size: 'small',
        width: 8,
        height: 6
      })
      const newAstroRight =  new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](this.level, enemy.posX, enemy.posY, null, angle + .1, {
        size: 'small',
        width: 8,
        height: 6
      })
      this.astros.push(newAstroLeft, newAstroRight);
      this.removeObject(enemy)
      this.score += 50;
    }else if (enemy.size.size === "hurricane") {
      this.removeObject(enemy);
      this.score += 200
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
      alert("Game Over. Click OK to play again");
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

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class View {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }
  
  bindKeyHandlers() {
    const ship = this.game.ship
    key("left", () => { ship.move("left")   });
    key("right", () => { ship.move("right") });
    key("space", () => { ship.shoot() });
  }
  
  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (View);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(5);


class Ship {
  constructor(game) {
    this.game = game;
    this.posX = 143;
    this.posY = 285;
    this.height = 15;
    this.width = 8;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, 10, 15);
  }
  
  shoot() {
    const bullet = new __WEBPACK_IMPORTED_MODULE_0__bullet__["a" /* default */](this.posX);
    this.game.addBullet(bullet);
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
class Bullet {
  constructor(posX){
    this.posX = posX + 3;
    this.posY = 285;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Astro {
  constructor(level, posX, posY, speed, angle, size) {
    this.posX = posX || this.randX();
    this.posY = posY || 0;
    this.speed = speed || this.randSpeed(level);
    this.angle = angle || this.randAngle();
    this.size = size || this.randSize();
  }
  
  randX() {
    return Math.floor(Math.random() * 283);
  }
  
  randAngle() {
    const angles = [-1.1, -.9, -.65, -.25, .25, .65, .9, 1.1];
    const idx = Math.floor(Math.random() * angles.length);
    console.log(idx)
    return angles[idx];
  }
  
  randSpeed(level) {
    const weightSpeed = Math.floor(Math.random() * 100)
    const odds = {
      1: 80,
      2: 50,
      3: 80,
      4: 50
    }
    const speeds = {
      1: [3,2,1],
      2: [3,2,1],
      3: [4,3,2],
      4: [4,3,2]
    }
    if (weightSpeed > odds[level]) {
      return speeds[level][0];
    }else if (weightSpeed > odds[level]) {
      return speeds[level[1]];
    }else {
      return speeds[level][2];
    }
  }
  
  randSize() {
    const weightSize = Math.floor(Math.random() * 100)
    if (weightSize < 75) {
      return {
        size: 'large',
        width: 16,
        height: 16
      }
    }else {
      return {
        size: 'small',
        width: 8,
        height: 8
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Astro);

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__astro_js__ = __webpack_require__(6);


class Hurricane extends __WEBPACK_IMPORTED_MODULE_0__astro_js__["a" /* default */] {
  constructor(level) {
    super(level, null, null, .75 * level, null, {
      size: 'hurricane',
      width: 16,
      height: 16
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Hurricane);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map