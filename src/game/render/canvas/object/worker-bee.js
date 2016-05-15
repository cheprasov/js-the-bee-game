"use strict";

import ImageClass from './image-class.js';

export default class WorkerBee extends ImageClass {

    constructor() {
        super({
            image: 'imgs/bee03.png',
            width: 64,
            height: 49,
            scale: 1.25,
            sprites: {
                grid: {cols: 3, rows: 1},
                count: 3,
                speed: 500
            }
        });
    }

}
