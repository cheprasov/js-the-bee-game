let assert = require('chai').assert;

import BehaviourInterface from './../../../src/game/behaviour/behaviour-interface.js';
import StandBehaviour from './../../../src/game/behaviour/stand-behaviour.js';

describe('StandBehaviour', function() {

    it('Is it class?', function() {
        assert.typeOf(StandBehaviour, 'function');
        assert.typeOf(new StandBehaviour(), 'object');
        assert.instanceOf(new StandBehaviour(), StandBehaviour);
    });

    it('Does it implement BehaviourInterface?', function() {
        assert.instanceOf(new StandBehaviour(), BehaviourInterface);
        assert.typeOf(StandBehaviour.prototype.getPosition, 'function');
        assert.typeOf(StandBehaviour.prototype.getRotate, 'function');
    });

    it('#getPosition()', function() {
        let pos = (new StandBehaviour()).getPosition(Date.now());
        assert.isNumber(pos.x);
        assert.isNumber(pos.y);
        assert.isNumber(pos.z);
    });

    it('#getRotate()', function() {
        let angle = (new StandBehaviour()).getRotate(Date.now());
        assert.strictEqual(angle, 0);
    });

});
