let assert = require('chai').assert;

import EventManager from './../../../src/game/event/event-manager.js';

describe('EventManager', function() {

    it('Is it class?', function() {
        assert.typeOf(EventManager, 'function');
        assert.typeOf(new EventManager(), 'object');
        assert.instanceOf(new EventManager(), EventManager);
    });

    it('#getEventList()', function () {
        assert.typeOf(EventManager.getEventList, 'function');
        assert.deepEqual(EventManager.getEventList(), {});
    });

    it('#clearEventList()', function () {
        assert.typeOf(EventManager.clearEventList, 'function');
        EventManager.event('foo', () => {return 1;} , 2);
        EventManager.clearEventList();
        assert.deepEqual(EventManager.getEventList(), {});

        let fun = () => {return 1;};
        EventManager.event('foo', fun, 2);
        EventManager.event('bar', () => {return 2;});

        EventManager.clearEventList('bar');
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{
                callback: fun,
                count: 2
            }]
        });

        EventManager.clearEventList('foo');
        assert.deepEqual(EventManager.getEventList(), {});
    });

    it('#event()', function () {
        assert.typeOf(EventManager.event, 'function');
        assert.deepEqual(EventManager.clearEventList() || EventManager.getEventList(), {});

        let fun1 = () => {return 'hello';};
        let fun2 = () => {return 'world';};

        EventManager.event('foo', fun1 , 2);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun1, count: 2}]
        });

        EventManager.event('bar', fun2);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun1, count: 2}],
            bar: [{callback: fun2, count: Infinity}]
        });

        assert.deepEqual(EventManager.clearEventList() || EventManager.getEventList(), {});
    });

    it('#trigger() simple', function () {
        assert.typeOf(EventManager.trigger, 'function');
        assert.deepEqual(EventManager.clearEventList() || EventManager.getEventList(), {});

        let obj = {fun1: 0, fun2: 0};
        let fun1 = (count) => {obj.fun1 += count;};
        let fun2 = (count) => {obj.fun2 += count;};

        EventManager.event('foo', fun1 , 2);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun1, count: 2}]
        });

        EventManager.event('bar', fun2);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun1, count: 2}],
            bar: [{callback: fun2, count: Infinity}]
        });

        EventManager.trigger('foo', 1);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun1, count: 1}],
            bar: [{callback: fun2, count: Infinity}]
        });
        assert.deepEqual(obj, {fun1: 1, fun2: 0});

        EventManager.trigger('foo', 41);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [],
            bar: [{callback: fun2, count: Infinity}]
        });
        assert.deepEqual(obj, {fun1: 42, fun2: 0});

        EventManager.trigger('bar', 10);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [],
            bar: [{callback: fun2, count: Infinity}]
        });
        assert.deepEqual(obj, {fun1: 42, fun2: 10});

        assert.deepEqual(EventManager.clearEventList() || EventManager.getEventList(), {});
    });

    it('#trigger() several events', function () {
        assert.typeOf(EventManager.trigger, 'function');
        assert.deepEqual(EventManager.clearEventList() || EventManager.getEventList(), {});

        let obj = {fun1: 100, fun2: 0};
        let fun1 = (count) => {obj.fun1 += count;};
        let fun2 = (count) => {obj.fun2 += count;};

        EventManager.event('foo', fun1 , 2);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun1, count: 2}]
        });

        EventManager.event('foo', fun2);
        assert.deepEqual(EventManager.getEventList(), {
            foo: [
                {callback: fun1, count: 2},
                {callback: fun2, count: Infinity}
            ]
        });

        EventManager.trigger('foo', 10);
        assert.deepEqual(obj, {fun1: 110, fun2: 10});
        assert.deepEqual(EventManager.getEventList(), {
            foo: [
                {callback: fun1, count: 1},
                {callback: fun2, count: Infinity}
            ]
        });

        EventManager.trigger('foo', 1);
        assert.deepEqual(obj, {fun1: 111, fun2: 11});
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun2, count: Infinity}]
        });

        EventManager.trigger('foo', 31);
        assert.deepEqual(obj, {fun1: 111, fun2: 42});
        assert.deepEqual(EventManager.getEventList(), {
            foo: [{callback: fun2, count: Infinity}]
        });

       assert.deepEqual(EventManager.clearEventList() || EventManager.getEventList(), {});
    });

});
