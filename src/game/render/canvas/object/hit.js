"use strict";

import ImageClass from './image-class.js';

export default class Hit extends ImageClass {

    constructor() {
        super({
            image: 'imgs/light.png',
            width: 192,
            height: 192,
            scale: 0.5,
            loop: 1,
            sprites: {
                grid: {cols: 5, rows: 5},
                count: 21,
                speed: 500
            }
        });
    }

}
