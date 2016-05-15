"use strict";

import SounderInterface from './sounder-interface.js';
import EventManager from './../event/event-manager.js';

export default class Mp3Sounder extends SounderInterface {

    /**
     * @param {HTMLElement} container
     */
    constructor(container) {
        super();
        this.container = container;

        let elements = this.container.querySelectorAll('.sound');
        let element;
        for (let i = 0; i < elements.length; i += 1) {
            element = elements[i];
            EventManager.bind(element, 'play', false, (element) => {
                element.classList.add('playing');
            });
            EventManager.bind(element, 'ended', false, (element) => {
                element.classList.remove('playing');
            })
        }
    }

    /**
     * @inheritDoc
     */
    sound(name, volume = 1) {
        let element = this.container.querySelector('.sound.sound-' + name + ':not(.playing)');
        if (element) {
            element.volume = volume || 1;
            element.play();
        }
    }

    /**
     * @inheritDoc
     */
    music(name, volume = 1, play = true) {
        let element = this.container.querySelector('.music.music-' + name);
        if (element) {
            element.volume = volume || 1;
            play ? element.play() : element.pause();
        }
    }

}
