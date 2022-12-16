/**
 * Renting scooter view, the customer can rent a specific scooter and return it.
 * Information about the scooter can also be displayed for the user.
 */

"use strict";

import m from "mithril";

let rentScooter = {
    oninit: function() {
        // load scooters -> Models
        // load users -> Models
    },

    view: function () {
        // view scooter information,
        // Show "Rent" button if the user has not rented a scooter yet,
        // otherwise replace rent with "leave".
        return m("h2", "Scooter 120");
    },

}


export { rentScooter };