"use strict";

let eventList = {};

export default class EventManager {

    /**
     * @return {Function}
     */
    static getRequestAnimFrame() {
        if (EventManager.requestAnimFrame) {
            return EventManager.requestAnimFrame;
        }
        if (!window) {
            EventManager.requestAnimFrame = function(callback) {
                setTimeout(callback, 1000 / 60);
            };
        } else {
            EventManager.requestAnimFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }
        return EventManager.requestAnimFrame;
    }

    /**
     * @param {Function} callback
     * @return {Function}
     */
    static requestAnimationFrame (callback) {
        let render = () => {
            let time = Date.now();
            if (callback(time)) {
                EventManager.getRequestAnimFrame()(render);
            }
        };
        return render;
    }

    /**
     * @param {Function} callback
     */
    static onReady(callback) {
        let completed = () => {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            callback();
        };
        if (document.readyState === "complete") {
            completed();
        } else {
            document.addEventListener("DOMContentLoaded", completed);
            window.addEventListener("load", completed);
        }
    }

    /**
     * @param {HTMLElement} container
     * @param {string} type
     * @param {string} classSelector
     * @param {Function} callback
     */
    static bind(container, type, classSelector, callback) {
        container.addEventListener(type, function(e) {
            if (!classSelector || e.target.classList.contains(classSelector)) {
                callback(e.target);
            }
        });
    }

    /**
     * @param {string} action
     * @param {Function} callback
     * @param {number} count
     */
    static event(action, callback, count = Infinity) {
        if (!eventList[action]) {
            eventList[action] = [];
        }
        eventList[action].push({
            callback: callback,
            count: count
        });
    }

    /**
     * @return {Object}
     */
    static getEventList() {
        return eventList;
    }

    /**
     * @param {(string|null)=} event
     * @return {Object}
     */
    static clearEventList(event = null) {
        if (event) {
            delete eventList[event];
        } else {
            eventList = {};
        }
    }

    /**
     * @param {string} action
     * @param {*=} data
     */
    static trigger(action, data = null) {
        if (!action) {
            return;
        }
        if (!eventList[action] || !eventList[action].length) {
            return;
        }
        for (let i = 0; i < eventList[action].length; i += 1) {
            if (eventList[action][i].count-- > 0) {
                eventList[action][i].callback(data);
            }
        }
        for (let i = eventList[action].length - 1; i >= 0 ;i -= 1) {
            if (eventList[action][i].count <= 0) {
                eventList[action].splice(i, 1);
            }
        }
    }

}
