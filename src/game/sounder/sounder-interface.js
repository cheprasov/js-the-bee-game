"use strict";

export default class SounderInterface {

    /**
     * @param {string} name
     * @param {number} volume
     */
    sound(name, volume) {}

    /**
     * @param {string} name
     * @param {number=} volume
     * @param {boolean=} play
     */
    music(name, volume = 1, play = true) {}

}
