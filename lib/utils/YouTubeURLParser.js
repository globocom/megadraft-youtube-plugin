"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.YouTubeURLException = YouTubeURLException;

var _validUrl = require("valid-url");

var _validUrl2 = _interopRequireDefault(_validUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function YouTubeURLException(message) {
  this.message = message;
  this.name = "YouTubeURLException";
}

function getVQueryVideoID(url) {
  return url.searchParams.get("v");
}

function getLastPathParamVideoID(url) {
  return url.pathname.split("/").pop();
}

var videoIDGetters = {
  web: getVQueryVideoID,
  embed: getLastPathParamVideoID,
  shortener: getLastPathParamVideoID
};

var YouTubeURLParser = function () {
  function YouTubeURLParser(url) {
    _classCallCheck(this, YouTubeURLParser);

    this.url = this.validate(url);
  }

  _createClass(YouTubeURLParser, [{
    key: "getVideoID",
    value: function getVideoID() {
      var getter = videoIDGetters[this.getUrlType()];
      return getter(this.url);
    }
  }, {
    key: "validate",
    value: function validate(url) {
      var urlObj = void 0;

      if (!_validUrl2.default.isUri(url)) {
        throw new YouTubeURLException("Invalid URL.");
      } else {
        urlObj = new URL(url);
        var urlType = this.getUrlType(urlObj);

        if (!urlType) {
          throw new YouTubeURLException("Invalid YouTube URL.");
        }
      }
      return urlObj;
    }
  }, {
    key: "getUrlType",
    value: function getUrlType(url) {
      if (!this._urlType) {
        if (url.href.includes("youtube.com/watch")) {
          this._urlType = "web";
        } else if (url.href.includes("youtube.com/embed")) {
          this._urlType = "embed";
        } else if (url.href.includes("youtu.be")) {
          this._urlType = "shortener";
        }
      }

      return this._urlType;
    }
  }]);

  return YouTubeURLParser;
}();

exports.default = YouTubeURLParser;