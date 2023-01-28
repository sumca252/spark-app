/**
 * Contains navigation
 */

"use strict";

const m = require("mithril");
const auth = require("../models/auth.js");


let menu = {
    view: (vnode) => {
        let login = {
            name: "Login",
            class: "login",
            nav: () => {
                m.route.set("/login");
            },
        };

        /*
        let register = {
            name: "Register",
            class: "register",
            nav: () => {
                m.route.set("/register");
            },
        };*/

        let logout = {
            name: "Logout",
            class: "logout",
            nav: () => {
                auth.logout();
            },
        };

        let navElements = [
            {
                name: "Home",
                class: "home",
                nav: () => {
                    m.route.set("/");
                },
            },
            auth.isLoggedIn ? logout : login,
        ];

        return navElements.map((element) => {
            return m(
                "a",
                {
                    class:
                        vnode.attrs.selected === element.class ? "active" : "",
                    onclick: element.nav,
                },
                [
                    m("i", { class: "material-icons" }, element.class),
                    m("span", { class: "icon-text" }, element.name),
                ]
            );
        });
    },
};

module.exports = menu;
