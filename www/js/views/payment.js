/**
 * Payment view, the customer can see his payments.
 */

"use strict";

import m from "mithril";

let payment = {
    oninit: function() {
        // load/get user's payments -> Models
    },

    view: function () {
        // show user's payments
        return m("h3", "Betalning");
    },

}


export { payment };