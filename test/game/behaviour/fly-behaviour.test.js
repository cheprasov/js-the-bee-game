let assert = require('chai').assert;

import BehaviourInterface from './../../../src/game/behaviour/behaviour-interface.js';
import FlyBehaviour from './../../../src/game/behaviour/fly-behaviour.js';

describe('FlyBehaviour', function() {

    it('Is it class?', function() {
        assert.typeOf(FlyBehaviour, 'function');
        assert.typeOf(new FlyBehaviour(), 'object');
        assert.instanceOf(new FlyBehaviour(), FlyBehaviour);
    });

    it('Does it implement BehaviourInterface?', function() {
        assert.instanceOf(new FlyBehaviour(), BehaviourInterface);
        assert.typeOf(FlyBehaviour.prototype.getPosition, 'function');
        assert.typeOf(FlyBehaviour.prototype.getRotate, 'function');
    });

    it('#getPosition()', function() {
        let pos = (new FlyBehaviour()).getPosition(Date.now());
        assert.isNumber(pos.x);
        assert.isNumber(pos.y);
        assert.isNumber(pos.z);
    });

    it('#getRotate()', function() {
        let angle = (new FlyBehaviour()).getRotate(Date.now());
        assert.isNumber(angle);
    });

    it('#_getAngel()', function() {
        assert.strictEqual(FlyBehaviour.prototype._getAngle(10, 0, 20, 0), 90);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, 20, 20), 45);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, 0, 20), 0);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, 20, -20), 135);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, 0, -50), 180);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(100, 100, 100, 50), 180);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, -10, 0), 270);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, -10, -10), 225);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(0, 0, -50, 50), 315);
        assert.strictEqual(FlyBehaviour.prototype._getAngle(-10, -10, -60, 40), 315);
    });

});
