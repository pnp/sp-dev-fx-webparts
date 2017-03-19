"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var Image_1 = require('./Image');
var Image_Props_1 = require('./Image.Props');
describe('Image', function () {
    it('renders an image', function (done) {
        ReactTestUtils.renderIntoDocument(React.createElement(Image_1.Image, {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', onLoad: function () {
            done();
        }}));
    });
    it('can render a covered square image in landscape', function (done) {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Image_1.Image, {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', width: 3, height: 1, imageFit: Image_Props_1.ImageFit.cover, onLoad: function () {
            var renderedDOM = ReactDOM.findDOMNode(component);
            var image = renderedDOM.querySelector('.ms-Image-image');
            try {
                expect(image.className).to.contain('ms-Image-image--portrait');
            }
            catch (e) {
                done(e);
            }
            done();
        }}));
    });
    it('can render a covered square image in portrait', function (done) {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Image_1.Image, {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', width: 1, height: 3, imageFit: Image_Props_1.ImageFit.cover, onLoad: function () {
            var renderedDOM = ReactDOM.findDOMNode(component);
            var image = renderedDOM.querySelector('.ms-Image-image');
            try {
                expect(image.className).to.contain('ms-Image-image--landscape');
            }
            catch (e) {
                done(e);
            }
            done();
        }}));
    });
});

//# sourceMappingURL=Image.test.js.map
