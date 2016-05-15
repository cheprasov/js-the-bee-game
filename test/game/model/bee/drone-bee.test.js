let assert = require('chai').assert;

import BeeInterface from './../../../../src/game/model/bee/bee-interface.js';
import DroneBee from './../../../../src/game/model/bee/drone-bee.js';
import EventManager from './../../../../src/game/event/event-manager.js';

import {EVENT_BEE_IS_HITED, EVENT_BEE_IS_DEAD} from './../../../../src/game/model/bee/abstract-bee.js';

describe('DroneBee', function() {

    it('Is it class?', function() {
        assert.typeOf(DroneBee, 'function');
        assert.typeOf(new DroneBee(), 'object');
        assert.instanceOf(new DroneBee(), DroneBee);
    });

    it('Does it implement BeeInterface?', function() {
        assert.instanceOf(new DroneBee(), BeeInterface);
    });

    it('Check events', function() {
        let bee = new DroneBee();
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

        bee = new DroneBee();
        let hitsToDie = Math.ceil(bee.getMaxHealth() / bee._getDamage());

        for (var i = 0; i < hitsToDie; i += 1) {
            bee.reduceHealth();
        }

        assert.strictEqual(bee.isDead(), true);
        assert.deepEqual(counter, {die: 2, hit: hitsToDie});
    });

});
