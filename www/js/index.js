/**
 * Contains all routes
 */

"use strict";


const m = require("mithril");

// models
const auth = require("./models/auth");

// Navigation
const layout = require("./views/layout.js");
const login = require("./views/login.js");

// view pages
const register = require("./views/register.js");

//const overview = require("./views/overview.js");
import { overview } from "./views/overview.js";


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    m.route(document.body, "/", {
        "/": {
            render: () => {
                return m(
                    layout,
                    {
                        selected: "home",
                    },
                    m(overview)
                );
            },
        },
        "/login": {
            render: () => {
                return m(
                    layout,
                    {
                        selected: "login",
                    },
                    m(login)
                );
            },
        },
        "/register": {
            render: () => {
                return m(
                    layout,
                    {
                        selected: "login",
                    },
                    m(register)
                );
            },
        },
        "/logout": {
            render: () => {
                auth.token = "";
                return m(layout, { selected: "login" }, m(login));
            },
        },
    });
}
