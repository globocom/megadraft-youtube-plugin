/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

/* global __ */

import React from "react";
import { MegadraftPlugin, MegadraftIcons } from "megadraft";

import YouTube from "./YouTube";
import Button from "./form/Button";
import ErrorList from "./form/ErrorList";
import YouTubeURLParser from "./utils/YouTubeURLParser";

const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;

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

    this.state = this.buildInitialState(props.data.videoID);
  }

  buildInitialState(videoID) {
    return {
      videoID,
      url: (videoID) ? `https://www.youtube.com/embed/${videoID}` : "",
      errors: []
    };
  }

  onChangeInput(e) {
    this.setState({
      url: e.target.value,
      errors: []
    });
  }

  validate(url) {
    let videoID;
    const errors = [];

    try {
      let urlParser = new YouTubeURLParser(url);
      videoID = urlParser.getVideoID();
    } catch (err) {
      errors.push(err.message);
      console.error(err);
    }
    return [videoID, errors];
  }

  loadMedia() {
    const url = this.state.url;
    const [videoID, errors] = this.validate(url);

    this.setState({
      videoID,
      errors
    });

    this.props.container.updateData({
      videoID
    });
  }

  renderContent() {
    let content;

    if (this.state.errors.length > 0) {
      content = <pre>- {__("INVALID YOUTUBE URL")} -</pre>;
    } else if (this.state.videoID) {
      content = <YouTube videoID={this.state.videoID} />;
    } else {
      content = <pre>- {__("PREVIEW")} -</pre>;
    }
    return content;
  }

  render() {
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          { this.renderContent() }
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder={__("Enter a YouTube URL")}
            value={(this.state.url) ? this.state.url : ""}
            onChange={this.onChangeInput} />
          <ErrorList errors={this.state.errors} />
        </BlockData>

        <BlockData>
          <Button label={__("Load")} onClick={this.loadMedia} />
        </BlockData>
      </CommonBlock>
    );
  }
}
