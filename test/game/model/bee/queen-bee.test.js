let assert = require('chai').assert;

import BeeInterface from './../../../../src/game/model/bee/bee-interface.js';
import QueenBee from './../../../../src/game/model/bee/queen-bee.js';
import EventManager from './../../../../src/game/event/event-manager.js';

import {EVENT_QUEEN_IS_DEAD} from './../../../../src/game/model/bee/queen-bee.js';
import {EVENT_BEE_IS_HITED, EVENT_BEE_IS_DEAD} from './../../../../src/game/model/bee/abstract-bee.js';

describe('QueenBee', function() {

    it('Is it class?', function() {
        assert.typeOf(QueenBee, 'function');
        assert.typeOf(new QueenBee(), 'object');
        assert.instanceOf(new QueenBee(), QueenBee);
    });

    it('Does it implement BeeInterface?', function() {
        assert.instanceOf(new QueenBee(), BeeInterface);
    });

    it('Check events', function() {
        let bee = new QueenBee();
        let counter = {
            queen: 0,
            die: 0,
            hit: 0
        };

        EventManager.event(EVENT_QUEEN_IS_DEAD, () => {
            counter.queen++;
        });
        EventManager.event(EVENT_BEE_IS_DEAD, () => {
            counter.die++;
        });
        EventManager.event(EVENT_BEE_IS_HITED, () => {
            counter.hit++;
        });

        bee.kill();

        assert.strictEqual(bee.isDead(), true);
        assert.deepEqual(counter, {queen: 1, die: 1, hit: 0});

        bee = new QueenBee();
        let hitsToDie = Math.ceil(bee.getMaxHealth() / bee._getDamage());

        for (var i = 0; i < hitsToDie; i += 1) {
            bee.reduceHealth();
        }

        assert.strictEqual(bee.isDead(), true);
        assert.deepEqual(counter, {queen: 2, die: 2, hit: hitsToDie});
    });

});
