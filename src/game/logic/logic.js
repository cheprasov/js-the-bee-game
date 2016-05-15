"use strict";

import EventManager from './../event/event-manager.js';
import BeeFactory from './../factory/bee-factory.js';
import {EVENT_QUEEN_IS_DEAD} from './../model/bee/queen-bee.js';

export const EVENT_LOGIC_GAME_OVER = 'event:logic-game-over';
export const EVENT_LOGIC_HIT_BEE = 'event:logic-hit-bee';

export default class Logic {

    /**
     * @param {Object} config
     */
    constructor(config) {
        this.config = config;
        EventManager.event(EVENT_QUEEN_IS_DEAD, (data) => {
            this._killBees();
        });
    }

    init() {
        this.bees = [];
        for (let b in this.config.count) {
            if (!this.config.count.hasOwnProperty(b)) {
                continue;
            }
            let bees = BeeFactory.createBeesByType(b, this.config.count[b]);
            Array.prototype.push.apply(this.bees, bees);
        }
    }

    getBees() {
        return this.bees;
    }

    hitBee() {
        let bees = this.getBees();
        if (!bees.length) {
            return;
        }
        let index = Math.round(Math.random() * (bees.length - 1));
        let bee = bees[index];

        bee.reduceHealth();
        if (bee.isDead()) {
            this._removeBee(index);
        }
    }

    _removeBee(index) {
        this.bees.splice(index, 1);
    }

    _killBees() {
        let bee;
        while (bee = this.bees.shift()) {
            if (!bee.isDead()) {
                bee.kill();
            }
        }
        EventManager.trigger(EVENT_LOGIC_GAME_OVER)
    }

}
