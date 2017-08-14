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
    this.url = "https://www.youtube.com/embed/m_3CM04TM2g";
    this.component = TestUtils.renderIntoDocument(
      <YouTube url={this.url} />
    );
  });

  it("should render nothing when no URL", function () {
    const component = TestUtils.renderIntoDocument(
      <YouTube />
    );
    expect(component.textContent).to.be.empty;
    expect(component.children).to.be.empty;
  });
});
