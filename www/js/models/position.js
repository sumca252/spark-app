/**
 * Position model
 * for getting the current position of the user
 */
"use strict";

import m from "mithril";

const position = {
    currentPosition: {},

    getPosition: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position.onSuccess,
                position.onError
            );
        }
    },
    onSuccess: (pos) => {
        position.currentPosition = pos.coords;
        m.redraw();
    },
    onError: (error) => {
        console.log({
            code: error.code,
            message: error.message,
        });
    },
};

export default position;
