let assert = require('chai').assert;

import BeeFactory from './../../../src/game/factory/bee-factory.js';
import QueenBee from './../../../src/game/model/bee/queen-bee.js';
import WorkerBee from './../../../src/game/model/bee/worker-bee.js';
import DroneBee from './../../../src/game/model/bee/drone-bee.js';

describe('BeeFactory', function() {

    it('Is it class?', function() {
        assert.typeOf(BeeFactory, 'function');
        assert.typeOf(new BeeFactory(), 'object');
        assert.instanceOf(new BeeFactory(), BeeFactory);
    });

    it('#createBeeByType', function() {
        assert.instanceOf(BeeFactory.createBeeByType('queen'), QueenBee);
        assert.instanceOf(BeeFactory.createBeeByType('worker'), WorkerBee);
        assert.instanceOf(BeeFactory.createBeeByType('drone'), DroneBee);
        assert.throws(() => {BeeFactory.createBeeByType('foo');}, Error);
        assert.throws(BeeFactory.createBeeByType, Error);
    });

    it('#createBeesByType', function() {
        let bees = BeeFactory.createBeesByType('worker', 0);
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 0);

        bees = BeeFactory.createBeesByType('queen', 1);
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 1);
        assert.instanceOf(bees[0], QueenBee);

        bees = BeeFactory.createBeesByType('worker', 2);
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 2);
        assert.instanceOf(bees[0], WorkerBee);
        assert.instanceOf(bees[1], WorkerBee);

        bees = BeeFactory.createBeesByType('drone', 3);
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 3);
        assert.instanceOf(bees[0], DroneBee);
        assert.instanceOf(bees[1], DroneBee);
        assert.instanceOf(bees[2], DroneBee);
    });

});
