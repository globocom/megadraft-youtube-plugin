/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import validUrl from "valid-url";

import YouTube from "./YouTube";
import Button from "./form/Button";
import ErrorList from "./form/ErrorList";

const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;

const YOUTUBE_REGEX_VALIDATOR = /^https?:\/\/www\.youtube\.com\/embed\/\w+/;

export default class Block extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeInput = ::this.onChangeInput;
    this.loadMedia = ::this.loadMedia;

    this.actions = [{
      key: "delete",
      icon: MegadraftIcons.DeleteIcon,
      action: this.props.container.remove
    }];

    this.state = this.getInitialState(props.data.url);
  }

  getInitialState(url="") {
    return {
      url,
      input: url,
      errors: []
    };
  }

  onChangeInput(e) {
    this.setState({
      url: this.state.url,
      input: e.target.value,
      errors: []
    });
  }

  validate(url) {
    const errors = [];
    if (!validUrl.isUri(url)) {
      errors.push("Invalid URL");
    } else if (!YOUTUBE_REGEX_VALIDATOR.exec(url)) {
      errors.push("Invalid YouTube URL");
    }
    return errors;
  }

  loadMedia() {
    const url = this.state.input;
    const errors = this.validate(url);

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

  render() {
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <YouTube url={this.state.url} />
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Enter a YouTube URL"
            value={(this.state.input) ? this.state.input : ""}
            onChange={this.onChangeInput} />
          <ErrorList errors={this.state.errors} />
        </BlockData>

        <BlockData>
          <Button label="Load" onClick={this.loadMedia} />
        </BlockData>
      </CommonBlock>
    );
  }
}
