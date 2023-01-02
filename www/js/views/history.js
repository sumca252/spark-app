/**
 * History view, the customer can see a history of the trips he made.
 */

"use strict";

import m from "mithril";

let history = {
    oninit: function() {
        // load user's history -> Models
    },

    view: function () {
        // show user's history
        return m("h3", "Historik över resorna");
    },

}


export { history };