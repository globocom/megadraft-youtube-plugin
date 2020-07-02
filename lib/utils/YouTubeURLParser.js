"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.YouTubeURLException = YouTubeURLException;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

/* global __ */

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

      try {
        urlObj = new URL(url);
      } catch (err) {
        throw new YouTubeURLException(__("Invalid URL"));
      }

      var urlType = this.getUrlType(urlObj);
      if (!urlType) {
        throw new YouTubeURLException(__("Invalid YouTube URL"));
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