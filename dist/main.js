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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Slideshow.js":
/*!*************************!*\
  !*** ./js/Slideshow.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Slideshow; });\nclass Slideshow {\r\n    constructor(images = [], interval = 3000) {\r\n        this.images = images;\r\n        this.interval = interval;\r\n    }\r\n\r\n    createImages() {\r\n        const hero = document.querySelector('#hero');\r\n\r\n        // Empty hero\r\n        while (hero.firstChild) {\r\n            hero.removeChild(hero.firstChild);\r\n        }\r\n\r\n        this.images.map(image => {\r\n            const imgElement = document.createElement('img');\r\n\r\n            imgElement.src = image;\r\n            hero.append(imgElement);\r\n        });\r\n\r\n        document.querySelector('#hero img:first-child').classList.add('current');\r\n    }\r\n\r\n    rotateImages() {\r\n        let currentImage = document.querySelector('#hero .current'),\r\n            nextImage = currentImage.nextSibling;\r\n\r\n        if (nextImage === null) {\r\n            nextImage = document.querySelector('#hero img:first-child');\r\n        }\r\n\r\n        currentImage.classList.remove('current');\r\n        nextImage.classList.add('current');\r\n    }\r\n\r\n    init() {\r\n        this.createImages();\r\n        setInterval(this.rotateImages, this.interval);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/Slideshow.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./js/utils.js\");\n/* harmony import */ var _Slideshow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slideshow */ \"./js/Slideshow.js\");\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    const images = [\r\n        'assets/images/1.jpg',\r\n        'assets/images/2.jpg',\r\n        'assets/images/3.jpg'\r\n    ];\r\n\r\n    const slideshow = new _Slideshow__WEBPACK_IMPORTED_MODULE_1__[\"default\"](images, 6000);\r\n\r\n    slideshow.init();\r\n\r\n    const navItems = document.querySelectorAll('nav li');\r\n\r\n    [...navItems].map(navItem => {\r\n        navItem.addEventListener('mouseenter', _utils__WEBPACK_IMPORTED_MODULE_0__[\"highlight\"]);\r\n        navItem.addEventListener('mouseleave', _utils__WEBPACK_IMPORTED_MODULE_0__[\"highlight\"]);\r\n        navItem.addEventListener('click', _utils__WEBPACK_IMPORTED_MODULE_0__[\"setActive\"]);\r\n    });\r\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! exports provided: highlight, setActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"highlight\", function() { return highlight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setActive\", function() { return setActive; });\nconst highlight = event => {\r\n    event.currentTarget.classList.toggle('highlighted');\r\n};\r\n\r\nconst setActive = event => {\r\n    event.preventDefault();\r\n\r\n    const { currentTarget } = event;\r\n    const navItems = currentTarget.parentNode.querySelectorAll('nav li');\r\n\r\n    navItems.forEach(navItem => {\r\n        navItem.classList.remove('active');\r\n    });\r\n\r\n    currentTarget.classList.add('active');\r\n};\n\n//# sourceURL=webpack:///./js/utils.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./js/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./js/main.js */\"./js/main.js\");\n\n\n//# sourceURL=webpack:///multi_./js/main.js?");

/***/ })

/******/ });