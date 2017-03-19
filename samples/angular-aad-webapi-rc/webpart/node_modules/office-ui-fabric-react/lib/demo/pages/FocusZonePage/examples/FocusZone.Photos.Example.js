"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
var array_1 = require('../../../../utilities/array');
require('./FocusZone.Photos.Example.scss');
var PHOTOS = array_1.createArray(25, function () {
    var randomWidth = 50 + Math.floor(Math.random() * 150);
    return {
        url: "http://placehold.it/" + randomWidth + "x100",
        width: randomWidth,
        height: 100
    };
});
exports.FocusZonePhotosExample = function () { return (React.createElement(index_1.FocusZone, null, 
    React.createElement("ul", {className: 'ms-FocusZoneExamples-photoList'}, PHOTOS.map(function (photo, index) { return (React.createElement("div", {key: index, className: 'ms-FocusZoneExamples-photoCell', "data-is-focusable": true, onClick: function () { return console.log('clicked'); }}, 
        React.createElement(index_1.Image, {src: photo.url, width: photo.width, height: photo.height})
    )); }))
)); };

//# sourceMappingURL=FocusZone.Photos.Example.js.map
