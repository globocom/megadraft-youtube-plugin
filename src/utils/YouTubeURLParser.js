/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import validUrl from "valid-url";

export function YouTubeURLException(message) {
  this.message = message;
  this.name = "YouTubeURLException";
}

function getVQueryVideoID(url) {
  return url.searchParams.get("v");
}

function getLastPathParamVideoID (url) {
  return url.pathname.split("/").pop();
}

const videoIDGetters = {
  web: getVQueryVideoID,
  embed: getLastPathParamVideoID,
  shortener: getLastPathParamVideoID
};

export default class YouTubeURLParser {
  constructor(url) {
    this.url = this.validate(url);
  }

  getVideoID() {
    const getter = videoIDGetters[this.getUrlType()];
    return getter(this.url);
  }

  validate(url) {
    let urlObj;

    if (!validUrl.isUri(url)) {
      throw new YouTubeURLException("Invalid URL.");
    } else {
      urlObj = new URL(url);
      let urlType = this.getUrlType(urlObj);

      if (!urlType) {
        throw new YouTubeURLException("Invalid YouTube URL.");
      }
    }
    return urlObj;
  }

  getUrlType(url) {
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
}
