/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

/* global __ */

import React from "react";
import { MegadraftPlugin, MegadraftIcons, MegadraftMediaMessage } from "megadraft";
import debounce from "debounce";

import YouTube from "./YouTube";
import YouTubeURLParser, { YouTubeURLException } from "./utils/YouTubeURLParser";

const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;

export default class Block extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeInput = ::this.onChangeInput;
    this.loadMedia = debounce(
      ::this.loadMedia,
      800
    );
    this.actions = [{
      key: "delete",
      icon: MegadraftIcons.DeleteIcon,
      action: this.props.container.remove
    }];

    this.state = this.buildInitialState(props.data.videoID,props.blockProps.getReadOnly());
  }

  buildInitialState(videoID,readOnly) {
    return {
      videoID,
      url: (videoID) ? `https://www.youtube-nocookie.com/embed/${videoID}` : "",
      errors: [],
      unexpectedErrors: [],
      readOnly: readOnly
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url && prevState.url !== this.state.url) {
      this.loadMedia();
    }
  }

  onChangeInput(e) {
    this.setState({
      url: e.target.value,
      errors: [],
      unexpectedErrors: []
    });
  }

  validate(url) {
    let videoID;
    const errors = [],
      unexpectedErrors = [];

    try {
      let urlParser = new YouTubeURLParser(url);
      videoID = urlParser.getVideoID();
    } catch (err) {
      console.error(err);

      if (err instanceof YouTubeURLException) {
        errors.push(err.message);
      } else {
        unexpectedErrors.push(err.message);
      }
    }
    return [videoID, errors, unexpectedErrors];
  }

  loadMedia() {
    const url = this.state.url;
    const [videoID, errors, unexpectedErrors] = this.validate(url);

    this.setState({
      videoID,
      errors,
      unexpectedErrors
    });

    this.props.container.updateData({
      videoID
    });
  }

  renderContent() {
    let content = <pre>{__("PREVIEW")}</pre>;

    if (this.state.errors.length > 0) {
      content = <pre>{this.state.errors[0].toUpperCase()}</pre>;
    } else if (this.state.unexpectedErrors.length > 0) {
      content = [
        <MegadraftMediaMessage
          type="error"
          text={this.state.unexpectedErrors[0]}
        />,
        content
      ];
    } else if (this.state.videoID) {
      content = <YouTube videoID={this.state.videoID} />;
    }
    return content;
  }

  render() {
    return (
      <CommonBlock {...this.props} actions={(!this.state.readOnly && this.actions)||[]}>
        <BlockContent>
          { this.renderContent() }
        </BlockContent>

        {!this.state.readOnly && <BlockData>
          <BlockInput
            placeholder={__("Enter a YouTube URL")}
            value={(this.state.url) ? this.state.url : ""}
            onChange={this.onChangeInput} />
        </BlockData>}
        {this.state.readOnly && <BlockData>
          <div className="megadraft-youtube-text">{(this.state.url) ? this.state.url : ""}</div>
        </BlockData>}
      </CommonBlock>
    );
  }
}
