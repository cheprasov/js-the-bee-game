"use strict";

import ImageClass from './image-class.js';

export default class QueenBee extends ImageClass {

    constructor() {
        super({
            image: 'imgs/bee02.png',
            width: 108,
            height: 146,
            scale: 1.25,
            sprites: {
                grid: {cols: 20, rows: 1},
                count: 10,
                speed: 1000
            }
        });
    }

}
