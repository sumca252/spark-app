/**
 * Contains all routes
 */

"use strict";

import { history } from "./views/history.js";
// Navigation
import { layout } from "./views/layout.js";
import { login } from "./views/login.js";
import m from "mithril";
// view pages
import { overview } from "./views/overview.js";
import { register } from "./views/register.js";

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    m.route(document.body, "/", {
        "/": {
            render: () => {
                return m(
                    layout,
                    {
                        selected: "home",
                        requireAuth: true, // requires authentication
                    },
                    m(overview)
                );
            },
        },
        "/history": {
            render: () => {
                return m(
                    layout,
                    {
                        selected: "history",
                        requireAuth: true, // requires authentication
                    },
                    m(history)
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
                return m(layout, { selected: "login" }, m(home));
            },
        },
    });
}
