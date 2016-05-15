let assert = require('chai').assert;

import BeeInterface from './../../../../src/game/model/bee/bee-interface.js';
import WorkerBee from './../../../../src/game/model/bee/worker-bee.js';
import EventManager from './../../../../src/game/event/event-manager.js';

import {EVENT_BEE_IS_HITED, EVENT_BEE_IS_DEAD} from './../../../../src/game/model/bee/abstract-bee.js';

describe('WorkerBee', function() {

    it('Is it class?', function() {
        assert.typeOf(WorkerBee, 'function');
        assert.typeOf(new WorkerBee(), 'object');
        assert.instanceOf(new WorkerBee(), WorkerBee);
    });

    it('Does it implement BeeInterface?', function() {
        assert.instanceOf(new WorkerBee(), BeeInterface);
    });

    it('Check events', function() {
        let bee = new WorkerBee();
        let counter = {
            die: 0,
            hit: 0
        };
        EventManager.event(EVENT_BEE_IS_DEAD, () => {
            counter.die++;
        });
        EventManager.event(EVENT_BEE_IS_HITED, () => {
            counter.hit++;
        });

        bee.kill();

        assert.strictEqual(bee.isDead(), true);
        assert.deepEqual(counter, {die: 1, hit: 0});

        bee = new WorkerBee();
        let hitsToDie = Math.ceil(bee.getMaxHealth() / bee._getDamage());

        for (var i = 0; i < hitsToDie; i += 1) {
            bee.reduceHealth();
        }

        assert.strictEqual(bee.isDead(), true);
        assert.deepEqual(counter, {die: 2, hit: hitsToDie});
    });

});
