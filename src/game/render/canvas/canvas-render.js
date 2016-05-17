"use strict";

import RenderInterface from './../render-interface.js';
import EventManager from './../../event/event-manager.js';

import {EVENT_BEE_IS_DEAD, EVENT_BEE_IS_HITED} from './../../model/bee/abstract-bee.js';
import {GAME_WIDTH, GAME_HEIGHT} from './../../config.js';
import {EVENT_LOGIC_HIT_BEE} from './../../logic/logic.js';

import QueenBee from './../../model/bee/queen-bee.js';
import WorkerBee from './../../model/bee/worker-bee.js';
import DroneBee from './../../model/bee/drone-bee.js';

import ImageQueenBee from './object/queen-bee.js';
import ImageWorkerBee from './object/worker-bee.js';
import ImageDroneBee from './object/drone-bee.js';
import ImageExplosion from './object/explosion.js';
import ImageFireWeapon from './object/weapon-fire.js';
import ImageHit from './object/hit.js';

let imageQueenBee = new ImageQueenBee();
let imageDroneBee = new ImageDroneBee();
let imageWorkerBee = new ImageWorkerBee();

export default class CanvasRender extends RenderInterface {

    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        super();
        this.time = new Date();
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.renderElements = [];

        EventManager.event(EVENT_BEE_IS_DEAD, (bee) => {
            this.renderElements.push({
                type: 'explosion',
                image: new ImageExplosion(),
                position: bee.getPosition(Date.now())
            });
        });

        EventManager.event(EVENT_BEE_IS_HITED, (bee) => {
            for (let i = 0; i < this.renderElements.length; i += 1) {
                if (this.renderElements[i].type === 'weapon') {
                    this.renderElements.splice(i, 1);
                }
            }
            let pos = bee.getPosition(Date.now());
            this.renderElements.push({
                type: 'hit',
                image: new ImageHit(),
                position: {x: pos.x, y: pos.y}
            });
            let weapon = new ImageFireWeapon();
            this.renderElements.push({
                type: 'weapon',
                image: weapon,
                position: {x: pos.x, y: GAME_HEIGHT - weapon.getHeight() / 2}
            });
        });
    }

    /**
     * @return {number}
     * @private
     */
    _getTime() {
        return this.time.getTime();
    }

    /**
     * @param {Logic} logic
     */
    render(logic) {
        let render = EventManager.requestAnimationFrame((time) => {
            let stop = true;
            this._clear();
            let bees = logic.getBees();
            if (bees.length) {
                stop = false;
                for (let i = 0; i < bees.length; i += 1) {
                    this._renderBee(time, bees[i]);
                }
            }
            if (this.renderElements.length) {
                stop = false;
                for (let i = 0; i < this.renderElements.length; i += 1) {
                    if (this._renderElement(time, this.renderElements[i])) {
                        this.renderElements.splice(i--, 1);
                    }
                }
            }
            return !stop;
        });
        render();
    }

    _clear() {
        this.context.clearRect(-1, -1, this.canvas.width + 3, this.canvas.height + 3);
    }

    _renderElement(time, element) {
        this.context.save();
        this.context.translate(element.position.x, element.position.y);
        let result = element.image.render(this.context, time);
        this.context.restore();
        return !result;
    }

    /**
     * @param {number} time
     * @param {BeeInterface} bee
     * @private
     */
    _renderBee(time, bee) {
        let position = bee.getPosition(time);
        let rotate = bee.getRotate(time);

        let imageBee;

        if (bee instanceof QueenBee) {
            imageBee = imageQueenBee;
        } else if (bee instanceof WorkerBee) {
            imageBee = imageWorkerBee;
        } else if (bee instanceof DroneBee) {
            imageBee = imageDroneBee;
        } else {
            throw new Error('Image for bee is not found');
        }

        let angle = rotate * (Math.PI / 180);
        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.rotate(angle);
        imageBee.render(this.context, time);
        this.context.restore();

        this.context.save();
        this.context.translate(position.x, position.y);
        this._renderBeeHealt(bee, imageBee);
        this.context.restore();
    }

    /**
     * @param {BeeInterface} bee
     * @param {ImageClass} imageBee
     * @private
     */
    _renderBeeHealt(bee, imageBee) {
        let health = bee.getHealth() / bee.getMaxHealth();
        let y = imageBee.getScale() * imageBee.getHeight() * 0.40;

        let w = bee.getMaxHealth() / 2;
        let l = bee.getHealth() / 2;

        this.context.fillStyle = '#ffffff';
        this.context.fillRect(-w / 2 - 1, y - 1, w + 2, 7);

        this.context.fillStyle = '#eb212e';
        this.context.globalAlpha = 0.25;
        this.context.fillRect(-w / 2, y, w, 5);

        this.context.globalAlpha = 1;
        this.context.fillRect(-w / 2, y, l, 5);
    }

}
