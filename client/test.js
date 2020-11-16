"use strict";
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        return this.name;
    };
    return Person;
}());
var person = new Person("Lee");
console.log(person.sayHello());
