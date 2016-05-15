let assert = require('chai').assert;

import BeeInterface from './../../../../src/game/model/bee/bee-interface.js';

describe('BeeInterface', function() {

    it('Is it class?', function() {
        assert.typeOf(BeeInterface, 'function');
        assert.typeOf(new BeeInterface(), 'object');
        assert.instanceOf(new BeeInterface(), BeeInterface);
    });

    it('Has prototype methods?', function() {
        assert.typeOf(BeeInterface.prototype.getBehaviour, 'function');
        assert.typeOf(BeeInterface.prototype.setBehaviour, 'function');
        assert.typeOf(BeeInterface.prototype.getHealth, 'function');
        assert.typeOf(BeeInterface.prototype.reduceHealth, 'function');
        assert.typeOf(BeeInterface.prototype.kill, 'function');
        assert.typeOf(BeeInterface.prototype.isDead, 'function');
        assert.typeOf(BeeInterface.prototype.getPosition, 'function');
        assert.typeOf(BeeInterface.prototype.getRotate, 'function');
        assert.typeOf(BeeInterface.prototype.getMaxHealth, 'function');
    });

});
