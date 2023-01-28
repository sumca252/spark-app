/* eslint-disable no-undef */

"use strict";


const mq = require("mithril-query");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

// view
const menu = require("../www/js/views/menu");

// models
const auth = require("../www/js/models/auth");


chai.should();

describe("Test menu view", () => {
    beforeEach(() => {
        auth.isLoggedIn = false;
    });


    it("should have active class when navigating to login page", () => {
        const output  = mq(menu, { selected: "login" });

        output.should.have("a > i");
        output.should.contain("login");
        output.should.have("span");
        output.should.contain("Login");

        expect(output.has("a.active")).to.be.true;
        output.find("a.active").should.have.length(1);
    });


    it("should have active class when navigating to home page", () => {
        const output  = mq(menu, { selected: "home" });

        output.should.have("a > i");
        output.should.contain("home");
        output.should.have("span");
        output.should.contain("Home");

        expect(output.has("a.active")).to.be.true;
        output.find("a.active").should.have.length(1);
    });


    it("should have active class when navigating to logout page", () => {
        auth.isLoggedIn = true;

        const output  = mq(menu, { selected: "logout" });

        output.should.have("a > i");
        output.should.contain("logout");
        output.should.have("span");
        output.should.contain("Logout");

        expect(output.has("a.active")).to.be.true;
        output.find("a.active").should.have.length(1);
    });


    it("should logout user if user is logged in", () => {
        auth.isLoggedIn = true;

        const logoutMock = sinon.stub(auth, "logout");
        const output  = mq(menu, { selected: "logout" });

        output.should.have("a");
        output.click('a.active');

        output.find("a.active").should.have.length(1);
        expect(logoutMock.calledOnce).to.be.true;

        //restore
        auth.logout.restore();
    });
});
