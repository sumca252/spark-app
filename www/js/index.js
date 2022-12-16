/**
 * Contains all routes 
 */

"use strict";

import m from "mithril";

// Navigation
import { layout } from "./views/layout.js";

// view pages
import { map } from "./views/map.js";
import { history } from "./views/history.js";
import { login } from "./views/login.js";
import { payment } from "./views/payment.js";
import { register } from "./views/register.js";
import { settings } from "./views/settings.js";


document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {

    m.route(document.body, "/", {
        "/": {
            render: function() {
                return m(layout, {
                    nav: "#!/"
                }, m(map));
            }
        },

 
        "/payment": {
            render: function() {
                return m(layout, {
                    nav: "#!/payment"
                }, m(payment));
            }
        },

        "/history": {
            render: function() {
                return m(layout, {
                    nav: "#!/history"
                }, m(history));
            }
        },

        "/settings": {
            render: function() {
                return m(layout, {
                    nav: "#!/settings"
                }, m(settings));
            }
        },


        "/register": {
            render: function() {
                return m(layout, {
                    nav: "#!/register"
                }, m(register));
            }
        },

        "/login": {
            render: function() {
                return m(layout, {
                    nav: "#!/login"
                }, m(login));
            }
        }
    });
}
