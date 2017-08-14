/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import { MegadraftIcons } from "megadraft";

import Block from "../src/Block";

let expect = chai.expect;

describe("Block", function () {
  beforeEach(function () {
    this.data = {
      url: "https://www.youtube.com/embed/m_3CM04TM2g"
    };

    this.remove = sinon.spy();
    this.plugin = sinon.spy();

    this.block = TestUtils.renderIntoDocument(
      <Block container={this} blockProps={this} data={this.data} />
    );

    this.inputElement = TestUtils.scryRenderedDOMComponentsWithTag(this.block, "input")[0];
    this.buttonElement = TestUtils.scryRenderedDOMComponentsWithTag(this.block, "button")[0];
  });

  it("should have a delete action", function () {
    expect(this.block.actions).to.have.lengthOf(1);
    expect(this.block.actions).to.deep.equal([{
      "key": "delete",
      "icon": MegadraftIcons.DeleteIcon,
      "action": this.block.props.container.remove
    }]);
  });

  it("should load data from props", function () {
    expect(this.inputElement.value).to.be.equal(this.data.url);
  });

  it("should have a button with a \"Load\" label", function () {
    expect(this.buttonElement.textContent).to.be.equal("Load");
  });
});
