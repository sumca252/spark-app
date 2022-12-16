/**
 * Map/main page 
*/

"use strict";

import m from "mithril";

import { rentScooter } from "./rent_scooter.js";


let map = {
    oninit: function() {
        // load/show/get scooters on the map -> Models
        // load/show/get charging stations on the map -> models
        // load/show/get parking places on the map -> models
    },

    view: function () {
        // show the map
        // update the map every 5 seconds to see the changes

        // by clicking on the scooter marker, the "rentScooter view" will be displayed. 
    },
}


export { map };
