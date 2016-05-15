"use strict";

import BeeInterface from './bee-interface.js';
import EventManager from './../../event/event-manager.js';

export const EVENT_BEE_IS_DEAD = 'event:bee_is_dead';
export const EVENT_BEE_IS_HITED = 'event:bee_is_hited';

export default class AbstractBee extends BeeInterface {

    /**
     * @param {BehaviourInterface} behaviour
     */
    constructor (behaviour) {
        super();
        this.setBehaviour(behaviour);
        this.health = this.getMaxHealth();
    }

    /**
     * @inheritDoc
     * @abstract
     */
    getMaxHealth() {
        throw new Error('Abstract method `_getMaxHealth` must be redefined');
    }

    /**
     * @inheritDoc
     */
    setBehaviour(behaviour) {
        this.behaviour = behaviour;
    }

    /**
     * @inheritDoc
     */
    getBehaviour() {
        return this.behaviour;
    }

    /**
     * @inheritDoc
     */
    getHealth() {
        return this.health;
    }

    /**
     * @return {number}
     * @abstract
     * @protected
     */
    _getDamage() {
        throw new Error('Abstract method `_getDamage` must be redefined');
    }

    /**
     * @inheritDoc
     */
    reduceHealth() {
        this.health = Math.max(this.health - this._getDamage(), 0);
        EventManager.trigger(EVENT_BEE_IS_HITED, this);
        if (this.isDead()) {
            this._onDead();
        }
        return this.health;
    }

    /**
     * @inheritDoc
     */
    kill() {
        this.health = 0;
        this._onDead();
    }

    /**
     * @inheritDoc
     */
    isDead() {
        return this.health <= 0;
    }

    /**
     * @inheritDoc
     */
    getPosition(time) {
        return this.getBehaviour().getPosition(time);
    }

    /**
     * @inheritDoc
     */
    getRotate(time) {
        return this.getBehaviour().getRotate(time);
    }

    /**
     * @private
     */
    _onDead() {
        EventManager.trigger(EVENT_BEE_IS_DEAD, this);
    }

}
