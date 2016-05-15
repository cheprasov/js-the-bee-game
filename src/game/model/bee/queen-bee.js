"use strict";

import {GAME_BEE_QUEEN_HEALTH, GAME_BEE_QUEEN_DAMAGE} from './../../config.js';

import AbstractBee from './abstract-bee.js';
import EventManager from './../../event/event-manager.js';

export const EVENT_QUEEN_IS_DEAD = 'event:queenIsDead';

export default class QueenBee extends AbstractBee {

    /**
     * @inheritDoc
     */
    _getDamage() {
        return GAME_BEE_QUEEN_DAMAGE;
    }

    /**
     * @inheritDoc
     */
    getMaxHealth() {
        return GAME_BEE_QUEEN_HEALTH;
    }

    /**
     * @inheritDoc
     */
    _onDead() {
        super._onDead();
        EventManager.trigger(EVENT_QUEEN_IS_DEAD);
    }

}
