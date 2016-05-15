let assert = require('chai').assert;

import config from './../../src/game/config.js';

import {
    GAME_BEE_QUEEN_COUNT,
    GAME_BEE_QUEEN_HEALTH,
    GAME_BEE_QUEEN_DAMAGE,

    GAME_BEE_WORKER_COUNT,
    GAME_BEE_WORKER_HEALTH,
    GAME_BEE_WORKER_DAMAGE,

    GAME_BEE_DRONE_COUNT,
    GAME_BEE_DRONE_HEALTH,
    GAME_BEE_DRONE_DAMAGE,

    GAME_WIDTH,
    GAME_HEIGHT
} from './../../src/game/config.js';

describe('Config test', function() {

    it('Check constants', function () {
        assert.strictEqual(GAME_WIDTH, 800);
        assert.strictEqual(GAME_HEIGHT, 600);

        assert.strictEqual(GAME_BEE_QUEEN_COUNT, 1);
        assert.strictEqual(GAME_BEE_QUEEN_HEALTH, 100);
        assert.strictEqual(GAME_BEE_QUEEN_DAMAGE, 8);

        assert.strictEqual(GAME_BEE_WORKER_COUNT , 5);
        assert.strictEqual(GAME_BEE_WORKER_HEALTH, 75);
        assert.strictEqual(GAME_BEE_WORKER_DAMAGE, 10);

        assert.strictEqual(GAME_BEE_DRONE_COUNT, 8);
        assert.strictEqual(GAME_BEE_DRONE_HEALTH, 50);
        assert.strictEqual(GAME_BEE_DRONE_DAMAGE, 12);
    });

    it('Width & height is setted', function () {
        assert.strictEqual(config.width, GAME_WIDTH);
        assert.strictEqual(config.height, GAME_HEIGHT);
    });

    it('Config for logic', function () {
        assert.strictEqual(config.logic.count.queen, GAME_BEE_QUEEN_COUNT);
        assert.strictEqual(config.logic.count.worker, GAME_BEE_WORKER_COUNT);
        assert.strictEqual(config.logic.count.drone, GAME_BEE_DRONE_COUNT);
    });

});
