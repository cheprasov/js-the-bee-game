"use strict";

import BehaviourInterface from './behaviour-interface.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../config.js';

export default class FlyBehaviour extends BehaviourInterface {

    constructor() {
        super();
        this.time = Date.now() - Math.random() * 1000;
        this.speed = Math.random() * 2000 + 2000;
        this.period = Math.random() * 2000 + 1000;
        this.position = {
            x: Math.round(GAME_WIDTH * Math.random()),
            y: Math.round(GAME_HEIGHT * Math.random()),
            z: Math.round(200 * Math.random()) + 50
        };
        this.destPosition = {
            x: Math.round(GAME_WIDTH * Math.random()),
            y: Math.round(GAME_HEIGHT * Math.random()),
            z: Math.round(200 * Math.random()) + 50
        };
        this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);
    }

    /**
     * @param {number} time
     * @private
     */
    _getDestPosition(time) {
        if (time - this.time >= this.period) {
            this.position = this.destPosition;
            this.destPosition = {
                x: Math.round(GAME_WIDTH * Math.random()),
                y: Math.round(GAME_HEIGHT * Math.random()),
                z: Math.round(200 * Math.random()) + 50
            };
            this.time = time;
            this.rotate = this._getAngle(this.position.y, this.position.x, this.destPosition.y, this.destPosition.x);
        }
        return this.destPosition;
    }

    /**
     * @param {number} y1
     * @param {number} x1
     * @param {number} y2
     * @param {number} x2
     * @return {number}
     * @private
     */
    _getAngle (y1, x1, y2, x2) {
        var xd = y2 - y1,
            yd = x2 - x1,
            angle = Math.abs(Math.round(180 * Math.atan(xd / yd) / Math.PI));

        if (y2 >= y1) {
            if (x2 >= x1) {
            } else {
                angle = 180 - angle;
            }
        } else {
            if (x2 >= x1) {
                angle = 360 - angle
            } else {
                angle += 180
            }
        }
        return angle;
    }

    /**
     * @inheritDoc
     */
    getPosition(time) {
        let dest = this._getDestPosition(time);
        let delta = Math.min((time - this.time) / this.period, 1);

        return {
            x : this.position.x + (dest.x - this.position.x) * delta,
            y: this.position.y + (dest.y - this.position.y) * delta,
            z: this.position.z + (dest.z - this.position.z) * delta
        };
    }

    /**
     * @inheritDoc
     */
    getRotate(time) {
        return this.rotate + 90;
    }

}
