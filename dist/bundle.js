/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GameConfig.js":
/*!***************************!*\
  !*** ./src/GameConfig.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  minerals: {\n    'iron': {\n      price: 100\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/GameConfig.js?");

/***/ }),

/***/ "./src/PhaserConfig.js":
/*!*****************************!*\
  !*** ./src/PhaserConfig.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\n  parent: 'game',\n  width: 770,\n  height: 600,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: {\n        y: 1500\n      },\n      debug: true\n    }\n  },\n  localStorageName: 'space-miner'\n});\n\n//# sourceURL=webpack:///./src/PhaserConfig.js?");

/***/ }),

/***/ "./src/entities/Ground.js":
/*!********************************!*\
  !*** ./src/entities/Ground.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ground; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Ground {\n  constructor(scene) {\n    this.scene = scene;\n    this.rows = 10;\n    this.cols = 25;\n    this.map = [];\n    this.group = this.scene.physics.add.staticGroup();\n    this.tileWidth = 70;\n  }\n\n  generateBoard(mapOffset) {\n    this.mapOffset = mapOffset;\n\n    for (let y = 0; y < this.rows; y++) {\n      for (let x = 0; x < this.cols; x++) {\n        let chunk = this.createChunk(x, y);\n        this.map.push(chunk);\n      }\n    }\n  }\n\n  createChunk(x, y) {\n    let chunk = null;\n    let xD = this.mapOffset.x + this.tileWidth * .5 + x * this.tileWidth;\n    let yD = this.mapOffset.y + y * this.tileWidth + this.tileWidth * .5;\n\n    if (x > 1 && x < 5 && y === 0 || x > 9 && x < 15 && y === 0 || x > 18 && x < 23 && y === 0) {\n      chunk = this.group.create(xD, yD, 'rock-unbreakable');\n      chunk.setData('breakable', false);\n    } else {\n      let random = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.RND.between(0, 10);\n\n      if (random <= 1 && y > 0) {\n        chunk = null;\n      } else if (random <= 3) {\n        chunk = this.group.create(xD, yD, 'rock');\n        chunk.setData({\n          'type': 'rock',\n          'breakable': true,\n          'canCollect': false\n        });\n      } else if (random <= 5) {\n        chunk = this.group.create(xD, yD, 'iron');\n        chunk.setData({\n          'type': 'iron',\n          'breakable': true,\n          'canCollect': true\n        });\n      } else {\n        chunk = this.group.create(xD, yD, 'dirt');\n        chunk.setData({\n          'type': 'dirt',\n          'breakable': true,\n          'canCollect': false\n        });\n      }\n    }\n\n    return chunk;\n  }\n\n  isValidChunk(destination) {\n    return this.map[destination.y * this.cols + destination.x] !== undefined;\n  }\n\n  isBreakableChunk(destination) {\n    return this.map[destination.y * this.cols + destination.x].getData('breakable');\n  }\n\n  getChunk(destination) {\n    return this.map[destination.y * this.cols + destination.x];\n  }\n\n  destroyChunk(destination) {\n    this.map[destination.y * this.cols + destination.x].destroy();\n  }\n\n}\n\n//# sourceURL=webpack:///./src/entities/Ground.js?");

/***/ }),

/***/ "./src/entities/Robot.js":
/*!*******************************!*\
  !*** ./src/entities/Robot.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Robot; });\nclass Robot {\n  constructor(scene) {\n    this.scene = scene;\n    this.spriteKey = 'robot';\n    this.entity = null;\n    this.state = Robot.STATEMENT().iddle;\n    this.currentAction = Robot.ACTION().none;\n    this.isAnimated = false;\n    this.velocity = 200;\n    this.minVelocityY = 300;\n    this.velocityY = this.minVelocityY;\n    this.particlesEmmiter = [];\n    this.loseFuelEvent = null;\n    this.fuelMax = 100;\n    this.fuel = this.fuelMax;\n    this.cargo = {};\n    this.cargoSize = 15;\n    this.diggerPower = 1;\n    this.thrustPower = 1;\n  }\n\n  create() {\n    this.entity = this.scene.physics.add.sprite(100, 300, this.spriteKey);\n    this.entity.body.setMaxVelocity(1000);\n    var particlesDirt = this.scene.add.particles('dirt');\n    var particlesIron = this.scene.add.particles('iron');\n    var particlesRock = this.scene.add.particles('rock');\n    this.particlesEmmiter['dirt'] = particlesDirt.createEmitter({\n      speed: 20,\n      on: false,\n      lifespan: 500,\n      scale: {\n        start: 0.1,\n        end: 0.15\n      }\n    });\n    this.particlesEmmiter['iron'] = particlesIron.createEmitter({\n      speed: 20,\n      on: false,\n      lifespan: 500,\n      scale: {\n        start: 0.1,\n        end: 0.15\n      }\n    });\n    this.particlesEmmiter['rock'] = particlesRock.createEmitter({\n      speed: 20,\n      on: false,\n      lifespan: 500,\n      scale: {\n        start: 0.1,\n        end: 0.15\n      }\n    });\n    this.loseFuelEvent = this.scene.time.addEvent({\n      delay: 500,\n      callback: this.looseFuel,\n      callbackScope: this,\n      loop: true\n    });\n  }\n\n  update() {\n    this.loseFuelEvent.getProgress();\n    this.move();\n  }\n\n  move() {\n    if (this.scene.cursors.down.isDown && !this.isAnimated) {\n      this.state = Robot.STATEMENT().down;\n      this.entity.body.setVelocityX(0);\n    } else if (this.scene.cursors.left.isDown && !this.isAnimated) {\n      this.state = Robot.STATEMENT().left;\n      this.entity.body.setVelocityX(this.velocity * -1);\n    } else if (this.scene.cursors.right.isDown && !this.isAnimated) {\n      this.state = Robot.STATEMENT().right;\n      this.entity.body.setVelocityX(this.velocity);\n    } else {\n      this.state = Robot.STATEMENT().iddle;\n      this.entity.body.setVelocityX(0);\n    }\n\n    if (this.scene.cursors.space.isDown && !this.isAnimated) {\n      this.currentAction = Robot.ACTION().drill;\n    } else if (this.scene.cursors.up.isDown && !this.isAnimated) {\n      if (this.velocityY < this.minVelocityY) {\n        this.velocityY = this.minVelocityY + 1;\n      } else {\n        this.velocityY++;\n      }\n\n      this.currentAction = Robot.STATEMENT().fly;\n      this.entity.body.setVelocityY(this.velocityY * -1 * this.thrustPower);\n      this.currentAction = Robot.ACTION().none;\n    } else {\n      if (this.velocityY < 0) {\n        this.velocityY = 0;\n      } else {\n        this.velocityY--;\n      }\n\n      this.currentAction = Robot.ACTION().none;\n    }\n  }\n\n  moveTo(direction, mineral, callback) {\n    this.scene.tweens.add({\n      targets: this.entity,\n      x: direction.x,\n      y: direction.y,\n      duration: 1500,\n      onStart: () => {\n        this.isAnimated = true;\n        this.entity.body.enable = false;\n        this.emitParticules(direction, mineral);\n      },\n      onComplete: () => {\n        this.isAnimated = false;\n        this.entity.body.enable = true;\n\n        if (mineral.getData('canCollect')) {\n          this.addToCargo(mineral);\n        }\n\n        this.stopParticules(mineral);\n        callback();\n      }\n    });\n  }\n\n  emitParticules(direction, mineral) {\n    let offset = {\n      x: 0,\n      y: 0\n    };\n\n    if (direction.way === 'bottom') {\n      offset.y = this.entity.body.halfHeight;\n    } else if (direction.way === 'left') {\n      offset.x = this.entity.body.halfWidth * -1;\n    } else if (direction.way === 'right') {\n      offset.x = this.entity.body.halfWidth;\n    }\n\n    this.particlesEmmiter[mineral.getData('type')].start();\n    this.particlesEmmiter[mineral.getData('type')].startFollow(this.entity, offset.x, offset.y);\n  }\n\n  stopParticules(mineral) {\n    this.particlesEmmiter[mineral.getData('type')].stop();\n  }\n\n  looseFuel() {\n    if (this.fuel > 0) {\n      this.fuel--;\n      this.scene.events.emit('update-fuel', this.fuel);\n    } else {\n      console.log('Out of fuel');\n    }\n  }\n\n  addToCargo(mineral) {\n    let type = mineral.getData('type');\n\n    if (this.cargo[type] === undefined) {\n      this.cargo[type] = 1;\n    } else {\n      this.cargo[type]++;\n    }\n\n    console.log(this.cargo);\n  }\n\n  static STATEMENT() {\n    return {\n      'iddle': 0,\n      'down': 1,\n      'left': 2,\n      'right': 3\n    };\n  }\n\n  static ACTION() {\n    return {\n      'none': 0,\n      'drill': 1,\n      'fly': 2,\n      'refuel': 3,\n      'repair': 4\n    };\n  }\n\n  IS_DRILLING() {\n    return this.currentAction === Robot.ACTION().drill;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/entities/Robot.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes_Boot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Boot */ \"./src/scenes/Boot.js\");\n/* harmony import */ var _scenes_Splash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/Splash */ \"./src/scenes/Splash.js\");\n/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/Game */ \"./src/scenes/Game.js\");\n/* harmony import */ var _scenes_UiGame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/UiGame */ \"./src/scenes/UiGame.js\");\n/* harmony import */ var _scenes_Shop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/Shop */ \"./src/scenes/Shop.js\");\n/* harmony import */ var _PhaserConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PhaserConfig */ \"./src/PhaserConfig.js\");\n\n\n\n\n\n\n\nconst gameConfig = Object.assign(_PhaserConfig__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n  scene: [_scenes_Boot__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _scenes_Splash__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _scenes_Game__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _scenes_UiGame__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _scenes_Shop__WEBPACK_IMPORTED_MODULE_5__[\"default\"]]\n});\n\nclass Game extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game {\n  constructor() {\n    super(gameConfig);\n  }\n\n}\n\nwindow.game = new Game();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/scenes/Boot.js":
/*!****************************!*\
  !*** ./src/scenes/Boot.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n // import WebFont from 'webfontloader'\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\n  constructor() {\n    super({\n      key: 'BootScene'\n    });\n  }\n\n  preload() {// this.fontsReady = false\n    // this.fontsLoaded = this.fontsLoaded.bind(this)\n    // this.add.text(100, 100, 'loading fonts...')\n    // WebFont.load({\n    //     google: {\n    //         families: ['Bangers']\n    //     },\n    //     active: this.fontsLoaded\n    // })\n  }\n\n  update() {\n    // if (this.fontsReady) {\n    this.scene.start('SplashScene'); // }\n  }\n\n  fontsLoaded() {\n    this.fontsReady = true;\n  }\n\n});\n\n//# sourceURL=webpack:///./src/scenes/Boot.js?");

/***/ }),

/***/ "./src/scenes/Game.js":
/*!****************************!*\
  !*** ./src/scenes/Game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameConfig */ \"./src/GameConfig.js\");\n/* harmony import */ var _entities_Robot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/Robot */ \"./src/entities/Robot.js\");\n/* harmony import */ var _entities_Ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/Ground */ \"./src/entities/Ground.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\n  constructor() {\n    super({\n      key: 'GameScene'\n    });\n    this.config = _GameConfig__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n    this.dirtGround = [];\n    this.tileWidth = 70;\n    this.mapOffset = {\n      x: 0,\n      y: 400\n    };\n    this.money = 0;\n    this.shopOpen = false;\n  }\n\n  init() {}\n\n  preload() {\n    this.robot = new _entities_Robot__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this);\n    this.ground = new _entities_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\n  }\n\n  create() {\n    this.ground.generateBoard(this.mapOffset);\n    this.createBuildings();\n    this.cursors = this.input.keyboard.createCursorKeys();\n    this.robot.create();\n    var camera = this.cameras.main;\n    camera.setBounds(0, 0, this.ground.cols * this.ground.tileWidth, this.ground.rows * this.ground.tileWidth + this.mapOffset.y);\n    camera.startFollow(this.robot.entity);\n    camera.setBackgroundColor('#003152');\n    this.physics.add.collider(this.robot.entity, this.ground.group);\n    this.setCollideBuildingsEffect();\n    this.scene.launch('UiGame');\n    this.scene.launch('Shop');\n  }\n\n  update() {\n    this.robot.update();\n\n    if (this.robot.IS_DRILLING()) {\n      let destination = this.getDrillDestination();\n\n      if (!destination) {\n        return false;\n      }\n\n      if (!this.ground.isValidChunk(destination)) {\n        return false;\n      }\n\n      if (!this.ground.isBreakableChunk(destination)) {\n        return false;\n      }\n\n      let mineral = this.ground.getChunk(destination);\n      let robotDestination = {\n        x: destination.x * this.tileWidth + this.robot.entity.body.halfWidth + (this.tileWidth - this.robot.entity.width) / 2,\n        y: destination.y * this.tileWidth + this.mapOffset.y + this.tileWidth / 2,\n        way: destination.way\n      };\n      this.robot.moveTo(robotDestination, mineral, () => {\n        this.ground.destroyChunk(destination);\n      });\n    }\n  }\n\n  getDrillDestination() {\n    if (this.robot.entity.body.touching.down && this.robot.state === _entities_Robot__WEBPACK_IMPORTED_MODULE_2__[\"default\"].STATEMENT().down) {\n      return {\n        x: Math.round(Math.abs(this.robot.entity.body.x / this.tileWidth)),\n        y: Math.round(Math.abs(this.robot.entity.body.bottom - this.mapOffset.y) / this.tileWidth),\n        way: 'bottom'\n      };\n    } else if (this.robot.entity.body.touching.left && this.robot.state === _entities_Robot__WEBPACK_IMPORTED_MODULE_2__[\"default\"].STATEMENT().left) {\n      return {\n        x: Math.round(Math.abs((this.robot.entity.body.left - this.tileWidth) / this.tileWidth)),\n        y: Math.round(Math.abs((this.robot.entity.body.bottom - this.mapOffset.y - this.tileWidth) / this.tileWidth)),\n        way: 'left'\n      };\n    } else if (this.robot.entity.body.touching.right && this.robot.state === _entities_Robot__WEBPACK_IMPORTED_MODULE_2__[\"default\"].STATEMENT().right) {\n      return {\n        x: Math.round(Math.abs(this.robot.entity.body.right / this.tileWidth)),\n        y: Math.round(Math.abs(this.robot.entity.body.bottom - this.mapOffset.y - this.tileWidth) / this.tileWidth),\n        way: 'right'\n      };\n    } else {\n      return false;\n    }\n  }\n\n  createBuildings() {\n    this.fuelBuilding = this.physics.add.sprite(this.tileWidth * 2, this.mapOffset.y - 140, 'building-fuel');\n    this.fuelBuilding.setDisplayOrigin(0, 0);\n    this.fuelBuilding.body.allowGravity = false;\n    this.factoryBuilding = this.physics.add.sprite(this.tileWidth * 10, this.mapOffset.y - 140, 'building-factory');\n    this.factoryBuilding.setDisplayOrigin(0, 0);\n    this.factoryBuilding.body.setImmovable(true);\n    this.factoryBuilding.body.allowGravity = false;\n    this.shopBuilding = this.physics.add.sprite(this.tileWidth * 19, this.mapOffset.y - 140, 'building-shop');\n    this.shopBuilding.setDisplayOrigin(0, 0);\n    this.shopBuilding.body.allowGravity = false;\n  }\n\n  setCollideBuildingsEffect() {\n    this.physics.add.overlap(this.fuelBuilding, this.robot.entity, () => {\n      if (this.cursors.space.isDown) {\n        this.robot.fuel = this.robot.fuelMax;\n        this.events.emit('update-fuel', this.robot.fuel);\n      }\n    });\n    this.physics.add.overlap(this.factoryBuilding, this.robot.entity, () => {\n      if (this.cursors.space.isDown && Object.keys(this.robot.cargo).length > 0) {\n        Object.keys(this.robot.cargo).forEach(mineral => {\n          this.money += this.robot.cargo[mineral] * this.config.minerals[mineral].price;\n        });\n        this.robot.cargo = {};\n      }\n    });\n    this.physics.add.overlap(this.shopBuilding, this.robot.entity, () => {\n      if (this.cursors.space.isDown) {\n        setTimeout(() => {\n          this.toggleShop();\n        }, 50);\n      }\n    });\n  }\n\n  toggleShop() {\n    console.log(this.shopOpen);\n\n    if (this.shopOpen) {\n      this.scene.sleep('Shop');\n      this.scene.resume();\n    } else {\n      this.scene.wake('Shop');\n      this.scene.pause();\n    }\n\n    this.shopOpen = !this.shopOpen;\n    console.log(this.shopOpen);\n  }\n\n});\n\n//# sourceURL=webpack:///./src/scenes/Game.js?");

/***/ }),

/***/ "./src/scenes/Shop.js":
/*!****************************!*\
  !*** ./src/scenes/Shop.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Shop; });\nclass Shop extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'Shop'\n    });\n  }\n\n  create() {\n    this.scene.setVisible(false);\n    this.motor = this.add.sprite(200, 200, 'motor');\n    this.motor.setInteractive().on('pointerdown', pointer => {\n      console.log('buy motor');\n      this.scene.get('GameScene').toggleShop();\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/scenes/Shop.js?");

/***/ }),

/***/ "./src/scenes/Splash.js":
/*!******************************!*\
  !*** ./src/scenes/Splash.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\n  constructor() {\n    super({\n      key: 'SplashScene'\n    });\n  }\n\n  preload() {\n    //\n    // load your assets\n    //\n    this.load.image('dirt', 'assets/sprite/dirt.png');\n    this.load.image('rock', 'assets/sprite/rock.png');\n    this.load.image('rock-unbreakable', 'assets/sprite/rock-unbreakable.png');\n    this.load.image('iron', 'assets/sprite/iron.png');\n    this.load.image('robot', 'assets/sprite/robot.png');\n    this.load.image('building-shop', 'assets/sprite/building-shop.png');\n    this.load.image('building-fuel', 'assets/sprite/building-fuel.png');\n    this.load.image('building-factory', 'assets/sprite/building-factory.png');\n    this.load.image('motor', 'assets/sprite/motor.png');\n  }\n\n  create() {\n    this.scene.start('GameScene');\n  }\n\n  update() {}\n\n});\n\n//# sourceURL=webpack:///./src/scenes/Splash.js?");

/***/ }),

/***/ "./src/scenes/UiGame.js":
/*!******************************!*\
  !*** ./src/scenes/UiGame.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UiGame; });\nclass UiGame extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'UiGame'\n    });\n    this.fuel = 100;\n    this.money = 0;\n  }\n\n  preload() {}\n\n  create() {\n    var r1 = this.add.rectangle(30, 30, 100, 15, 0xaaaaaa);\n    r1.setDisplayOrigin(0, 0);\n    this.fuelMask = this.add.rectangle(30, 30, 20, 15, 0xdddddd);\n    this.fuelMask.setDisplayOrigin(0, 0);\n    let gameScene = this.scene.get('GameScene');\n    gameScene.events.on('update-fuel', fuel => {\n      this.fuel = fuel;\n\n      if (this.fuel > 70) {\n        this.fuelMask.setFillStyle(0x4BC427);\n      } else if (this.fuel > 40) {\n        this.fuelMask.setFillStyle(0xFF7E0C);\n      } else {\n        this.fuelMask.setFillStyle(0xFF1A1F);\n      }\n\n      this.fuelMask.width = this.fuel;\n    });\n    gameScene.events.on('update-money', money => {\n      this.money = money;\n    });\n  }\n\n  update() {}\n\n}\n\n//# sourceURL=webpack:///./src/scenes/UiGame.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! D:\\www\\drilling-machine\\src\\main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });