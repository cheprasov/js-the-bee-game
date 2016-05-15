"use strict";

import FlyBehaviour from './fly-behaviour.js';

export default class Fly2Behaviour extends FlyBehaviour {

    constructor() {
        super();
        this.speed = Math.random() * 1000;
        this.period = Math.random() * 2000 + 10000;
    }

    /**
     * @inheritDoc
     */
    getRotate(time) {
        return 0;
    }

}
