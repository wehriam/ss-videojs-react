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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _markerBar = require('./markerBar');

var _markerBar2 = _interopRequireDefault(_markerBar);

var _marker = require('./marker');

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  ReactVideoJsComponent: {
    displayName: 'ReactVideoJsComponent'
  }
};

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/video.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformCatchErrors2(Component, id);
  };
}

var _forEach = _lodash2.default.forEach;
var _debounce = _lodash2.default.debounce;
var _defaults = _lodash2.default.defaults;

var DEFAULT_HEIGHT = 540;
var DEFAULT_WIDTH = 960;
var DEFAULT_ASPECT_RATIO = 9 / 16;
var DEFAULT_ADJUSTED_SIZE = 0;
var DEFAULT_RESIZE_DEBOUNCE_TIME = 500;
var DEFAULT_VIDEO_OPTIONS = {
  preload: 'auto',
  autoplay: true,
  controls: true
};

function noop() {}

var ReactVideoJsComponent = _wrapComponent('ReactVideoJsComponent')(function (_React$Component) {
  (0, _inherits3.default)(ReactVideoJsComponent, _React$Component);

  function ReactVideoJsComponent() {
    (0, _classCallCheck3.default)(this, ReactVideoJsComponent);

    //initial state

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReactVideoJsComponent).call(this));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(ReactVideoJsComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mountVideoPlayer();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isEndless = this.props.endlessMode;
      var willBeEndless = nextProps.endlessMode;

      if (isEndless !== willBeEndless) {
        if (willBeEndless) {
          this.addEndlessMode();
        } else {
          this.removeEndlessMode();
        }
      }

      var isResizable = this.props.resize;
      var willBeResizeable = nextProps.resize;

      if (isResizable !== willBeResizeable) {
        if (willBeResizeable) {
          this.addResizeEventListener();
        } else {
          this.removeResizeEventListener();
        }
      }

      var currentSrc = this.props.src;
      var newSrc = nextProps.src;

      if (currentSrc !== newSrc) {
        this.setVideoPlayerSrc(newSrc);
      } else if (isEndless === willBeEndless) {
        this.restartVideo();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmountVideoPlayer();
    }
  }, {
    key: 'drawMarker',
    value: function drawMarker(markerOptions) {
      if (!this._markerBar) {
        this._markerBar = this._player.controlBar.progressControl.addChild(new _markerBar2.default());
      }

      var marker = new _marker2.default(this._player, markerOptions);
      this._markerBar.addChild(marker);
    }
  }, {
    key: 'getVideoPlayer',
    value: function getVideoPlayer() {
      return this._player;
    }
  }, {
    key: 'getVideoPlayerEl',
    value: function getVideoPlayerEl() {
      return _reactDom2.default.findDOMNode(this.refs.videoPlayer);
    }
  }, {
    key: 'getVideoPlayerOptions',
    value: function getVideoPlayerOptions() {
      return _defaults({}, this.props.options, {
        height: this.props.resize ? 'auto' : this.props.height || DEFAULT_HEIGHT,
        width: this.props.resize ? 'auto' : this.props.width || DEFAULT_WIDTH
      }, DEFAULT_VIDEO_OPTIONS);
    }
  }, {
    key: 'getVideoResizeOptions',
    value: function getVideoResizeOptions() {
      return _defaults({}, this.props.resizeOptions, {
        aspectRatio: DEFAULT_ASPECT_RATIO,
        shortWindowVideoHeightAdjustment: DEFAULT_ADJUSTED_SIZE,
        defaultVideoWidthAdjustment: DEFAULT_ADJUSTED_SIZE,
        debounceTime: DEFAULT_RESIZE_DEBOUNCE_TIME
      });
    }
  }, {
    key: 'getResizedVideoPlayerMeasurements',
    value: function getResizedVideoPlayerMeasurements() {
      var resizeOptions = this.getVideoResizeOptions();
      var aspectRatio = resizeOptions.aspectRatio;
      var defaultVideoWidthAdjustment = resizeOptions.defaultVideoWidthAdjustment;

      var winHeight = this._windowHeight();

      var baseWidth = this._videoElementWidth();

      var vidWidth = baseWidth - defaultVideoWidthAdjustment;
      var vidHeight = vidWidth * aspectRatio;

      if (winHeight < vidHeight) {
        var shortWindowVideoHeightAdjustment = resizeOptions.shortWindowVideoHeightAdjustment;
        vidHeight = winHeight - shortWindowVideoHeightAdjustment;
      }

      return {
        width: vidWidth,
        height: vidHeight
      };
    }
  }, {
    key: 'setVideoPlayerSrc',
    value: function setVideoPlayerSrc(src) {
      this._player.src(src);
    }
  }, {
    key: 'mountVideoPlayer',
    value: function mountVideoPlayer() {
      var src = this.props.src;
      var options = this.getVideoPlayerOptions();

      var playerEl = this.getVideoPlayerEl();
      playerEl.removeAttribute('data-reactid');

      this._player = (0, _video2.default)(playerEl, options);

      var player = this._player;

      _forEach(this.props.markers, this.drawMarker.bind(this));

      player.ready(this.handleVideoPlayerReady.bind(this));

      _forEach(this.props.eventListeners, function (val, key) {
        player.on(key, val);
      });

      player.src(src);

      if (this.props.endlessMode) {
        this.addEndlessMode();
      }
    }
  }, {
    key: 'unmountVideoPlayer',
    value: function unmountVideoPlayer() {
      this.removeResizeEventListener();
      this._player.dispose();
    }
  }, {
    key: 'addEndlessMode',
    value: function addEndlessMode() {
      var player = this._player;

      player.on('ended', this.handleNextVideo);

      if (player.ended()) {
        this.handleNextVideo();
      }
    }
  }, {
    key: 'addResizeEventListener',
    value: function addResizeEventListener() {
      var debounceTime = this.getVideoResizeOptions().debounceTime;

      this._handleVideoPlayerResize = _debounce(this.handleVideoPlayerResize, debounceTime);
      window.addEventListener('resize', this._handleVideoPlayerResize);
    }
  }, {
    key: 'removeEndlessMode',
    value: function removeEndlessMode() {
      var player = this._player;

      player.off('ended', this.handleNextVideo);
    }
  }, {
    key: 'removeResizeEventListener',
    value: function removeResizeEventListener() {
      window.removeEventListener('resize', this._handleVideoPlayerResize);
    }
  }, {
    key: 'pauseVideo',
    value: function pauseVideo() {
      this._player.pause();
    }
  }, {
    key: 'playVideo',
    value: function playVideo() {
      this._player.play();
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(time) {
      this._player.currentTime(time);
    }
  }, {
    key: 'restartVideo',
    value: function restartVideo() {
      this._player.currentTime(0).play();
    }
  }, {
    key: 'togglePauseVideo',
    value: function togglePauseVideo() {
      if (this._player.paused()) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
    }
  }, {
    key: 'handleVideoPlayerReady',
    value: function handleVideoPlayerReady() {

      if (this.props.resize) {
        this.handleVideoPlayerResize();
        this.addResizeEventListener();
      }

      if (this.props.startWithControlBar) {
        this._player.bigPlayButton.hide();
        this._player.controlBar.show();
        this._player.userActive(true);
        this._player.play();
        this._player.pause();
      }

      this.props.onReady();
    }
  }, {
    key: 'handleVideoPlayerResize',
    value: function handleVideoPlayerResize() {
      var player = this._player;
      var videoMeasurements = this.getResizedVideoPlayerMeasurements();

      player.dimensions(videoMeasurements.width, videoMeasurements.height);
    }
  }, {
    key: 'handleNextVideo',
    value: function handleNextVideo() {
      this.props.onNextVideo();
    }
  }, {
    key: 'renderDefaultWarning',
    value: function renderDefaultWarning() {
      return _react3.default.createElement(
        'p',
        null,
        'test'
      );
    }
  }, {
    key: '_windowHeight',
    value: function _windowHeight() {
      return window.innerHeight;
    }
  }, {
    key: '_videoElementWidth',
    value: function _videoElementWidth() {
      return this.getVideoPlayerEl().parentElement.parentElement.offsetWidth;
    }
  }, {
    key: 'render',
    value: function render() {
      var videoPlayerClasses = (0, _classnames2.default)({
        'video-js': true,
        'vjs-default-skin': this.props.vjsDefaultSkin,
        'vjs-big-play-centered': this.props.vjsBigPlayCentered
      });

      return _react3.default.createElement(
        'video',
        { ref: 'videoPlayer', className: videoPlayerClasses },
        this.props.children || this.renderDefaultWarning()
      );
    }
  }]);
  return ReactVideoJsComponent;
}(_react3.default.Component));

exports.default = ReactVideoJsComponent;


ReactVideoJsComponent.propTypes = {
  src: _react3.default.PropTypes.string.isRequired,
  height: _react3.default.PropTypes.number,
  width: _react3.default.PropTypes.number,
  endlessMode: _react3.default.PropTypes.bool,
  options: _react3.default.PropTypes.object,
  onReady: _react3.default.PropTypes.func,
  eventListeners: _react3.default.PropTypes.object,
  resize: _react3.default.PropTypes.bool,
  resizeOptions: _react3.default.PropTypes.shape({
    aspectRatio: _react3.default.PropTypes.number,
    shortWindowVideoHeightAdjustment: _react3.default.PropTypes.number,
    defaultVideoWidthAdjustment: _react3.default.PropTypes.number,
    debounceTime: _react3.default.PropTypes.number
  }),
  vjsDefaultSkin: _react3.default.PropTypes.bool,
  vjsBigPlayCentered: _react3.default.PropTypes.bool,
  startWithControlBar: _react3.default.PropTypes.bool,
  markers: _react3.default.PropTypes.arrayOf(_react3.default.PropTypes.object),
  children: _react3.default.PropTypes.element,
  dispose: _react3.default.PropTypes.bool,
  onNextVideo: _react3.default.PropTypes.func
};

ReactVideoJsComponent.defaultProps = {
  endlessMode: false,
  options: DEFAULT_VIDEO_OPTIONS,
  onReady: noop,
  eventListeners: {},
  resize: false,
  resizeOptions: {},
  vjsDefaultSkin: true,
  vjsBigPlayCentered: true,
  startWithControlBar: false,
  markers: [],
  onNextVideo: noop
};

ReactVideoJsComponent.displayName = ReactVideoJsComponent.constructor.name;
module.exports = exports['default'];