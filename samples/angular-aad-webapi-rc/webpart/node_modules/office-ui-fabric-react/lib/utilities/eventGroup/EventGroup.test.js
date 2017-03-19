"use strict";
var EventGroup_1 = require('./EventGroup');
var expect = chai.expect;
describe('EventGroup', function () {
    it('can observe an HTML element event', function () {
        var timesCalled = 0;
        var sourceButton = document.createElement('button');
        var parent = {
            cb: function () {
                timesCalled++;
            }
        };
        var eg = new EventGroup_1.EventGroup(parent);
        var ev = document.createEvent('HTMLEvents');
        eg.on(sourceButton, 'click', parent.cb);
        ev.initEvent('click', true, true);
        sourceButton.dispatchEvent(ev);
        expect(timesCalled).to.equal(1);
        sourceButton.dispatchEvent(ev);
        expect(timesCalled).to.equal(2);
        eg.dispose();
        sourceButton.dispatchEvent(ev);
        expect(timesCalled).to.equal(2);
    });
    it('can observe an object event', function () {
        var timesCalled = 0;
        var sourceObject = {};
        var parent = {
            cb: function () {
                timesCalled++;
            }
        };
        var parentEvents = new EventGroup_1.EventGroup(parent);
        var sourceEvents = new EventGroup_1.EventGroup(sourceObject);
        sourceEvents.declare(['foo', 'bar']);
        expect(EventGroup_1.EventGroup.isDeclared(sourceObject, 'foo')).to.equal(true);
        expect(EventGroup_1.EventGroup.isDeclared(sourceObject, 'bar')).to.equal(true);
        expect(EventGroup_1.EventGroup.isDeclared(sourceObject, 'baz')).to.equal(false);
        parentEvents.on(sourceObject, 'foo, bar', parent.cb);
        expect(EventGroup_1.EventGroup.isObserved(sourceObject, 'foo')).to.equal(true);
        expect(EventGroup_1.EventGroup.isObserved(sourceObject, 'bar')).to.equal(true);
        expect(EventGroup_1.EventGroup.isObserved(sourceObject, 'baz')).to.equal(false);
        sourceEvents.raise('foo');
        expect(timesCalled).to.equal(1);
        sourceEvents.raise('bar');
        expect(timesCalled).to.equal(2);
        parentEvents.dispose();
        sourceEvents.raise('thing');
        expect(timesCalled).to.equal(2);
    });
    it('can bubble object events', function () {
        var rootCalled = 0;
        var childCalled = 0;
        var grandChildCalled = 0;
        var childResponse = true;
        var root = {
            cb: function () {
                rootCalled++;
            }
        };
        var child = {
            parent: root,
            cb: function () {
                childCalled++;
                return childResponse;
            }
        };
        var grandChild = {
            parent: child,
            cb: function () {
                grandChildCalled++;
            }
        };
        var rootEvents = new EventGroup_1.EventGroup(root);
        var childEvents = new EventGroup_1.EventGroup(child);
        var grandChildEvents = new EventGroup_1.EventGroup(grandChild);
        rootEvents.on(root, 'foo', root.cb);
        childEvents.on(child, 'foo', child.cb);
        grandChildEvents.on(grandChild, 'foo', grandChild.cb);
        // bubble up to the root.
        grandChildEvents.raise('foo', null, true);
        expect(rootCalled).to.equal(1);
        expect(childCalled).to.equal(1);
        expect(grandChildCalled).to.equal(1);
        // cancel at the child.
        childResponse = false;
        grandChildEvents.raise('foo', null, true);
        expect(rootCalled).to.equal(1);
        expect(childCalled).to.equal(2);
        expect(grandChildCalled).to.equal(2);
        // dispose all.
        rootEvents.dispose();
        childEvents.dispose();
        grandChildEvents.dispose();
        grandChildEvents.raise('foo', null, true);
        expect(rootCalled).to.equal(1);
        expect(childCalled).to.equal(2);
        expect(grandChildCalled).to.equal(2);
    });
    it('can cancelBubble/preventDefault if false is returned on an element event callback', function () {
        var rootCalled = 0;
        var childCalled = 0;
        var childResponse = true;
        var rootDiv = document.createElement('div');
        var childDiv = document.createElement('div');
        var grandChildButton = document.createElement('button');
        var parent = {
            onRootClick: function () {
                rootCalled++;
            },
            onChildClick: function () {
                childCalled++;
                return childResponse;
            }
        };
        var parentEvents = new EventGroup_1.EventGroup(parent);
        parentEvents.on(childDiv, 'click', parent.onChildClick);
        parentEvents.on(rootDiv, 'click', parent.onRootClick);
        document.body.appendChild(rootDiv).appendChild(childDiv).appendChild(grandChildButton);
        try {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent('click', true, true);
            grandChildButton.dispatchEvent(ev);
            // verify we bubble.
            expect(childCalled).to.equal(1, 'child not 1');
            expect(rootCalled).to.equal(1);
            // now return false at the child, shouldn't hit root.
            childResponse = false;
            grandChildButton.dispatchEvent(ev);
            expect(childCalled).to.equal(2);
            expect(rootCalled).to.equal(1);
            parentEvents.dispose();
            grandChildButton.dispatchEvent(ev);
            expect(childCalled).to.equal(2);
            expect(rootCalled).to.equal(1);
        }
        finally {
            document.body.removeChild(rootDiv);
        }
    });
    it('can selectively remove event handlers', function () {
        var cb1Called = 0;
        var cb2Called = 0;
        var sourceObject = {};
        var parent = {
            cb1: function () {
                cb1Called++;
            },
            cb2: function () {
                cb2Called++;
            }
        };
        var parentEvents = new EventGroup_1.EventGroup(parent);
        var sourceEvents = new EventGroup_1.EventGroup(sourceObject);
        parentEvents.on(sourceObject, 'foo', parent.cb1);
        parentEvents.on(sourceObject, 'foo', parent.cb2);
        sourceEvents.raise('foo');
        expect(cb1Called).to.equal(1);
        expect(cb1Called).to.equal(1);
        // remove one.
        parentEvents.off(sourceObject, 'foo', parent.cb1);
        sourceEvents.raise('foo');
        expect(cb1Called).to.equal(1);
        expect(cb2Called).to.equal(2);
        // attach it again.
        parentEvents.on(sourceObject, 'foo', parent.cb1);
        sourceEvents.raise('foo');
        expect(cb1Called).to.equal(2);
        expect(cb2Called).to.equal(3);
        // detatch both based on event name.
        parentEvents.off(sourceObject, 'foo');
        sourceEvents.raise('foo');
        expect(cb1Called).to.equal(2);
        expect(cb2Called).to.equal(3);
        // attach it again.
        parentEvents.on(sourceObject, 'foo', parent.cb1);
        parentEvents.on(sourceObject, 'foo', parent.cb2);
        sourceEvents.raise('foo');
        expect(cb1Called).to.equal(3);
        expect(cb2Called).to.equal(4);
        // detach based on object.
        parentEvents.off(sourceObject);
        sourceEvents.raise('foo');
        expect(cb1Called).to.equal(3);
        expect(cb2Called).to.equal(4);
    });
    it('can raise custom html events', function () {
        var timesCalled = 0;
        var sourceButton = document.createElement('button');
        var parent = {
            cb: function () {
                timesCalled++;
            }
        };
        var eg = new EventGroup_1.EventGroup(parent);
        eg.on(sourceButton, 'foobar', parent.cb);
        EventGroup_1.EventGroup.raise(sourceButton, 'foobar');
        expect(timesCalled).to.equal(1);
        EventGroup_1.EventGroup.raise(sourceButton, 'foobar');
        expect(timesCalled).to.equal(2);
        eg.dispose();
        EventGroup_1.EventGroup.raise(sourceButton, 'foobar');
        expect(timesCalled).to.equal(2);
    });
});

//# sourceMappingURL=EventGroup.test.js.map
