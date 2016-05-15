"use strict";

export default class BeeInterface {

    /**
     * @return {BehaviourInterface}
     */
    getBehaviour() {}

    /**
     * @param {BehaviourInterface} behaviour
     */
    setBehaviour(behaviour) {}

    /**
     * @return {number}
     */
    getHealth() {}

    /**
     * @return {number} new value after decrement
     */
    reduceHealth() {}

    /**
     *
     */
    kill() {}

    /**
     * @return {boolean}
     */
    isDead() {}

    /**
     * @param {Number} time
     * @return {{x:{Number}, y:{Number}, z:{Number}}}
     */
    getPosition(time) {}

    /**
     * @param {Number} time
     * @return {Number}
     */
    getRotate(time) {}

    /**
     * @return {Number}
     */
    getMaxHealth() {}
}
