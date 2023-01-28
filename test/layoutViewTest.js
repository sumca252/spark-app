/* eslint-disable no-undef */

"use strict";

const mq = require("mithril-query");
const chai = require("chai");

// view
const layout = require("../www/js/views/layout");

chai.should();

describe("Test layout view", () => {
    it("should render header and main container", () => {
        const output  = mq(layout, { selected: "login" });

        output.should.have("nav.top-nav");
        output.should.contain("Spark");

        output.should.have("main.container");
    });

    it("should render nav with links", () => {
        const output  = mq(layout, { selected: "login" });

        output.should.have("nav.bottom-nav");
        output.find("a").should.have.length(2);
    });
});
