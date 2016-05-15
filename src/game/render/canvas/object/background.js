"use strict";

import ImageClass from './image-class.js';

export default class Background extends ImageClass {

    constructor() {
        super({
            image: 'imgs/bg2.jpg',
            width: 800,
            height: 800
        });
    }

}
