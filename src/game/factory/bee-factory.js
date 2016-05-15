"use strict";

import QueenBee from './../model/bee/queen-bee.js';
import WorkerBee from './../model/bee/worker-bee.js';
import DroneBee from './../model/bee/drone-bee.js';

import StandBehaviour from './../behaviour/stand-behaviour.js';
import FlyBehaviour from './../behaviour/fly-behaviour.js';
import Fly2Behaviour from './../behaviour/fly2-behaviour.js';

export default class BeeFactory {

    /**
     * @param {string} type
     * @param {number} count
     * @return {Array}
     */
    static createBeesByType(type, count) {
        let bees = [];
        for (let i = 0; i < count; i += 1) {
            bees.push(BeeFactory.createBeeByType(type));
        }
        return bees;
    }

    /**
     * @param {string} type
     * @return {BeeInterface}
     * @throws {Error}
     */
    static createBeeByType(type) {
        switch (type) {
            case 'queen':
                return new QueenBee(new StandBehaviour());
            case 'worker':
                return new WorkerBee(new Fly2Behaviour());
            case 'drone':
                return new DroneBee(new FlyBehaviour());
        }
        throw new Error('Invalid type for Bee');
    }
}
