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

var _YouTube = require("./YouTube");

var _YouTube2 = _interopRequireDefault(_YouTube);

var _Button = require("./form/Button");

var _Button2 = _interopRequireDefault(_Button);

var _ErrorList = require("./form/ErrorList");

var _ErrorList2 = _interopRequireDefault(_ErrorList);

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
    _this.loadMedia = _this.loadMedia.bind(_this);

    _this.actions = [{
      key: "delete",
      icon: _megadraft.MegadraftIcons.DeleteIcon,
      action: _this.props.container.remove
    }];

    _this.state = _this.getInitialState(props.data.videoID);
    return _this;
  }

  _createClass(Block, [{
    key: "getInitialState",
    value: function getInitialState(videoID) {
      return {
        videoID: videoID,
        url: videoID ? "https://www.youtube.com/embed/" + videoID : "",
        errors: []
      };
    }
  }, {
    key: "onChangeInput",
    value: function onChangeInput(e) {
      this.setState({
        url: e.target.value,
        errors: []
      });
    }
  }, {
    key: "validate",
    value: function validate(url) {
      var videoID = void 0;
      var errors = [];

      try {
        var urlParser = new _YouTubeURLParser2.default(url);
        videoID = urlParser.getVideoID();
      } catch (err) {
        errors.push(err.message);
        console.error(err);
      }
      return [videoID, errors];
    }
  }, {
    key: "loadMedia",
    value: function loadMedia() {
      var url = this.state.url;

      var _validate = this.validate(url),
          _validate2 = _slicedToArray(_validate, 2),
          videoID = _validate2[0],
          errors = _validate2[1];

      this.setState({
        videoID: videoID,
        errors: errors
      });

      this.props.container.updateData({
        videoID: videoID
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        CommonBlock,
        _extends({}, this.props, { actions: this.actions }),
        _react2.default.createElement(
          BlockContent,
          null,
          this.state.videoID ? _react2.default.createElement(_YouTube2.default, { videoID: this.state.videoID }) : _react2.default.createElement(
            "pre",
            null,
            "- PREVIEW -"
          )
        ),
        _react2.default.createElement(
          BlockData,
          null,
          _react2.default.createElement(BlockInput, {
            placeholder: "Enter a YouTube URL",
            value: this.state.url ? this.state.url : "",
            onChange: this.onChangeInput }),
          _react2.default.createElement(_ErrorList2.default, { errors: this.state.errors })
        ),
        _react2.default.createElement(
          BlockData,
          null,
          _react2.default.createElement(_Button2.default, { label: "Load", onClick: this.loadMedia })
        )
      );
    }
  }]);

  return Block;
}(_react2.default.Component);

exports.default = Block;