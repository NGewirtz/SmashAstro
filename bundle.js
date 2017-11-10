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
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]()
  const view = new __WEBPACK_IMPORTED_MODULE_1__view_js__["a" /* default */](game, ctx)
  view.start()
})


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__astro_js__ = __webpack_require__(6);



class Game {
  constructor() {
    this.ship = new __WEBPACK_IMPORTED_MODULE_0__ship_js__["a" /* default */](this);
    this.bullets = [];
    this.astros = [new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */]];
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
    this.astros.push (new __WEBPACK_IMPORTED_MODULE_2__astro_js__["a" /* default */]());
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
    this.posX = 130;
    this.posY = 135;
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
      this.posX -= 3;
    }else {
      this.posX += 3;
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
    this.posY = 135;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Astro {
  constructor() {
    this.posX = 80;
    this.posY = 0;
    this.speed = 2; // 1-3
    this.angle = -1; // -3 .... 3
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Astro);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map