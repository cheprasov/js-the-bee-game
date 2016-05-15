"use strict";

import ImageClass from './image-class.js';

export default class WeaponFire extends ImageClass {

    constructor() {
        super({
            image: 'imgs/weapon.png',
            width: 201,
            height: 130,
            scale: 1,
            loop: 1,
            sprites: {
                grid: {cols: 5, rows: 2},
                count: 10,
                speed: 2000
            }
        });
    }

}
