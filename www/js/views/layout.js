"use strict";

import m from "mithril";
import { menu } from "./menu";

let layout = {
    view: function (vnode) {
        return [
            m("nav.top-nav", "Spark"),
            m("main.container#container", vnode.children),
            m(
                "nav.bottom-nav#navigation",
                m(menu, { selected: vnode.attrs.selected })
            ),
        ];
    },
};

export { layout };
