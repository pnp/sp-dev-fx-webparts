"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @example
 * <DelayedRender delay={ 3000 }>
 *  <div className='foo-List-loadingSpinner'>
 *    <p>I am loading</p>
 *    <Spinner />
 *  </div>
 * </DelayedRender>
 */
var DelayedRender = (function (_super) {
    __extends(DelayedRender, _super);
    function DelayedRender(props) {
        _super.call(this, props);
        this.state = {
            isRendered: false
        };
    }
    DelayedRender.prototype.componentDidMount = function () {
        var _this = this;
        var delay = this.props.delay;
        this._timeoutId = setTimeout(function () {
            _this.setState({
                isRendered: true
            });
        }, delay);
    };
    DelayedRender.prototype.componentWillUnmount = function () {
        clearTimeout(this._timeoutId);
    };
    DelayedRender.prototype.render = function () {
        return this.state.isRendered ? React.Children.only(this.props.children) : null;
    };
    DelayedRender.defaultProps = {
        delay: 0
    };
    return DelayedRender;
}(React.Component));
exports.DelayedRender = DelayedRender;

//# sourceMappingURL=DelayedRender.js.map
