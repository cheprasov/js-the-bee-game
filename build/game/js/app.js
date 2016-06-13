(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _config = require('./game/config.js');

var _config2 = _interopRequireDefault(_config);

var _game = require('./game/game.js');

var _game2 = _interopRequireDefault(_game);

var _eventManager = require('./game/event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventManager2.default.onReady(function () {

    var game = new _game2.default(_config2.default);
    game.show();
});

},{"./game/config.js":6,"./game/event/event-manager.js":7,"./game/game.js":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BehaviourInterface = function () {
  function BehaviourInterface() {
    _classCallCheck(this, BehaviourInterface);
  }

  _createClass(BehaviourInterface, [{
    key: "getPosition",


    /**
     * @param {number} time
     * @return {{x:number, y:number, z:number}}
     */
    value: function getPosition(time) {}

    /**
     * @param {number} time
     * @return {number}
     */

  }, {
    key: "getRotate",
    value: function getRotate(time) {}
  }]);

  return BehaviourInterface;
}();

exports.default = BehaviourInterface;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _behaviourInterface = require('./behaviour-interface.js');

var _behaviourInterface2 = _interopRequireDefault(_behaviourInterface);

var _config = require('./../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlyBehaviour = function (_BehaviourInterface) {
    _inherits(FlyBehaviour, _BehaviourInterface);

    function FlyBehaviour() {
        _classCallCheck(this, FlyBehaviour);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlyBehaviour).call(this));

        _this.time = Date.now() - Math.random() * 1000;
        _this.speed = Math.random() * 2000 + 2000;
        _this.period = Math.random() * 2000 + 1000;
        _this.position = {
            x: Math.round(_config.GAME_WIDTH * Math.random()),
            y: Math.round(_config.GAME_HEIGHT * Math.random()),
            z: Math.round(200 * Math.random()) + 50
        };
        _this.destPosition = {
            x: Math.round(_config.GAME_WIDTH * Math.random()),
            y: Math.round(_config.GAME_HEIGHT * Math.random()),
            z: Math.round(200 * Math.random()) + 50
        };
        _this.rotate = _this._getAngle(_this.position.y, _this.position.x, _this.destPosition.y, _this.destPosition.x);
        return _this;
    }

    /**
     * @param {number} time
     * @private
     */


    _createClass(FlyBehaviour, [{
        key: '_getDestPosition',
        value: function _getDestPosition(time) {
            if (time - this.time >= this.period) {
                this.position = this.destPosition;
                this.destPosition = {
                    x: Math.round(_config.GAME_WIDTH * Math.random()),
                    y: Math.round(_config.GAME_HEIGHT * Math.random()),
                    z: Math.round(200 * Math.random()) + 50
                };
                this.time = time;
                this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);
            }
            return this.destPosition;
        }

        /**
         * @param {number} y1
         * @param {number} x1
         * @param {number} y2
         * @param {number} x2
         * @return {number}
         * @private
         */

    }, {
        key: '_getAngle',
        value: function _getAngle(y1, x1, y2, x2) {
            var xd = y2 - y1,
                yd = x2 - x1,
                angle = Math.abs(Math.round(180 * Math.atan(xd / yd) / Math.PI));

            if (y2 >= y1) {
                if (x2 >= x1) {} else {
                    angle = 180 - angle;
                }
            } else {
                if (x2 >= x1) {
                    angle = 360 - angle;
                } else {
                    angle += 180;
                }
            }
            return angle;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getPosition',
        value: function getPosition(time) {
            var dest = this._getDestPosition(time);
            var delta = Math.min((time - this.time) / this.period, 1);

            return {
                x: this.position.x + (dest.x - this.position.x) * delta,
                y: this.position.y + (dest.y - this.position.y) * delta,
                z: this.position.z + (dest.z - this.position.z) * delta
            };
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getRotate',
        value: function getRotate(time) {
            return this.rotate + 90;
        }
    }]);

    return FlyBehaviour;
}(_behaviourInterface2.default);

exports.default = FlyBehaviour;

},{"./../config.js":6,"./behaviour-interface.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flyBehaviour = require("./fly-behaviour.js");

var _flyBehaviour2 = _interopRequireDefault(_flyBehaviour);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fly2Behaviour = function (_FlyBehaviour) {
    _inherits(Fly2Behaviour, _FlyBehaviour);

    function Fly2Behaviour() {
        _classCallCheck(this, Fly2Behaviour);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Fly2Behaviour).call(this));

        _this.speed = Math.random() * 1000;
        _this.period = Math.random() * 2000 + 10000;
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(Fly2Behaviour, [{
        key: "getRotate",
        value: function getRotate(time) {
            return 0;
        }
    }]);

    return Fly2Behaviour;
}(_flyBehaviour2.default);

exports.default = Fly2Behaviour;

},{"./fly-behaviour.js":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _behaviourInterface = require('./behaviour-interface.js');

var _behaviourInterface2 = _interopRequireDefault(_behaviourInterface);

var _config = require('./../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StandBehaviour = function (_BehaviourInterface) {
    _inherits(StandBehaviour, _BehaviourInterface);

    function StandBehaviour() {
        _classCallCheck(this, StandBehaviour);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StandBehaviour).apply(this, arguments));
    }

    _createClass(StandBehaviour, [{
        key: 'getPosition',


        /**
         * @inheritDoc
         */
        value: function getPosition(time) {
            return { x: _config.GAME_WIDTH / 2, y: _config.GAME_HEIGHT / 3, z: 0 };
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getRotate',
        value: function getRotate(time) {
            return 0;
        }
    }]);

    return StandBehaviour;
}(_behaviourInterface2.default);

exports.default = StandBehaviour;

},{"./../config.js":6,"./behaviour-interface.js":2}],6:[function(require,module,exports){
"use strict";

// Queen

Object.defineProperty(exports, "__esModule", {
    value: true
});
var GAME_BEE_QUEEN_COUNT = exports.GAME_BEE_QUEEN_COUNT = 1;
var GAME_BEE_QUEEN_HEALTH = exports.GAME_BEE_QUEEN_HEALTH = 100;
var GAME_BEE_QUEEN_DAMAGE = exports.GAME_BEE_QUEEN_DAMAGE = 8;

// Worker
var GAME_BEE_WORKER_COUNT = exports.GAME_BEE_WORKER_COUNT = 5;
var GAME_BEE_WORKER_HEALTH = exports.GAME_BEE_WORKER_HEALTH = 75;
var GAME_BEE_WORKER_DAMAGE = exports.GAME_BEE_WORKER_DAMAGE = 10;

// Drone
var GAME_BEE_DRONE_COUNT = exports.GAME_BEE_DRONE_COUNT = 8;
var GAME_BEE_DRONE_HEALTH = exports.GAME_BEE_DRONE_HEALTH = 50;
var GAME_BEE_DRONE_DAMAGE = exports.GAME_BEE_DRONE_DAMAGE = 12;

var GAME_WIDTH = exports.GAME_WIDTH = 800;
var GAME_HEIGHT = exports.GAME_HEIGHT = 600;

var config = {

    containerId: 'the-bee-game',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,

    logic: {
        count: {
            queen: GAME_BEE_QUEEN_COUNT,
            worker: GAME_BEE_WORKER_COUNT,
            drone: GAME_BEE_DRONE_COUNT
        }
    }

};

exports.default = config;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventList = {};

var EventManager = function () {
    function EventManager() {
        _classCallCheck(this, EventManager);
    }

    _createClass(EventManager, null, [{
        key: "getRequestAnimFrame",


        /**
         * @return {Function}
         */
        value: function getRequestAnimFrame() {
            if (EventManager.requestAnimFrame) {
                return EventManager.requestAnimFrame;
            }
            if (!window) {
                EventManager.requestAnimFrame = function (callback) {
                    setTimeout(callback, 1000 / 60);
                };
            } else {
                EventManager.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            }
            return EventManager.requestAnimFrame;
        }

        /**
         * @param {Function} callback
         * @return {Function}
         */

    }, {
        key: "requestAnimationFrame",
        value: function requestAnimationFrame(callback) {
            var render = function render() {
                var time = Date.now();
                if (callback(time)) {
                    EventManager.getRequestAnimFrame()(render);
                }
            };
            return render;
        }

        /**
         * @param {Function} callback
         */

    }, {
        key: "onReady",
        value: function onReady(callback) {
            var completed = function completed() {
                document.removeEventListener("DOMContentLoaded", completed);
                window.removeEventListener("load", completed);
                callback();
            };
            if (document.readyState === "complete") {
                completed();
            } else {
                document.addEventListener("DOMContentLoaded", completed);
                window.addEventListener("load", completed);
            }
        }

        /**
         * @param {HTMLElement} container
         * @param {string} type
         * @param {string} classSelector
         * @param {Function} callback
         */

    }, {
        key: "bind",
        value: function bind(container, type, classSelector, callback) {
            container.addEventListener(type, function (e) {
                if (!classSelector || e.target.classList.contains(classSelector)) {
                    callback(e.target);
                }
            });
        }

        /**
         * @param {string} action
         * @param {Function} callback
         * @param {number} count
         */

    }, {
        key: "event",
        value: function event(action, callback) {
            var count = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

            if (!eventList[action]) {
                eventList[action] = [];
            }
            eventList[action].push({
                callback: callback,
                count: count
            });
        }

        /**
         * @return {Object}
         */

    }, {
        key: "getEventList",
        value: function getEventList() {
            return eventList;
        }

        /**
         * @param {(string|null)=} event
         * @return {Object}
         */

    }, {
        key: "clearEventList",
        value: function clearEventList() {
            var event = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (event) {
                delete eventList[event];
            } else {
                eventList = {};
            }
        }

        /**
         * @param {string} action
         * @param {*=} data
         */

    }, {
        key: "trigger",
        value: function trigger(action) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            if (!action) {
                return;
            }
            if (!eventList[action] || !eventList[action].length) {
                return;
            }
            for (var i = 0; i < eventList[action].length; i += 1) {
                if (eventList[action][i].count-- > 0) {
                    eventList[action][i].callback(data);
                }
            }
            for (var _i = eventList[action].length - 1; _i >= 0; _i -= 1) {
                if (eventList[action][_i].count <= 0) {
                    eventList[action].splice(_i, 1);
                }
            }
        }
    }]);

    return EventManager;
}();

exports.default = EventManager;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queenBee = require('./../model/bee/queen-bee.js');

var _queenBee2 = _interopRequireDefault(_queenBee);

var _workerBee = require('./../model/bee/worker-bee.js');

var _workerBee2 = _interopRequireDefault(_workerBee);

var _droneBee = require('./../model/bee/drone-bee.js');

var _droneBee2 = _interopRequireDefault(_droneBee);

var _standBehaviour = require('./../behaviour/stand-behaviour.js');

var _standBehaviour2 = _interopRequireDefault(_standBehaviour);

var _flyBehaviour = require('./../behaviour/fly-behaviour.js');

var _flyBehaviour2 = _interopRequireDefault(_flyBehaviour);

var _fly2Behaviour = require('./../behaviour/fly2-behaviour.js');

var _fly2Behaviour2 = _interopRequireDefault(_fly2Behaviour);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BeeFactory = function () {
    function BeeFactory() {
        _classCallCheck(this, BeeFactory);
    }

    _createClass(BeeFactory, null, [{
        key: 'createBeesByType',


        /**
         * @param {string} type
         * @param {number} count
         * @return {Array}
         */
        value: function createBeesByType(type, count) {
            var bees = [];
            for (var i = 0; i < count; i += 1) {
                bees.push(BeeFactory.createBeeByType(type));
            }
            return bees;
        }

        /**
         * @param {string} type
         * @return {BeeInterface}
         * @throws {Error}
         */

    }, {
        key: 'createBeeByType',
        value: function createBeeByType(type) {
            switch (type) {
                case 'queen':
                    return new _queenBee2.default(new _standBehaviour2.default());
                case 'worker':
                    return new _workerBee2.default(new _fly2Behaviour2.default());
                case 'drone':
                    return new _droneBee2.default(new _flyBehaviour2.default());
            }
            throw new Error('Invalid type for Bee');
        }
    }]);

    return BeeFactory;
}();

exports.default = BeeFactory;

},{"./../behaviour/fly-behaviour.js":3,"./../behaviour/fly2-behaviour.js":4,"./../behaviour/stand-behaviour.js":5,"./../model/bee/drone-bee.js":13,"./../model/bee/queen-bee.js":14,"./../model/bee/worker-bee.js":15}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_GAME_PLAY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logic = require('./logic/logic.js');

var _logic2 = _interopRequireDefault(_logic);

var _canvasRender = require('./render/canvas/canvas-render.js');

var _canvasRender2 = _interopRequireDefault(_canvasRender);

var _template = require('./template/template.js');

var _template2 = _interopRequireDefault(_template);

var _eventManager = require('./event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

var _abstractBee = require('./model/bee/abstract-bee.js');

var _mp3Sounder = require('./sounder/mp3-sounder.js');

var _mp3Sounder2 = _interopRequireDefault(_mp3Sounder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENT_GAME_PLAY = exports.EVENT_GAME_PLAY = 'event:game-play';

var Game = function () {

    /**
     * @param {Object} config
     * @private
     */

    function Game(config) {
        _classCallCheck(this, Game);

        this._setConfig(config);
        this.canvas = null;
        this.container = null;
    }

    /**
     *
     */


    _createClass(Game, [{
        key: 'show',
        value: function show() {
            this.show = function () {/* only once we can call init method */};
            this._setLogic(new _logic2.default(this._getConfig().logic));
            this._render();
            this._bindEvents();
        }

        /**
         * @param {Object} config
         * @private
         */

    }, {
        key: '_setConfig',
        value: function _setConfig(config) {
            this.config = config;
        }

        /**
         * @return {Object}
         */

    }, {
        key: '_getConfig',
        value: function _getConfig() {
            return this.config;
        }

        /**
         * @param {Logic} logic
         */

    }, {
        key: '_setLogic',
        value: function _setLogic(logic) {
            this.logic = logic;
        }

        /**
         * @return {Logic}
         */

    }, {
        key: '_getLogic',
        value: function _getLogic() {
            return this.logic;
        }

        /**
         * @param {RenderInterface} render
         * @private
         */

    }, {
        key: '_setRender',
        value: function _setRender(render) {
            this.render = render;
        }

        /**
         * @return {RenderInterface}
         * @private
         */

    }, {
        key: '_getRender',
        value: function _getRender() {
            return this.render;
        }
    }, {
        key: '_render',
        value: function _render() {
            this.container = document.getElementById(this._getConfig().containerId);
            this.container.innerHTML = _template2.default;
            this.canvas = this.container.querySelector('.game-canvas');
            this.canvas.width = this._getConfig().width;
            this.canvas.height = this._getConfig().height;
            this._setRender(new _canvasRender2.default(this.canvas));
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var _this = this;

            var container = this.container;
            _eventManager2.default.bind(container, 'click', 'js-game-play', function () {
                container.querySelector('.page-menu').style.display = 'none';
                container.querySelector('.page-results').style.display = 'none';
                container.querySelector('.page-game').style.display = 'block';
                _this._play();
            });
            _eventManager2.default.bind(container, 'click', 'js-game-hit-bee', function () {
                _this._hitBee();
            });
            container.querySelector('.page-menu').style.display = 'block';

            var mp3 = new _mp3Sounder2.default(this.container);

            _eventManager2.default.event(_logic.EVENT_LOGIC_GAME_OVER, function (results) {
                setTimeout(function () {
                    container.querySelector('.page-results').style.display = 'block';
                    mp3.sound('win', 1);
                    mp3.music('bees', 1, false);
                }, 2000);
            });
            _eventManager2.default.event(_abstractBee.EVENT_BEE_IS_DEAD, function () {
                mp3.sound('bomb', 0.4);
            });
            _eventManager2.default.event(_abstractBee.EVENT_BEE_IS_HITED, function () {
                mp3.sound('shotgun', 0.4);
            });
            _eventManager2.default.event(EVENT_GAME_PLAY, function () {
                mp3.music('bees', 1);
            });
        }
    }, {
        key: '_play',
        value: function _play() {
            this.logic.init();
            this._getRender().render(this.logic);
            _eventManager2.default.trigger(EVENT_GAME_PLAY);
        }
    }, {
        key: '_hitBee',
        value: function _hitBee() {
            this.logic.hitBee();
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"./event/event-manager.js":7,"./logic/logic.js":10,"./model/bee/abstract-bee.js":11,"./render/canvas/canvas-render.js":16,"./sounder/mp3-sounder.js":26,"./template/template.js":28}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_LOGIC_HIT_BEE = exports.EVENT_LOGIC_GAME_OVER = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventManager = require('./../event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

var _beeFactory = require('./../factory/bee-factory.js');

var _beeFactory2 = _interopRequireDefault(_beeFactory);

var _queenBee = require('./../model/bee/queen-bee.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENT_LOGIC_GAME_OVER = exports.EVENT_LOGIC_GAME_OVER = 'event:logic-game-over';
var EVENT_LOGIC_HIT_BEE = exports.EVENT_LOGIC_HIT_BEE = 'event:logic-hit-bee';

var Logic = function () {

    /**
     * @param {Object} config
     */

    function Logic(config) {
        var _this = this;

        _classCallCheck(this, Logic);

        this.config = config;
        _eventManager2.default.event(_queenBee.EVENT_QUEEN_IS_DEAD, function (data) {
            _this._killBees();
        });
    }

    _createClass(Logic, [{
        key: 'init',
        value: function init() {
            this.bees = [];
            for (var b in this.config.count) {
                if (!this.config.count.hasOwnProperty(b)) {
                    continue;
                }
                var bees = _beeFactory2.default.createBeesByType(b, this.config.count[b]);
                Array.prototype.push.apply(this.bees, bees);
            }
        }
    }, {
        key: 'getBees',
        value: function getBees() {
            return this.bees;
        }
    }, {
        key: 'hitBee',
        value: function hitBee() {
            var bees = this.getBees();
            if (!bees.length) {
                return;
            }
            var index = Math.round(Math.random() * (bees.length - 1));
            var bee = bees[index];

            bee.reduceHealth();
            if (bee.isDead()) {
                this._removeBee(index);
            }
        }
    }, {
        key: '_removeBee',
        value: function _removeBee(index) {
            this.bees.splice(index, 1);
        }
    }, {
        key: '_killBees',
        value: function _killBees() {
            var bee = void 0;
            while (bee = this.bees.shift()) {
                if (!bee.isDead()) {
                    bee.kill();
                }
            }
            _eventManager2.default.trigger(EVENT_LOGIC_GAME_OVER);
        }
    }]);

    return Logic;
}();

exports.default = Logic;

},{"./../event/event-manager.js":7,"./../factory/bee-factory.js":8,"./../model/bee/queen-bee.js":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_BEE_IS_HITED = exports.EVENT_BEE_IS_DEAD = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beeInterface = require('./bee-interface.js');

var _beeInterface2 = _interopRequireDefault(_beeInterface);

var _eventManager = require('./../../event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENT_BEE_IS_DEAD = exports.EVENT_BEE_IS_DEAD = 'event:bee_is_dead';
var EVENT_BEE_IS_HITED = exports.EVENT_BEE_IS_HITED = 'event:bee_is_hited';

var AbstractBee = function (_BeeInterface) {
    _inherits(AbstractBee, _BeeInterface);

    /**
     * @param {BehaviourInterface} behaviour
     */

    function AbstractBee(behaviour) {
        _classCallCheck(this, AbstractBee);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractBee).call(this));

        _this.setBehaviour(behaviour);
        _this.health = _this.getMaxHealth();
        return _this;
    }

    /**
     * @inheritDoc
     * @abstract
     */


    _createClass(AbstractBee, [{
        key: 'getMaxHealth',
        value: function getMaxHealth() {
            throw new Error('Abstract method `_getMaxHealth` must be redefined');
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'setBehaviour',
        value: function setBehaviour(behaviour) {
            this.behaviour = behaviour;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getBehaviour',
        value: function getBehaviour() {
            return this.behaviour;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getHealth',
        value: function getHealth() {
            return this.health;
        }

        /**
         * @return {number}
         * @abstract
         * @protected
         */

    }, {
        key: '_getDamage',
        value: function _getDamage() {
            throw new Error('Abstract method `_getDamage` must be redefined');
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'reduceHealth',
        value: function reduceHealth() {
            this.health = Math.max(this.health - this._getDamage(), 0);
            _eventManager2.default.trigger(EVENT_BEE_IS_HITED, this);
            if (this.isDead()) {
                this._onDead();
            }
            return this.health;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'kill',
        value: function kill() {
            this.health = 0;
            this._onDead();
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'isDead',
        value: function isDead() {
            return this.health <= 0;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getPosition',
        value: function getPosition(time) {
            return this.getBehaviour().getPosition(time);
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getRotate',
        value: function getRotate(time) {
            return this.getBehaviour().getRotate(time);
        }

        /**
         * @private
         */

    }, {
        key: '_onDead',
        value: function _onDead() {
            _eventManager2.default.trigger(EVENT_BEE_IS_DEAD, this);
        }
    }]);

    return AbstractBee;
}(_beeInterface2.default);

exports.default = AbstractBee;

},{"./../../event/event-manager.js":7,"./bee-interface.js":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BeeInterface = function () {
  function BeeInterface() {
    _classCallCheck(this, BeeInterface);
  }

  _createClass(BeeInterface, [{
    key: "getBehaviour",


    /**
     * @return {BehaviourInterface}
     */
    value: function getBehaviour() {}

    /**
     * @param {BehaviourInterface} behaviour
     */

  }, {
    key: "setBehaviour",
    value: function setBehaviour(behaviour) {}

    /**
     * @return {number}
     */

  }, {
    key: "getHealth",
    value: function getHealth() {}

    /**
     * @return {number} new value after decrement
     */

  }, {
    key: "reduceHealth",
    value: function reduceHealth() {}

    /**
     *
     */

  }, {
    key: "kill",
    value: function kill() {}

    /**
     * @return {boolean}
     */

  }, {
    key: "isDead",
    value: function isDead() {}

    /**
     * @param {Number} time
     * @return {{x:{Number}, y:{Number}, z:{Number}}}
     */

  }, {
    key: "getPosition",
    value: function getPosition(time) {}

    /**
     * @param {Number} time
     * @return {Number}
     */

  }, {
    key: "getRotate",
    value: function getRotate(time) {}

    /**
     * @return {Number}
     */

  }, {
    key: "getMaxHealth",
    value: function getMaxHealth() {}
  }]);

  return BeeInterface;
}();

exports.default = BeeInterface;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstractBee = require('./abstract-bee.js');

var _abstractBee2 = _interopRequireDefault(_abstractBee);

var _config = require('./../../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DroneBee = function (_AbstractBee) {
    _inherits(DroneBee, _AbstractBee);

    function DroneBee() {
        _classCallCheck(this, DroneBee);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DroneBee).apply(this, arguments));
    }

    _createClass(DroneBee, [{
        key: '_getDamage',


        /**
         * @inheritDoc
         */
        value: function _getDamage() {
            return _config.GAME_BEE_DRONE_DAMAGE;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getMaxHealth',
        value: function getMaxHealth() {
            return _config.GAME_BEE_DRONE_HEALTH;
        }
    }]);

    return DroneBee;
}(_abstractBee2.default);

exports.default = DroneBee;

},{"./../../config.js":6,"./abstract-bee.js":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_QUEEN_IS_DEAD = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _config = require('./../../config.js');

var _abstractBee = require('./abstract-bee.js');

var _abstractBee2 = _interopRequireDefault(_abstractBee);

var _eventManager = require('./../../event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENT_QUEEN_IS_DEAD = exports.EVENT_QUEEN_IS_DEAD = 'event:queenIsDead';

var QueenBee = function (_AbstractBee) {
    _inherits(QueenBee, _AbstractBee);

    function QueenBee() {
        _classCallCheck(this, QueenBee);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(QueenBee).apply(this, arguments));
    }

    _createClass(QueenBee, [{
        key: '_getDamage',


        /**
         * @inheritDoc
         */
        value: function _getDamage() {
            return _config.GAME_BEE_QUEEN_DAMAGE;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getMaxHealth',
        value: function getMaxHealth() {
            return _config.GAME_BEE_QUEEN_HEALTH;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: '_onDead',
        value: function _onDead() {
            _get(Object.getPrototypeOf(QueenBee.prototype), '_onDead', this).call(this);
            _eventManager2.default.trigger(EVENT_QUEEN_IS_DEAD);
        }
    }]);

    return QueenBee;
}(_abstractBee2.default);

exports.default = QueenBee;

},{"./../../config.js":6,"./../../event/event-manager.js":7,"./abstract-bee.js":11}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstractBee = require('./abstract-bee.js');

var _abstractBee2 = _interopRequireDefault(_abstractBee);

var _config = require('./../../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkerBee = function (_AbstractBee) {
    _inherits(WorkerBee, _AbstractBee);

    function WorkerBee() {
        _classCallCheck(this, WorkerBee);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(WorkerBee).apply(this, arguments));
    }

    _createClass(WorkerBee, [{
        key: '_getDamage',


        /**
         * @inheritDoc
         */
        value: function _getDamage() {
            return _config.GAME_BEE_WORKER_DAMAGE;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getMaxHealth',
        value: function getMaxHealth() {
            return _config.GAME_BEE_WORKER_HEALTH;
        }
    }]);

    return WorkerBee;
}(_abstractBee2.default);

exports.default = WorkerBee;

},{"./../../config.js":6,"./abstract-bee.js":11}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renderInterface = require('./../render-interface.js');

var _renderInterface2 = _interopRequireDefault(_renderInterface);

var _eventManager = require('./../../event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

var _abstractBee = require('./../../model/bee/abstract-bee.js');

var _config = require('./../../config.js');

var _logic = require('./../../logic/logic.js');

var _queenBee = require('./../../model/bee/queen-bee.js');

var _queenBee2 = _interopRequireDefault(_queenBee);

var _workerBee = require('./../../model/bee/worker-bee.js');

var _workerBee2 = _interopRequireDefault(_workerBee);

var _droneBee = require('./../../model/bee/drone-bee.js');

var _droneBee2 = _interopRequireDefault(_droneBee);

var _queenBee3 = require('./object/queen-bee.js');

var _queenBee4 = _interopRequireDefault(_queenBee3);

var _workerBee3 = require('./object/worker-bee.js');

var _workerBee4 = _interopRequireDefault(_workerBee3);

var _droneBee3 = require('./object/drone-bee.js');

var _droneBee4 = _interopRequireDefault(_droneBee3);

var _explosion = require('./object/explosion.js');

var _explosion2 = _interopRequireDefault(_explosion);

var _weaponFire = require('./object/weapon-fire.js');

var _weaponFire2 = _interopRequireDefault(_weaponFire);

var _hit = require('./object/hit.js');

var _hit2 = _interopRequireDefault(_hit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var imageQueenBee = new _queenBee4.default();
var imageDroneBee = new _droneBee4.default();
var imageWorkerBee = new _workerBee4.default();

var CanvasRender = function (_RenderInterface) {
    _inherits(CanvasRender, _RenderInterface);

    /**
     * @param {HTMLCanvasElement} canvas
     */

    function CanvasRender(canvas) {
        _classCallCheck(this, CanvasRender);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasRender).call(this));

        _this.time = new Date();
        _this.canvas = canvas;
        _this.context = canvas.getContext('2d');
        _this.renderElements = [];

        _eventManager2.default.event(_abstractBee.EVENT_BEE_IS_DEAD, function (bee) {
            _this.renderElements.push({
                type: 'explosion',
                image: new _explosion2.default(),
                position: bee.getPosition(Date.now())
            });
        });

        _eventManager2.default.event(_abstractBee.EVENT_BEE_IS_HITED, function (bee) {
            for (var i = 0; i < _this.renderElements.length; i += 1) {
                if (_this.renderElements[i].type === 'weapon') {
                    _this.renderElements.splice(i, 1);
                }
            }
            var pos = bee.getPosition(Date.now());
            _this.renderElements.push({
                type: 'hit',
                image: new _hit2.default(),
                position: { x: pos.x, y: pos.y }
            });
            var weapon = new _weaponFire2.default();
            _this.renderElements.push({
                type: 'weapon',
                image: weapon,
                position: { x: pos.x, y: _config.GAME_HEIGHT - weapon.getHeight() / 2 }
            });
        });
        return _this;
    }

    /**
     * @return {number}
     * @private
     */


    _createClass(CanvasRender, [{
        key: '_getTime',
        value: function _getTime() {
            return this.time.getTime();
        }

        /**
         * @param {Logic} logic
         */

    }, {
        key: 'render',
        value: function render(logic) {
            var _this2 = this;

            var render = _eventManager2.default.requestAnimationFrame(function (time) {
                var stop = true;
                _this2._clear();
                var bees = logic.getBees();
                if (bees.length) {
                    stop = false;
                    for (var i = 0; i < bees.length; i += 1) {
                        _this2._renderBee(time, bees[i]);
                    }
                }
                if (_this2.renderElements.length) {
                    stop = false;
                    for (var _i = 0; _i < _this2.renderElements.length; _i += 1) {
                        if (_this2._renderElement(time, _this2.renderElements[_i])) {
                            _this2.renderElements.splice(_i--, 1);
                        }
                    }
                }
                return !stop;
            });
            render();
        }
    }, {
        key: '_clear',
        value: function _clear() {
            this.context.clearRect(-1, -1, this.canvas.width + 3, this.canvas.height + 3);
        }
    }, {
        key: '_renderElement',
        value: function _renderElement(time, element) {
            this.context.save();
            this.context.translate(element.position.x, element.position.y);
            var result = element.image.render(this.context, time);
            this.context.restore();
            return !result;
        }

        /**
         * @param {number} time
         * @param {BeeInterface} bee
         * @private
         */

    }, {
        key: '_renderBee',
        value: function _renderBee(time, bee) {
            var position = bee.getPosition(time);
            var rotate = bee.getRotate(time);

            var imageBee = void 0;

            if (bee instanceof _queenBee2.default) {
                imageBee = imageQueenBee;
            } else if (bee instanceof _workerBee2.default) {
                imageBee = imageWorkerBee;
            } else if (bee instanceof _droneBee2.default) {
                imageBee = imageDroneBee;
            } else {
                throw new Error('Image for bee is not found');
            }

            var angle = rotate * (Math.PI / 180);
            this.context.save();
            this.context.translate(position.x, position.y);
            this.context.rotate(angle);
            imageBee.render(this.context, time);
            this.context.restore();

            this.context.save();
            this.context.translate(position.x, position.y);
            this._renderBeeHealt(bee, imageBee);
            this.context.restore();
        }

        /**
         * @param {BeeInterface} bee
         * @param {ImageClass} imageBee
         * @private
         */

    }, {
        key: '_renderBeeHealt',
        value: function _renderBeeHealt(bee, imageBee) {
            var health = bee.getHealth() / bee.getMaxHealth();
            var y = imageBee.getScale() * imageBee.getHeight() * 0.40;

            var w = bee.getMaxHealth() / 2;
            var l = bee.getHealth() / 2;

            this.context.fillStyle = '#ffffff';
            this.context.fillRect(-w / 2 - 1, y - 1, w + 2, 7);

            this.context.fillStyle = '#eb212e';
            this.context.globalAlpha = 0.25;
            this.context.fillRect(-w / 2, y, w, 5);

            this.context.globalAlpha = 1;
            this.context.fillRect(-w / 2, y, l, 5);
        }
    }]);

    return CanvasRender;
}(_renderInterface2.default);

exports.default = CanvasRender;

},{"./../../config.js":6,"./../../event/event-manager.js":7,"./../../logic/logic.js":10,"./../../model/bee/abstract-bee.js":11,"./../../model/bee/drone-bee.js":13,"./../../model/bee/queen-bee.js":14,"./../../model/bee/worker-bee.js":15,"./../render-interface.js":25,"./object/drone-bee.js":18,"./object/explosion.js":19,"./object/hit.js":20,"./object/queen-bee.js":22,"./object/weapon-fire.js":23,"./object/worker-bee.js":24}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Background = function (_ImageClass) {
    _inherits(Background, _ImageClass);

    function Background() {
        _classCallCheck(this, Background);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Background).call(this, {
            image: 'imgs/bg2.jpg',
            width: 800,
            height: 800
        }));
    }

    return Background;
}(_imageClass2.default);

exports.default = Background;

},{"./image-class.js":21}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DroneBee = function (_ImageClass) {
    _inherits(DroneBee, _ImageClass);

    function DroneBee() {
        _classCallCheck(this, DroneBee);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DroneBee).call(this, {
            image: 'imgs/bee01.png',
            width: 100,
            height: 90,
            scale: 0.75,
            sprites: {
                grid: { cols: 4, rows: 1 },
                count: 4,
                speed: 120
            }
        }));
    }

    return DroneBee;
}(_imageClass2.default);

exports.default = DroneBee;

},{"./image-class.js":21}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explosion = function (_ImageClass) {
    _inherits(Explosion, _ImageClass);

    function Explosion() {
        _classCallCheck(this, Explosion);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Explosion).call(this, {
            image: 'imgs/explosion.png',
            width: 100,
            height: 100,
            scale: 1,
            loop: 1,
            sprites: {
                grid: { cols: 9, rows: 8 },
                count: 72,
                speed: 500
            }
        }));
    }

    return Explosion;
}(_imageClass2.default);

exports.default = Explosion;

},{"./image-class.js":21}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hit = function (_ImageClass) {
    _inherits(Hit, _ImageClass);

    function Hit() {
        _classCallCheck(this, Hit);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Hit).call(this, {
            image: 'imgs/light.png',
            width: 192,
            height: 192,
            scale: 0.5,
            loop: 1,
            sprites: {
                grid: { cols: 5, rows: 5 },
                count: 21,
                speed: 500
            }
        }));
    }

    return Hit;
}(_imageClass2.default);

exports.default = Hit;

},{"./image-class.js":21}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageClass = function () {
    function ImageClass(options) {
        _classCallCheck(this, ImageClass);

        this.setImage(options.image);
        this.setSize(options.width, options.height);

        if ('sprites' in options) {
            this.setSprites(options.sprites);
        }

        this.scale = options.scale || 1;
        this.loop = options.loop || Infinity;
    }

    _createClass(ImageClass, [{
        key: "setSize",
        value: function setSize(width, height) {
            this.width = width || 0;
            this.height = height || 0;
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.width;
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: "getScale",
        value: function getScale() {
            return this.scale;
        }
    }, {
        key: "setSprites",
        value: function setSprites(sprites) {
            this.sprites = {
                loops: sprites.loops || 1,
                speed: sprites.speed || 1,
                count: sprites.count || 1,
                frames: sprites.frames || [],
                _time: 0
            };
            this.sprites.rate = this.sprites.speed / this.sprites.count;
            if (sprites && sprites.grid && sprites.grid.cols && sprites.grid.rows) {
                var count = 0;
                for (var rows = 0; rows < sprites.grid.rows; rows += 1) {
                    for (var cols = 0; cols < sprites.grid.cols; cols += 1) {
                        if (count < this.sprites.count) {
                            this.sprites.frames.push({
                                x: cols * this.width + (sprites.grid.x || 0),
                                y: rows * this.height + (sprites.grid.y || 0)
                            });
                            count += 1;
                        }
                    }
                }
            }
        }

        /**
         * @param {string} img
         */

    }, {
        key: "setImage",
        value: function setImage(img) {
            var _this = this;

            this.image = null;
            var image = new Image();
            image.onload = function () {
                _this.image = image;
            };
            image.src = img;
        }

        /**
         * @param {CanvasRenderingContext2D} context
         * @param {float} time
         * @return {boolean}
         */

    }, {
        key: "render",
        value: function render(context, time) {
            if (!this.image) {
                return true;
            }
            if (this.loop <= 0) {
                return false;
            }
            if (this.scale && this.scale !== 1) {
                context.scale(this.scale, this.scale);
            }
            if (this.sprites) {
                if (!this.sprites._time) {
                    this.lastIndex = -1;
                    this.sprites._time = time;
                }
                var delta = time - this.sprites._time;
                var index = Math.floor(delta % this.sprites.speed / this.sprites.rate);
                if (index < this.lastIndex) {
                    if (--this.loop <= 0) {
                        return false;
                    }
                }
                this.lastIndex = index;
                var frame = this.sprites.frames[index];
                context.drawImage(this.image, frame.x, frame.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
            } else {
                context.drawImage(this.image, 0, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
            }
            return true;
        }
    }]);

    return ImageClass;
}();

exports.default = ImageClass;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QueenBee = function (_ImageClass) {
    _inherits(QueenBee, _ImageClass);

    function QueenBee() {
        _classCallCheck(this, QueenBee);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(QueenBee).call(this, {
            image: 'imgs/bee02.png',
            width: 108,
            height: 146,
            scale: 1.25,
            sprites: {
                grid: { cols: 20, rows: 1 },
                count: 10,
                speed: 1000
            }
        }));
    }

    return QueenBee;
}(_imageClass2.default);

exports.default = QueenBee;

},{"./image-class.js":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeaponFire = function (_ImageClass) {
    _inherits(WeaponFire, _ImageClass);

    function WeaponFire() {
        _classCallCheck(this, WeaponFire);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(WeaponFire).call(this, {
            image: 'imgs/weapon.png',
            width: 201,
            height: 130,
            scale: 1,
            loop: 1,
            sprites: {
                grid: { cols: 5, rows: 2 },
                count: 10,
                speed: 2000
            }
        }));
    }

    return WeaponFire;
}(_imageClass2.default);

exports.default = WeaponFire;

},{"./image-class.js":21}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageClass = require('./image-class.js');

var _imageClass2 = _interopRequireDefault(_imageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkerBee = function (_ImageClass) {
    _inherits(WorkerBee, _ImageClass);

    function WorkerBee() {
        _classCallCheck(this, WorkerBee);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(WorkerBee).call(this, {
            image: 'imgs/bee03.png',
            width: 64,
            height: 49,
            scale: 1.25,
            sprites: {
                grid: { cols: 3, rows: 1 },
                count: 3,
                speed: 500
            }
        }));
    }

    return WorkerBee;
}(_imageClass2.default);

exports.default = WorkerBee;

},{"./image-class.js":21}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderInterface = function () {
  function RenderInterface() {
    _classCallCheck(this, RenderInterface);
  }

  _createClass(RenderInterface, [{
    key: "render",


    /**
     * @param {Logic} logic
     */
    value: function render(logic) {}
  }]);

  return RenderInterface;
}();

exports.default = RenderInterface;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sounderInterface = require('./sounder-interface.js');

var _sounderInterface2 = _interopRequireDefault(_sounderInterface);

var _eventManager = require('./../event/event-manager.js');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mp3Sounder = function (_SounderInterface) {
    _inherits(Mp3Sounder, _SounderInterface);

    /**
     * @param {HTMLElement} container
     */

    function Mp3Sounder(container) {
        _classCallCheck(this, Mp3Sounder);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Mp3Sounder).call(this));

        _this.container = container;

        var elements = _this.container.querySelectorAll('.sound');
        var element = void 0;
        for (var i = 0; i < elements.length; i += 1) {
            element = elements[i];
            _eventManager2.default.bind(element, 'play', false, function (element) {
                element.classList.add('playing');
            });
            _eventManager2.default.bind(element, 'ended', false, function (element) {
                element.classList.remove('playing');
            });
        }
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(Mp3Sounder, [{
        key: 'sound',
        value: function sound(name) {
            var volume = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            var element = this.container.querySelector('.sound.sound-' + name + ':not(.playing)');
            if (element) {
                element.volume = volume || 1;
                element.play();
            }
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'music',
        value: function music(name) {
            var volume = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
            var play = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            var element = this.container.querySelector('.music.music-' + name);
            if (element) {
                element.volume = volume || 1;
                play ? element.play() : element.pause();
            }
        }
    }]);

    return Mp3Sounder;
}(_sounderInterface2.default);

exports.default = Mp3Sounder;

},{"./../event/event-manager.js":7,"./sounder-interface.js":27}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SounderInterface = function () {
  function SounderInterface() {
    _classCallCheck(this, SounderInterface);
  }

  _createClass(SounderInterface, [{
    key: "sound",


    /**
     * @param {string} name
     * @param {number} volume
     */
    value: function sound(name, volume) {}

    /**
     * @param {string} name
     * @param {number=} volume
     * @param {boolean=} play
     */

  }, {
    key: "music",
    value: function music(name) {
      var volume = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
      var play = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    }
  }]);

  return SounderInterface;
}();

exports.default = SounderInterface;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var template = "\n    <div class=\"game\">\n\n        <div class=\"page page-game\">\n            <canvas class=\"game-canvas\"></canvas>\n            <button class=\"button button-hit js-game-hit-bee\">Hit Bee</button>\n        </div>\n\n        <div class=\"page page-results\">\n            <button class=\"button button-replay js-game-play\">Replay</button>\n        </div>\n\n        <div class=\"page page-menu\">\n            <button class=\"button button-start js-game-play\">Play</button>\n        </div>\n\n        <div class=\"sounds\" style=\"display: none\">\n            <audio controls class=\"music music-bees\" loop>\n                <source src=\"mp3/bees.mp3\" />\n            </audio>\n\n            <audio controls class=\"sound sound-win\">\n                <source src=\"mp3/win.mp3\" />\n            </audio>\n\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-shotgun\">\n                <source src=\"mp3/shotgun.mp3\" />\n            </audio>\n\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n            <audio controls class=\"sound sound-bomb\">\n                <source src=\"mp3/bomb.mp3\" />\n            </audio>\n\n        </div>\n\n    </div>\n";

exports.default = template;

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
