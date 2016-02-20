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
 * Progress Bar - Marker
 *
 * @param {Object} player  Main Player
 * @param {Object=} options Object of option names and values
 * @extends Component
 * @class Marker
 */
/**
 * @file markerjs
 */

var Marker = function (_Component) {
  (0, _inherits3.default)(Marker, _Component);

  function Marker(player, options) {
    (0, _classCallCheck3.default)(this, Marker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Marker).call(this, player, options));

    _this.on('click', _this.handleClick);

    var duration = player.duration();
    var offset = options.seconds / options.duration;
    _this.offset = offset * 100;

    player.on('ready', function () {
      this.setOffset(this.offset);
    }.bind(_this));

    return _this;
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */


  (0, _createClass3.default)(Marker, [{
    key: 'createEl',
    value: function createEl() {

      return (0, _get3.default)((0, _getPrototypeOf2.default)(Marker.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-marker',
        innerHTML: '<span class="vjs-control-marker"><span class="vj-control-marker-inner">+</span></span>'
      });
    }
  }, {
    key: 'setOffset',
    value: function setOffset(position) {
      var el = this.el();
      el.style.left = position + '%';
      el.style.position = 'absolute';
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {}
  }]);
  return Marker;
}(Component);

Marker.prototype.controlText_ = 'Play Video';

_videojs2.default.registerComponent('Marker', Marker);
exports.default = Marker;
module.exports = exports['default'];