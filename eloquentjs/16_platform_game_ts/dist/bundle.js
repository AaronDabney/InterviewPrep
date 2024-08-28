/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_levels_gameLevels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/levels/gameLevels */ \"./src/levels/gameLevels.ts\");\n/* harmony import */ var _src_controlMapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/controlMapping */ \"./src/controlMapping.ts\");\n/* harmony import */ var _src_runTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/runTime */ \"./src/runTime.ts\");\n/* harmony import */ var _src_display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/display */ \"./src/display.ts\");\n\n\n\n\nvar controls = (0,_src_controlMapping__WEBPACK_IMPORTED_MODULE_1__.controlMapping)({\n    left: \"ArrowLeft\",\n    right: \"ArrowRight\",\n    jump: \"ArrowUp\"\n});\n// console.log(GAME_LEVELS[0]);\n// console.log(planToLevel(GAME_LEVELS[0]));\n// console.log(controls);\n(0,_src_runTime__WEBPACK_IMPORTED_MODULE_2__.runGame)(_src_levels_gameLevels__WEBPACK_IMPORTED_MODULE_0__.GAME_LEVELS, _src_display__WEBPACK_IMPORTED_MODULE_3__.standardDisplay, controls);\n\n\n//# sourceURL=webpack://browser-test/./index.ts?");

/***/ }),

/***/ "./src/actors/lava.ts":
/*!****************************!*\
  !*** ./src/actors/lava.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   create: () => (/* binding */ create)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state */ \"./src/state.ts\");\n/* harmony import */ var _vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vector2 */ \"./src/vector2.ts\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../level */ \"./src/level.ts\");\n\n\n\nfunction create(position, ch, resetPosition) {\n    var speed = _vector2__WEBPACK_IMPORTED_MODULE_1__.create(0, 0);\n    if (!resetPosition) {\n        resetPosition = position;\n    }\n    if (ch === \"sliding\") {\n        speed = _vector2__WEBPACK_IMPORTED_MODULE_1__.create(2, 0);\n    }\n    else if (ch === \"bouncing\") {\n        speed = _vector2__WEBPACK_IMPORTED_MODULE_1__.create(0, 2);\n    }\n    else if (ch === \"dropping\") {\n        speed = _vector2__WEBPACK_IMPORTED_MODULE_1__.create(0, 2);\n    }\n    else {\n        throw \"this aint good lava :(\";\n    }\n    console.log(\"speed\" + speed.y);\n    return {\n        position: position,\n        speed: speed,\n        size: _vector2__WEBPACK_IMPORTED_MODULE_1__.create(1, 1),\n        type: 'lava',\n        state: {\n            resetPosition: resetPosition,\n        },\n        start: start,\n        update: update,\n        collide: collide,\n    };\n}\nfunction start() {\n}\nfunction update(lavaEntity, deltaTime, state) {\n    var stepVector = _vector2__WEBPACK_IMPORTED_MODULE_1__.mult(lavaEntity.speed, deltaTime);\n    var newPosition = _vector2__WEBPACK_IMPORTED_MODULE_1__.add(lavaEntity.position, stepVector);\n    console.log(newPosition);\n    //const newPositionTouchesWall = state.level.touches(newPos, this.size, \"wall\") \n    var newPositionTouchesWall = _level__WEBPACK_IMPORTED_MODULE_2__.touches(state.level, newPosition, lavaEntity.size, lavaEntity.type);\n    var resetPosition = lavaEntity.state.resetPosition;\n    console.log(\"Reset position : \" + \"\".concat(resetPosition.x, \" | \").concat(resetPosition.y));\n    if (!newPositionTouchesWall) {\n        lavaEntity.position = newPosition;\n        return lavaEntity;\n    }\n    else if (resetPosition) {\n        lavaEntity.position = resetPosition;\n        return lavaEntity;\n    }\n    else {\n        lavaEntity.speed = _vector2__WEBPACK_IMPORTED_MODULE_1__.mult(lavaEntity.speed, -1);\n    }\n}\nfunction collide(state) {\n    return (0,_state__WEBPACK_IMPORTED_MODULE_0__.createGameState)(state.level, state.actors, \"lost\");\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/actors/lava.ts?");

/***/ }),

/***/ "./src/controlMapping.ts":
/*!*******************************!*\
  !*** ./src/controlMapping.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   controlMapping: () => (/* binding */ controlMapping)\n/* harmony export */ });\nfunction controlMapping(controlPairs) {\n    var down = Object.create(null);\n    function track(event) {\n        for (var _i = 0, _a = Object.entries(controlPairs); _i < _a.length; _i++) {\n            var _b = _a[_i], command = _b[0], key = _b[1];\n            if (event.key === key) {\n                down[command] = event.type === \"keydown\";\n            }\n        }\n        //console.log(event)\n    }\n    window.addEventListener(\"keydown\", track);\n    window.addEventListener(\"keyup\", track);\n    return down;\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/controlMapping.ts?");

/***/ }),

/***/ "./src/display.ts":
/*!************************!*\
  !*** ./src/display.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGameDisplay: () => (/* binding */ createGameDisplay),\n/* harmony export */   standardDisplay: () => (/* binding */ standardDisplay)\n/* harmony export */ });\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nfunction standardDisplay(state, deltaTime) {\n    // if (this.actorLayer) {\n    //     this.actorLayer.remove();\n    // }\n    //this.actorLayer = drawActors(state.actors, this.scale);\n    //this.dom.appendChild(this.actorLayer);\n    //this.dom.className = `game ${state.status}`;\n    var displayedActors = document.getElementsByClassName('actor');\n    for (var actor in displayedActors) {\n        displayedActors[actor].remove();\n    }\n    var newActorElements = drawActors(state.actors, 20);\n    //this.scrollPlayerIntoView(state);\n}\n/**\n * Builds game DOM that contains level geomertry and returns it\n * @param level\n * @returns\n */\nfunction createGameDisplay(level) {\n    var scale = 20;\n    var dom = buildNode(\"div\", [['class', 'game']], drawGrid(level, scale));\n    return dom;\n}\nfunction buildNode(name, attributes) {\n    var children = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        children[_i - 2] = arguments[_i];\n    }\n    var dom = document.createElement(name);\n    for (var _a = 0, attributes_1 = attributes; _a < attributes_1.length; _a++) {\n        var _b = attributes_1[_a], key = _b[0], value = _b[1];\n        dom.setAttribute(key, value);\n    }\n    for (var _c = 0, children_1 = children; _c < children_1.length; _c++) {\n        var child = children_1[_c];\n        dom.appendChild(child);\n    }\n    return dom;\n}\nfunction drawGrid(level, scale) {\n    var backdropAttributes = [['class', \"background\"], ['style', \"width: \".concat(level.width * scale, \"px\")]];\n    var rowAttributes = [[\"style\", \"height: \".concat(scale, \"px\")]];\n    return buildNode.apply(void 0, __spreadArray([\"table\", backdropAttributes], level.rows.map(function (row) { return buildNode.apply(void 0, __spreadArray([\"tr\", rowAttributes], row.map(function (type) { return buildNode(\"td\", [['class', type]]); }), false)); }), false));\n}\nfunction drawActors(actors, scale) {\n    return buildNode.apply(void 0, __spreadArray([\"div\", [['class', 'actor layer']]], actors.map(function (actor) {\n        var rect = buildNode(\"div\", [[\"class\", \"actor \".concat(actor.type)]]);\n        rect.style.width = \"\".concat(actor.size.x * scale, \"px\");\n        rect.style.height = \"\".concat(actor.size.y * scale, \"px\");\n        rect.style.left = \"\".concat(actor.position.x * scale, \"px\");\n        rect.style.top = \"\".concat(actor.position.y * scale, \"px\");\n        return rect;\n    }), false));\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/display.ts?");

/***/ }),

/***/ "./src/level.ts":
/*!**********************!*\
  !*** ./src/level.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   planToLevel: () => (/* binding */ planToLevel),\n/* harmony export */   touches: () => (/* binding */ touches)\n/* harmony export */ });\n/* harmony import */ var _actors_lava__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actors/lava */ \"./src/actors/lava.ts\");\n/* harmony import */ var _vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector2 */ \"./src/vector2.ts\");\n\n\n/**\n * Turns a string into a level state object\n * transforms characters into either terrain OR actors\n *\n * @param plan\n * @returns\n */\nfunction planToLevel(plan) {\n    var rows = plan.trim().split(\"\\n\").map(function (l) { return l.split(''); });\n    var height = rows.length;\n    var width = rows[0].length;\n    var actors = [];\n    rows = rows.map(function (row, y) {\n        return row.map(function (ch, x) {\n            if (levelGeometryMap.has(ch)) {\n                return levelGeometryMap.get(ch);\n            }\n            else if (levelActorMap[ch]) {\n                // need to push full built actors to the actors list here from the level actor map\n                var actorType = levelActorMap[ch];\n                actors.push(actorType(_vector2__WEBPACK_IMPORTED_MODULE_1__.create(x, y)));\n                return 'empty';\n            }\n            else {\n                throw \"invalid level character\";\n            }\n        });\n    });\n    return {\n        rows: rows,\n        height: height,\n        width: width,\n        actors: actors\n    };\n}\n// const levelGeometryMap = {\n//     \".\": \"empty\", \n//     \"#\": \"wall\", \n//     \"+\": \"lava\",\n// };\nvar levelGeometryMap = new Map([\n    [\".\", \"empty\"],\n    [\"#\", \"wall\"],\n    [\"+\", \"lava\"]\n]);\nvar levelActorMap = {\n    // \"@\": \"player\",\n    // \"o\": \"coin\",\n    \"=\": function (position) { return _actors_lava__WEBPACK_IMPORTED_MODULE_0__.create(position, 'sliding'); },\n    \"|\": function (position) { return _actors_lava__WEBPACK_IMPORTED_MODULE_0__.create(position, 'bouncing'); },\n    \"v\": function (position) { return _actors_lava__WEBPACK_IMPORTED_MODULE_0__.create(position, 'dropping'); }\n};\nfunction touches(level, pos, size, type) {\n    var xStart = Math.floor(pos.x);\n    var xEnd = Math.ceil(pos.x + size.x);\n    var yStart = Math.floor(pos.y);\n    var yEnd = Math.ceil(pos.y + size.y);\n    for (var y = yStart; y < yEnd; y++) {\n        for (var x = xStart; x < xEnd; x++) {\n            var isOutside = x < 0 || x >= level.width || y < 0 || y >= level.height;\n            var here = isOutside ? \"wall\" : level.rows[y][x];\n            if (here === type) {\n                return true;\n            }\n        }\n    }\n    return false;\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/level.ts?");

/***/ }),

/***/ "./src/levels/gameLevels.ts":
/*!**********************************!*\
  !*** ./src/levels/gameLevels.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GAME_LEVELS: () => (/* binding */ GAME_LEVELS)\n/* harmony export */ });\nvar GAME_LEVELS = [\"                                                    \\n................................................................................\\n................................................................................\\n................................................................................\\n................................................................................\\n................................................................................\\n................................................................................\\n..................................................................###...........\\n...................................................##......##....##+##..........\\n.............................................##..................#+++#..........\\n.................................................................##+##..........\\n...................................#####..........................#+#...........\\n...................................................................v........##..\\n..##.........................................................................#..\\n..#..........................................................................#..\\n..#......................................#####...............................#..\\n..#..........................................................................#..\\n..#..............................................................#####.......#..\\n..############..###############...####################.....#######...#########..\\n.............#++#.............#...#..................#.....#....................\\n.............#++#.............#+++#..................#+++++#....................\\n.............#++#.............#+++#..................#+++++#....................\\n.............####.............#####..................#######....................\\n................................................................................\\n................................................................................\\n\"];\n\n\n\n//# sourceURL=webpack://browser-test/./src/levels/gameLevels.ts?");

/***/ }),

/***/ "./src/runTime.ts":
/*!************************!*\
  !*** ./src/runTime.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   runGame: () => (/* binding */ runGame)\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.ts\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ \"./src/display.ts\");\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ \"./src/state.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\nfunction runGame(levelPlans, display, controls) {\n    return __awaiter(this, void 0, void 0, function () {\n        var maxLives, lives, level, status_1;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    maxLives = 3;\n                    lives = maxLives;\n                    level = 0;\n                    _a.label = 1;\n                case 1:\n                    if (!(level < levelPlans.length)) return [3 /*break*/, 4];\n                    console.log(\"\".concat(lives, \" lives remain\"));\n                    return [4 /*yield*/, runLevel((0,_level__WEBPACK_IMPORTED_MODULE_0__.planToLevel)(levelPlans[level]), display, controls)];\n                case 2:\n                    status_1 = _a.sent();\n                    if (status_1 === \"won\") {\n                        level++;\n                    }\n                    if (status_1 === \"lost\") {\n                        lives--;\n                    }\n                    if (lives === 0) {\n                        console.log(\"YOU DIED\");\n                        level = 0;\n                        lives = maxLives;\n                    }\n                    _a.label = 3;\n                case 3: return [3 /*break*/, 1];\n                case 4:\n                    console.log(\"You've won!\");\n                    return [2 /*return*/];\n            }\n        });\n    });\n}\nfunction runLevel(level, display, controls) {\n    //console.log(level)\n    var gameDisplay = (0,_display__WEBPACK_IMPORTED_MODULE_1__.createGameDisplay)(level); // Dom that contains level geometry\n    document.body.appendChild(gameDisplay); //appends level geometry to body\n    var gameState = (0,_state__WEBPACK_IMPORTED_MODULE_2__.createGameState)(level, level.actors, 'playing');\n    var levelEndDelay = 1;\n    return new Promise(function (resolve) {\n        runAnimation(function (deltaTime) {\n            var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateState)(gameState, deltaTime, controls);\n            //  display(state);\n            // if (state.status == \"playing\") {\n            //     return true;\n            // } else if (levelEndDelay > 0) {\n            //     levelEndDelay -= deltaTime;\n            //     return true;\n            // } else {\n            //     display.clear();\n            //     resolve(state.status);\n            //     return false;\n            // }\n        });\n    });\n}\nfunction runAnimation(frameFunc) {\n    var lastTime = null;\n    function frame(time) {\n        if (lastTime !== null) {\n            var deltaTime = Math.min(time - lastTime, 100) / 1000;\n            if (frameFunc(deltaTime) === false) {\n                return;\n            }\n        }\n        lastTime = time;\n        requestAnimationFrame(frame);\n    }\n    requestAnimationFrame(frame);\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/runTime.ts?");

/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGameState: () => (/* binding */ createGameState),\n/* harmony export */   updateState: () => (/* binding */ updateState)\n/* harmony export */ });\nfunction createGameState(level, actors, status) {\n    if (actors === void 0) { actors = []; }\n    if (status === void 0) { status = 'playing'; }\n    return {\n        level: level,\n        actors: actors,\n        status: 'status'\n    };\n}\nfunction getPlayerFromGameState(gameState) {\n    return gameState.actors.find(function (actor) { return actor.type === \"player\"; });\n}\nfunction updateState(gameState, deltaTime, controls) {\n    var actors = gameState.actors.map(function (actor) { return actor.update(actor, deltaTime, gameState, controls); });\n    console.log(actors);\n    var newState = createGameState(gameState.level, actors, gameState.status);\n    if (newState.status !== \"playing\") {\n        return newState;\n    }\n    var player = getPlayerFromGameState(newState);\n    // let playerTouchingLava = touches(gameState.level, player.position, player.size, \"lava\");\n    // if (playerTouchingLava) {\n    //    // return new State(this.level, actors, \"lost\");\n    //     return initializeGameState(this.level, actors, 'lost');\n    // }\n    for (var _i = 0, actors_1 = actors; _i < actors_1.length; _i++) {\n        var actor = actors_1[_i];\n        if (actor !== player && overlap(actor, player)) {\n            //newState = actor.collide(newState);\n        }\n    }\n    return newState;\n}\nfunction overlap(actor1, actor2) {\n    return actor1.position.x + actor1.size.x > actor2.position.x &&\n        actor1.position.x < actor2.position.x + actor2.size.x &&\n        actor1.position.y + actor1.size.y > actor2.position.y &&\n        actor1.position.y < actor2.position.y + actor2.size.y;\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/state.ts?");

/***/ }),

/***/ "./src/vector2.ts":
/*!************************!*\
  !*** ./src/vector2.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   add: () => (/* binding */ add),\n/* harmony export */   create: () => (/* binding */ create),\n/* harmony export */   dot: () => (/* binding */ dot),\n/* harmony export */   magnitude: () => (/* binding */ magnitude),\n/* harmony export */   mult: () => (/* binding */ mult),\n/* harmony export */   normalize: () => (/* binding */ normalize),\n/* harmony export */   perp: () => (/* binding */ perp),\n/* harmony export */   sub: () => (/* binding */ sub),\n/* harmony export */   zero: () => (/* binding */ zero)\n/* harmony export */ });\nfunction add(a, b) {\n    return { x: a.x + b.x, y: a.y + b.y };\n}\nfunction sub(a, b) {\n    return { x: a.x - b.x, y: a.y - b.y };\n}\nfunction mult(a, scalar) {\n    return { x: a.x * scalar, y: a.y * scalar };\n}\nfunction magnitude(a) {\n    return Math.sqrt(a.x * a.x + a.y * a.y);\n}\nfunction normalize(a) {\n    var length = magnitude(a);\n    if (length === 0) {\n        throw \"Cannot normalize the zero vector.\";\n    }\n    return { x: a.x / length, y: a.y / length };\n}\nfunction dot(a, b) {\n    return a.x * b.x + a.y * b.y;\n}\nfunction zero() {\n    return { x: 0, y: 0 };\n}\nfunction perp(a) {\n    return { x: a.y, y: -a.x };\n}\nfunction create(x, y) {\n    return { x: x, y: y };\n}\n\n\n\n//# sourceURL=webpack://browser-test/./src/vector2.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;