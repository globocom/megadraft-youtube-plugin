/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class ErrorList extends Component {
  static defaultProps = {
    errors: []
  };

  render(){
    if (!this.props.errors.length) {
      return null;
    }
    return (
      <ul className="bs-error-list">
        {this.props.errors.map((error, index) => {
          return (
            <li key={index}>{error}</li>
          );
        })}
      </ul>
    );
  }
}
