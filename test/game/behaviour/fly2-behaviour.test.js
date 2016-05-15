let assert = require('chai').assert;

import BehaviourInterface from './../../../src/game/behaviour/behaviour-interface.js';
import Fly2Behaviour from './../../../src/game/behaviour/fly2-behaviour.js';

describe('Fly2Behaviour', function() {

    it('Is it class?', function() {
        assert.typeOf(Fly2Behaviour, 'function');
        assert.typeOf(new Fly2Behaviour(), 'object');
        assert.instanceOf(new Fly2Behaviour(), Fly2Behaviour);
    });

    it('Does it implement BehaviourInterface?', function() {
        assert.instanceOf(new Fly2Behaviour(), BehaviourInterface);
        assert.typeOf(Fly2Behaviour.prototype.getPosition, 'function');
        assert.typeOf(Fly2Behaviour.prototype.getRotate, 'function');
    });

    it('#getPosition()', function() {
        let pos = (new Fly2Behaviour()).getPosition(Date.now());
        assert.isNumber(pos.x);
        assert.isNumber(pos.y);
        assert.isNumber(pos.z);
    });

    it('#getRotate()', function() {
        let angle = (new Fly2Behaviour()).getRotate(Date.now());
        assert.strictEqual(angle, 0);
    });

});
