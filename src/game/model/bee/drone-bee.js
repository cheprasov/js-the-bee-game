"use strict";

import AbstractBee from './abstract-bee.js';
import {GAME_BEE_DRONE_HEALTH, GAME_BEE_DRONE_DAMAGE} from './../../config.js';

export default class DroneBee extends AbstractBee {

    /**
     * @inheritDoc
     */
    _getDamage() {
        return GAME_BEE_DRONE_DAMAGE;
    }

    /**
     * @inheritDoc
     */
    getMaxHealth() {
        return GAME_BEE_DRONE_HEALTH;
    }

}
