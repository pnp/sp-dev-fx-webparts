"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Image_1 = require('../../Image');
var Persona_1 = require('../../Persona');
var css_1 = require('../../utilities/css');
require('./DocumentCardActivity.scss');
var DocumentCardActivity = (function (_super) {
    __extends(DocumentCardActivity, _super);
    function DocumentCardActivity() {
        _super.apply(this, arguments);
    }
    DocumentCardActivity.prototype.render = function () {
        var _a = this.props, activity = _a.activity, people = _a.people;
        return (people && people.length > 0 &&
            React.createElement("div", {className: css_1.css('ms-DocumentCardActivity', {
                'ms-DocumentCardActivity--multiplePeople': people.length > 1
            })}, 
                this._renderAvatars(people), 
                React.createElement("div", {className: 'ms-DocumentCardActivity-details'}, 
                    React.createElement("span", {className: 'ms-DocumentCardActivity-name'}, this._getNameString(people)), 
                    React.createElement("span", {className: 'ms-DocumentCardActivity-activity'}, activity))));
    };
    DocumentCardActivity.prototype._renderAvatars = function (people) {
        return (React.createElement("div", {className: 'ms-DocumentCardActivity-avatars'}, 
            people.length > 1 ? this._renderAvatar(people[1]) : null, 
            this._renderAvatar(people[0])));
    };
    DocumentCardActivity.prototype._renderAvatar = function (person) {
        var initialsColor = person.initialsColor ? person.initialsColor : Persona_1.PersonaInitialsColor.blue;
        return (React.createElement("div", {className: 'ms-DocumentCardActivity-avatar'}, 
            person.initials && (React.createElement("div", {className: css_1.css('ms-Persona-initials', Persona_1.PERSONA_INITIALS_COLOR[initialsColor]), role: 'presentation'}, person.initials)), 
            person.profileImageSrc && (React.createElement(Image_1.Image, {src: person.profileImageSrc, role: 'presentation', alt: ''}))));
    };
    DocumentCardActivity.prototype._getNameString = function (people) {
        var nameString = people[0].name;
        if (people.length >= 2) {
            nameString += ' +' + (people.length - 1);
        }
        return nameString;
    };
    return DocumentCardActivity;
}(React.Component));
exports.DocumentCardActivity = DocumentCardActivity;

//# sourceMappingURL=DocumentCardActivity.js.map
