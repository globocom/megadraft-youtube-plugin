/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import YouTube from "../src/YouTube";

let expect = chai.expect;

describe("YouTube", function () {
  beforeEach(function () {
    this.videoID = "m_3CM04TM2g";
    this.component = TestUtils.renderIntoDocument(
      <YouTube videoID={this.videoID} />
    );
  });

  it("should render nothing when no VideoID", function () {
    const component = TestUtils.renderIntoDocument(
      <YouTube />
    );
    expect(component.textContent).to.be.empty;
    expect(component.children).to.be.empty;
  });
});
