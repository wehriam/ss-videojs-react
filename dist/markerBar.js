'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _videojs = require('./videojs');

var _videojs2 = _interopRequireDefault(_videojs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = _videojs2.default.getComponent('Component');

/**
 * Progress Bar - MarkerBar
 *
 * @param {Object} player  Main Player
 * @param {Object=} options Object of option names and values
 * @extends Component
 * @class Marker
 */
/**
 * @file markerjs
 */

var MarkerBar = function (_Component) {
  (0, _inherits3.default)(MarkerBar, _Component);

  function MarkerBar(player, options) {
    (0, _classCallCheck3.default)(this, MarkerBar);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MarkerBar).call(this, player, options));
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */

  (0, _createClass3.default)(MarkerBar, [{
    key: 'createEl',
    value: function createEl() {
      return (0, _get3.default)((0, _getPrototypeOf2.default)(MarkerBar.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-marker-bar'
      });
    }
  }]);
  return MarkerBar;
}(Component);

_videojs2.default.registerComponent('MarkerBar', MarkerBar);
exports.default = MarkerBar;
module.exports = exports['default'];