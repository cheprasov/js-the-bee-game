"use strict";

// Queen
export const GAME_BEE_QUEEN_COUNT  =   1;
export const GAME_BEE_QUEEN_HEALTH = 100;
export const GAME_BEE_QUEEN_DAMAGE =   8;

// Worker
export const GAME_BEE_WORKER_COUNT  =  5;
export const GAME_BEE_WORKER_HEALTH = 75;
export const GAME_BEE_WORKER_DAMAGE = 10;

// Drone
export const GAME_BEE_DRONE_COUNT  =  8;
export const GAME_BEE_DRONE_HEALTH = 50;
export const GAME_BEE_DRONE_DAMAGE = 12;

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

let config = {

    containerId : 'the-bee-game',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,

    logic: {
        count: {
            queen:  GAME_BEE_QUEEN_COUNT,
            worker: GAME_BEE_WORKER_COUNT,
            drone:  GAME_BEE_DRONE_COUNT
        }
    }

};

export default config;
