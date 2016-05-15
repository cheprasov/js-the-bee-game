"use strict";

import Logic from './logic/logic.js';
import {EVENT_LOGIC_GAME_OVER} from './logic/logic.js';
import CanvasRender from './render/canvas/canvas-render.js';
import template from './template/template.js';
import EventManager from './event/event-manager.js';
import {EVENT_BEE_IS_DEAD, EVENT_BEE_IS_HITED} from './model/bee/abstract-bee.js'
import Mp3Sounder from './sounder/mp3-sounder.js';

export const EVENT_GAME_PLAY = 'event:game-play';

export default class Game {

    /**
     * @param {Object} config
     * @private
     */
    constructor(config) {
        this._setConfig(config);
        this.canvas = null;
        this.container = null;
    }

    /**
     *
     */
    show() {
        this.show = () => {/* only once we can call init method */};
        this._setLogic(new Logic(this._getConfig().logic));
        this._render();
        this._bindEvents();
    }

    /**
     * @param {Object} config
     * @private
     */
    _setConfig(config) {
        this.config = config;
    }

    /**
     * @return {Object}
     */
    _getConfig() {
        return this.config;
    }

    /**
     * @param {Logic} logic
     */
    _setLogic(logic) {
        this.logic = logic;
    }

    /**
     * @return {Logic}
     */
    _getLogic() {
       return this.logic;
    }

    /**
     * @param {RenderInterface} render
     * @private
     */
    _setRender(render) {
        this.render = render;
    }

    /**
     * @return {RenderInterface}
     * @private
     */
    _getRender() {
        return this.render;
    }

    _render() {
        this.container = document.getElementById(this._getConfig().containerId);
        this.container.innerHTML = template;
        this.canvas = this.container.querySelector('.game-canvas');
        this.canvas.width = this._getConfig().width;
        this.canvas.height = this._getConfig().height;
        this._setRender(new CanvasRender(this.canvas));
    }

    _bindEvents() {
        let container = this.container;
        EventManager.bind(container, 'click', 'js-game-play', () => {
            container.querySelector('.page-menu').style.display = 'none';
            container.querySelector('.page-results').style.display = 'none';
            container.querySelector('.page-game').style.display = 'block';
            this._play();
        });
        EventManager.bind(container, 'click', 'js-game-hit-bee', () => {
            this._hitBee();
        });
        container.querySelector('.page-menu').style.display = 'block';

        let mp3 = new Mp3Sounder(this.container);

        EventManager.event(EVENT_LOGIC_GAME_OVER, (results) => {
            setTimeout(() => {
                container.querySelector('.page-results').style.display = 'block';
                mp3.sound('win', 1);
                mp3.music('bees', 1, false);
            }, 2000);
        });
        EventManager.event(EVENT_BEE_IS_DEAD, () => {
            mp3.sound('bomb', 0.4);
        });
        EventManager.event(EVENT_BEE_IS_HITED, () => {
            mp3.sound('shotgun', 0.4);
        });
        EventManager.event(EVENT_GAME_PLAY, () => {
            mp3.music('bees', 1);
        });
    }

    _play() {
        this.logic.init();
        this._getRender().render(this.logic);
        EventManager.trigger(EVENT_GAME_PLAY);
    }

    _hitBee() {
        this.logic.hitBee();
    }

}
