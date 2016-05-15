"use strict";

import ImageClass from './image-class.js';

export default class Explosion extends ImageClass {

    constructor() {
        super({
            image: 'imgs/explosion.png',
            width: 100,
            height: 100,
            scale: 1,
            loop: 1,
            sprites: {
                grid: {cols: 9, rows: 8},
                count: 72,
                speed: 500
            }
        });
    }

}
