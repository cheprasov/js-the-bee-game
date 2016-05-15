let assert = require('chai').assert;

import Logic from './../../../src/game/logic/logic.js';

import EventManager from './../../../src/game/event/event-manager.js';
import QueenBee from './../../../src/game/model/bee/queen-bee.js';
import WorkerBee from './../../../src/game/model/bee/worker-bee.js';
import DroneBee from './../../../src/game/model/bee/drone-bee.js';

describe('Logic', function() {

    it('Is it class?', function() {
        assert.typeOf(Logic, 'function');
        assert.typeOf(new Logic(), 'object');
        assert.instanceOf(new Logic(), Logic);
    });

    it('#init()', function() {
        EventManager.clearEventList();
        let logic = new Logic({
            count: {
                'queen': 1,
                'worker': 2,
                'drone': 3
            }
        });

        for (var i = 0; i < 5; i++) {
            logic.init();
            let bees = logic.getBees();
            assert.typeOf(bees, 'array');
            assert.strictEqual(bees.length, 6);
            assert.instanceOf(bees[0], QueenBee);
            assert.instanceOf(bees[1], WorkerBee);
            assert.instanceOf(bees[2], WorkerBee);
            assert.instanceOf(bees[3], DroneBee);
            assert.instanceOf(bees[4], DroneBee);
            assert.instanceOf(bees[5], DroneBee);

            logic._killBees();
            bees = logic.getBees();
            assert.typeOf(bees, 'array');
            assert.strictEqual(bees.length, 0);
        }
    });

    it('#hitBee()', function() {
        EventManager.clearEventList();
        let logic = new Logic({
            count: {
                'queen': 1,
                'worker': 2
            }
        });
        logic.init();

        let bees = logic.getBees();
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 3);
        assert.instanceOf(bees[0], QueenBee);
        assert.instanceOf(bees[1], WorkerBee);
        assert.instanceOf(bees[2], WorkerBee);

        assert.strictEqual(bees[0].getHealth(), bees[0].getMaxHealth());
        assert.strictEqual(bees[1].getHealth(), bees[1].getMaxHealth());
        assert.strictEqual(bees[2].getHealth(), bees[2].getMaxHealth());

        logic.hitBee();

        assert.strictEqual(
              Number(bees[0].getHealth() !== bees[0].getMaxHealth())
            + Number(bees[1].getHealth() !== bees[1].getMaxHealth())
            + Number(bees[2].getHealth() !== bees[2].getMaxHealth()),
            1
        );
    });

    it('Bees will be killed if queen dies', function() {
        EventManager.clearEventList();
        let logic = new Logic({
            count: {
                'queen': 1,
                'worker': 10,
                'drone': 20
            }
        });
        logic.init();

        let bees = logic.getBees();
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 31);

        assert.instanceOf(bees[0], QueenBee);
        bees[0].kill();

        bees = logic.getBees();
        assert.typeOf(bees, 'array');
        assert.strictEqual(bees.length, 0);
    });

});
