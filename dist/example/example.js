'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _video = require('../video.jsx');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markers = [{ seconds: 0, duration: 32 }, { seconds: 9.2, duration: 32 }, { seconds: 13.5, duration: 32 }, { seconds: 25.5, duration: 32 }, { seconds: 32, duration: 32 }];

_reactDom2.default.render(_react2.default.createElement(_video2.default, { src: './big-buck-bunny_trailer.webm', markers: markers, startWithControlBar: true }), document.getElementById('component-container'));