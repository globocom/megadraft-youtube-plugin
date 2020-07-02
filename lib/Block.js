"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _megadraft = require("megadraft");

var _debounce = require("debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _YouTube = require("./YouTube");

var _YouTube2 = _interopRequireDefault(_YouTube);

var _YouTubeURLParser = require("./utils/YouTubeURLParser");

var _YouTubeURLParser2 = _interopRequireDefault(_YouTubeURLParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* global __ */

var BlockContent = _megadraft.MegadraftPlugin.BlockContent,
    BlockData = _megadraft.MegadraftPlugin.BlockData,
    BlockInput = _megadraft.MegadraftPlugin.BlockInput,
    CommonBlock = _megadraft.MegadraftPlugin.CommonBlock;

var Block = function (_React$Component) {
  _inherits(Block, _React$Component);

  function Block(props) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

    _this.onChangeInput = _this.onChangeInput.bind(_this);
    _this.loadMedia = (0, _debounce2.default)(_this.loadMedia.bind(_this), 800);
    _this.actions = [{
      key: "delete",
      icon: _megadraft.MegadraftIcons.DeleteIcon,
      action: _this.props.container.remove
    }];

    _this.state = _this.buildInitialState(props.data.videoID, props.blockProps.getReadOnly());
    return _this;
  }

  _createClass(Block, [{
    key: "buildInitialState",
    value: function buildInitialState(videoID, readOnly) {
      return {
        videoID: videoID,
        url: videoID ? "https://www.youtube-nocookie.com/embed/" + videoID : "",
        errors: [],
        unexpectedErrors: [],
        readOnly: readOnly
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.url && prevState.url !== this.state.url) {
        this.loadMedia();
      }
    }
  }, {
    key: "onChangeInput",
    value: function onChangeInput(e) {
      this.setState({
        url: e.target.value,
        errors: [],
        unexpectedErrors: []
      });
    }
  }, {
    key: "validate",
    value: function validate(url) {
      var videoID = void 0;
      var errors = [],
          unexpectedErrors = [];

      try {
        var urlParser = new _YouTubeURLParser2.default(url);
        videoID = urlParser.getVideoID();
      } catch (err) {
        console.error(err);

        if (err instanceof _YouTubeURLParser.YouTubeURLException) {
          errors.push(err.message);
        } else {
          unexpectedErrors.push(err.message);
        }
      }
      return [videoID, errors, unexpectedErrors];
    }
  }, {
    key: "loadMedia",
    value: function loadMedia() {
      var url = this.state.url;

      var _validate = this.validate(url),
          _validate2 = _slicedToArray(_validate, 3),
          videoID = _validate2[0],
          errors = _validate2[1],
          unexpectedErrors = _validate2[2];

      this.setState({
        videoID: videoID,
        errors: errors,
        unexpectedErrors: unexpectedErrors
      });

      this.props.container.updateData({
        videoID: videoID
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var content = _react2.default.createElement(
        "pre",
        null,
        __("PREVIEW")
      );

      if (this.state.errors.length > 0) {
        content = _react2.default.createElement(
          "pre",
          null,
          this.state.errors[0].toUpperCase()
        );
      } else if (this.state.unexpectedErrors.length > 0) {
        content = [_react2.default.createElement(_megadraft.MegadraftMediaMessage, {
          type: "error",
          text: this.state.unexpectedErrors[0]
        }), content];
      } else if (this.state.videoID) {
        content = _react2.default.createElement(_YouTube2.default, { videoID: this.state.videoID });
      }
      return content;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        CommonBlock,
        _extends({}, this.props, { actions: !this.state.readOnly && this.actions || [] }),
        _react2.default.createElement(
          BlockContent,
          null,
          this.renderContent()
        ),
        !this.state.readOnly && _react2.default.createElement(
          BlockData,
          null,
          _react2.default.createElement(BlockInput, {
            placeholder: __("Enter a YouTube URL"),
            value: this.state.url ? this.state.url : "",
            onChange: this.onChangeInput })
        ),
        this.state.readOnly && _react2.default.createElement(
          BlockData,
          null,
          _react2.default.createElement(
            "div",
            { className: "megadraft-youtube-text" },
            this.state.url ? this.state.url : ""
          )
        )
      );
    }
  }]);

  return Block;
}(_react2.default.Component);

exports.default = Block;