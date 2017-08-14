"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _megadraft = require("megadraft");

var _validUrl = require("valid-url");

var _validUrl2 = _interopRequireDefault(_validUrl);

var _YouTube = require("./YouTube");

var _YouTube2 = _interopRequireDefault(_YouTube);

var _Button = require("./form/Button");

var _Button2 = _interopRequireDefault(_Button);

var _ErrorList = require("./form/ErrorList");

var _ErrorList2 = _interopRequireDefault(_ErrorList);

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


var YOUTUBE_REGEX_VALIDATOR = /^https?:\/\/www\.youtube\.com\/embed\/\w+/;

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

    _this.state = _this.getInitialState(props.data.url);
    return _this;
  }

  _createClass(Block, [{
    key: "getInitialState",
    value: function getInitialState() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      return {
        url: url,
        input: url,
        errors: []
      };
    }
  }, {
    key: "onChangeInput",
    value: function onChangeInput(e) {
      this.setState({
        url: this.state.url,
        input: e.target.value,
        errors: []
      });
    }
  }, {
    key: "validate",
    value: function validate(url) {
      var errors = [];
      if (!_validUrl2.default.isUri(url)) {
        errors.push("Invalid URL");
      } else if (!YOUTUBE_REGEX_VALIDATOR.exec(url)) {
        errors.push("Invalid YouTube URL");
      }
      return errors;
    }
  }, {
    key: "loadMedia",
    value: function loadMedia() {
      var url = this.state.input;
      var errors = this.validate(url);

      if (errors && errors.length) {
        this.setState({
          url: "",
          input: this.state.input,
          errors: errors
        });
        return;
      }

      this.setState({
        url: url,
        input: url,
        errors: []
      });
      this.props.container.updateData({
        url: url
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
          _react2.default.createElement(_YouTube2.default, { url: this.state.url })
        ),
        _react2.default.createElement(
          BlockData,
          null,
          _react2.default.createElement(BlockInput, {
            placeholder: "Enter a YouTube URL",
            value: this.state.input ? this.state.input : "",
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