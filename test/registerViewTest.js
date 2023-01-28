/* eslint-disable no-undef */

"use strict";

const mq = require("mithril-query");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;


// view
const register = require("../www/js/views/register");

// models
const auth = require("../www/js/models/auth");


chai.should();

describe("Test register view", () => {
    let registerMock;

    beforeEach(() => {
        registerMock = sinon.stub(auth, "register").returns();
    });

    afterEach(() => {
        auth.register.restore();
    });


    it("should render a header and a register form", () => {
        const output  = mq(register);

        output.should.have("h1.title");
        output.should.contain("Register");
        output.should.have("form.form");

        assert.isFalse(registerMock.calledOnce);
    });


    it("should register new customer", () => {
        const output = mq(register);

        // set values on the inputs
        output.setValue("input[name='username']", "username");
        output.setValue("input[name='firstname']", "firstname");
        output.setValue("input[name='lastname']", "lastname");
        output.setValue("input[name='email']", "email@example.com");
        output.setValue("input[name='phone']", "0700000000");
        output.setValue("input[name='password']", "password");

        output.trigger('form.form', 'submit');

        assert.isTrue(registerMock.calledOnce);

        expect(auth.firstName).to.equal("firstname");
        expect(auth.lastName).to.equal("lastname");
        expect(auth.username).to.equal("username");
        expect(auth.email).to.equal("email@example.com");
        expect(auth.password).to.equal("password");
        expect(auth.phone).to.equal("0700000000");
    });
});
