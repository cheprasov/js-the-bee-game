let assert = require('chai').assert;

import BehaviourInterface from './../../../src/game/behaviour/behaviour-interface.js';

describe('BehaviourInterface', function() {

    it('Is it class?', function() {
        assert.typeOf(BehaviourInterface, 'function');
        assert.typeOf(new BehaviourInterface(), 'object');
        assert.instanceOf(new BehaviourInterface(), BehaviourInterface);
    });

    it('Has prototype methods?', function() {
        assert.typeOf(BehaviourInterface.prototype.getPosition, 'function');
        assert.typeOf(BehaviourInterface.prototype.getRotate, 'function');
    });

});
