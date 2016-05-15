"use strict";

import ImageClass from './image-class.js';

export default class DroneBee extends ImageClass {

    constructor() {
        super({
            image: 'imgs/bee01.png',
            width: 100,
            height: 90,
            scale: 0.75,
            sprites: {
                grid: {cols: 4, rows: 1},
                count: 4,
                speed: 120
            }
        });
    }

}
