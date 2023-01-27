"use strict";

const m = require("mithril");
const menu = require("./menu.js");

let layout = {
    view: function (vnode) {
        return [
            m("nav.top-nav", "Spark"),
            m("main.container#container", vnode.children),
            m(
                "nav.bottom-nav#navigation",
                m(menu, {
                    selected: vnode.attrs.selected,
                })
            ),
        ];
    },
};

module.exports = layout;
