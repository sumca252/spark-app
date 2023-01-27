/* eslint-disable no-undef */

"use strict";

let mq = require("mithril-query");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;


// view
const login = require("../www/js/views/login");

// models
const auth = require("../www/js/models/auth");

chai.should();

describe("Test login view", () => {
    describe("Render the elements", () => {
        it("should render a header and a login form", () => {
            const output  = mq(login);

            output.should.have("h1.title");
            output.should.contain("Login");
            output.should.have("form.form");
        });


        it("should navigate to register page on click", () => {
            const output = mq(login);

            output.should.have("a.button");
            output.should.contain("Register");
            output.click('a.button');

            expect(output.has('a.button[href="#!/register"]')).to.be.true;
        });
    });


    describe("Test login", () => {
        let loginMock;

        beforeEach(() => {
            loginMock = sinon.stub(auth, 'login');
        });

        afterEach(() => {
            loginMock.restore();
        });


        it("should login user", () => {
            const output = mq(login);

            output.setValue("input[type='email']", "test@example.com");
            output.setValue("input[type='password']", "password");
            output.trigger('form', 'submit');

            expect(loginMock.calledOnce).to.be.true;
            expect(auth.email).to.equal("test@example.com");
            expect(auth.password).to.equal("password");
        });
    });
});
