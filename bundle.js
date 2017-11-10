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
  }
  
  draw(ctx) {
    const astros = this.astros;
    this.checkCollision();
    this.addAstro();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.drawShip(this.ship, ctx);
    this.drawBullets(this.bullets, ctx);
    this.drawEnemies(this.astros.concat(this.hurricanes), ctx);
    this.displayGameState(ctx);
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
    ctx.fillText(`Score :${this.score}`,20,20);
    ctx.fillText(`Lives :${this.lives}`,240,20);
  }
  
  addBullet(bullet) {
    this.bullets.push(bullet)
  }
  
  addAstro() {
    if (this.astros.length < 6 && (Math.random() > .95)) {
      this.astros.push(new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */]());
    }
    if (Math.floor(Math.random() * 1000) > 997) {
      this.hurricanes.push(new __WEBPACK_IMPORTED_MODULE_3__hurricane_js__["a" /* default */]());
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
        console.log(this.score)
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
    this.astros.concat(this.hurricanes).forEach(astro => {
      if (((astro.posY + astro.size.height) >= 285) && this.shipHitAstro(astro)) {
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
      const newAstroLeft =  new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](astro.posX, astro.posY, null, -1.25, {
        size: 'small',
        width: 8,
        height: 6
      })
      const newAstroRight =  new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */](astro.posX, astro.posY, null, 1, {
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
    this.color = "blue"
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
      this.posX -= 8;
    }else {
      this.posX += 8;
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
  constructor(posX, posY, speed, angle, size) {
    this.posX = posX || this.randX();
    this.posY = posY || 0;
    this.speed = speed || this.randSpeed();
    this.angle = angle || this.randAngle();
    this.size = size || this.randSize();
    this.color = "black"
  }
  
  randX() {
    return Math.floor(Math.random() * 283);
  }
  
  randAngle() {
    const angles = [-1.5, -1.25, -1, -.75, -.5, .5, .75, 1, 1.25, 1.5];
    const idx = Math.floor(Math.random() * angles.length);
    return angles[idx];
  }
  
  randSpeed(level) {
    const weightSpeed = Math.floor(Math.random() * 100)
    if (weightSpeed > 80) {
      return 3;
    }else if (weightSpeed > 35) {
      return 2;
    }else {
      return 1;
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
  constructor() {
    super(null, null, 1, null, {
      size: 'hurricane',
      width: 16,
      height: 16
    });
    this.color = "red";
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Hurricane);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map