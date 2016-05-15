"use strict";

import BehaviourInterface from './behaviour-interface.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../config.js';

export default class StandBehaviour extends BehaviourInterface {

    /**
     * @inheritDoc
     */
    getPosition(time) {
        return {x: GAME_WIDTH / 2, y: GAME_HEIGHT / 3, z: 0}
    }

    /**
     * @inheritDoc
     */
    getRotate(time) {
        return 0;
    }
}
