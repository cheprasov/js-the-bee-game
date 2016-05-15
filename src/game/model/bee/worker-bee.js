"use strict";

import AbstractBee from './abstract-bee.js';
import {GAME_BEE_WORKER_HEALTH, GAME_BEE_WORKER_DAMAGE} from './../../config.js';

export default class WorkerBee extends AbstractBee {

    /**
     * @inheritDoc
     */
    _getDamage() {
        return GAME_BEE_WORKER_DAMAGE;
    }

    /**
     * @inheritDoc
     */
    getMaxHealth() {
        return GAME_BEE_WORKER_HEALTH;
    }

}
