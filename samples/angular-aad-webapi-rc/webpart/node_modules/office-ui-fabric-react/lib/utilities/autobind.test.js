"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var expect = chai.expect;
var autobind_1 = require('./autobind');
var Greeter = (function () {
    function Greeter() {
        this._hello = 'hello';
    }
    Greeter.prototype.sayHello = function () {
        return this._hello;
    };
    __decorate([
        autobind_1.autobind
    ], Greeter.prototype, "sayHello", null);
    return Greeter;
}());
describe('autobind', function () {
    it('can bind a method', function () {
        var greeter = new Greeter();
        var sayHello = greeter.sayHello;
        expect(sayHello()).equals('hello', 'autobind did not bind the sayHello method to the object instance.');
    });
});

//# sourceMappingURL=autobind.test.js.map
