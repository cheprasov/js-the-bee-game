"use strict";

export default class BehaviourInterface {

    /**
     * @param {number} time
     * @return {{x:number, y:number, z:number}}
     */
    getPosition(time) {}

    /**
     * @param {number} time
     * @return {number}
     */
    getRotate(time) {}

}
