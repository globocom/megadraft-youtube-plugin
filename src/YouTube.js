/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

export default class YouTube extends Component {
  render() {
    if (!this.props.url) {
      return null;
    }

    return (
      <div className="megadraft-youtube">
        <iframe
          width="560"
          height="315"
          src={this.props.url}
          frameBorder="0"
          allowFullScreen>
        </iframe>
      </div>
    );
  }
}
