"use strict";

import config from './game/config.js';
import Game from './game/game.js';
import EventManager from './game/event/event-manager.js';

EventManager.onReady(() => {

    let game = new Game(config);
    game.show();

});
