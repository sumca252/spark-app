/**
 * Map/main page 
*/

"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


import { rentScooter } from "./rent_scooter.js";

let map_ ;

// available scooters positions
let scooterLoc;

// charging stations positions
let chargLoc;

// parkings places positions
let parkLoc;


function viewMap() {
    map_ = L.map('map').setView([59.307471, 18.082392], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_);
    
    viewScooters();
    viewCharging();
    viewParking();
}


function viewScooters() {
    let scooterIcon = L.icon({
        iconUrl: '../../img/scooter.png',
        iconSize: [30, 30],
    });

    for (let i = 0; i < scooterLoc.length; i++) {
        new L.marker([scooterLoc[i][1], scooterLoc[i][2]], {icon: scooterIcon})
        .bindPopup(scooterLoc[i][0])
        .addTo(map_);
    }
}


function viewCharging() {
    let chargingIcon = L.icon({
        iconUrl: '../../img/energy.png',
        iconSize: [30, 30],
    });

    for (let i = 0; i < chargLoc.length; i++) {
        new L.marker([chargLoc[i][1], chargLoc[i][2]], {icon: chargingIcon})
        .bindPopup(chargLoc[i][0])
        .addTo(map_);
    };
    
}


function viewParking() {
    let parkingIcon = L.icon({
        iconUrl: '../../img/parking.png',
        iconSize: [30, 30],
    });


    for (let i = 0; i < parkLoc.length; i++) {
        new L.marker([parkLoc[i][1], parkLoc[i][2]], {icon: parkingIcon})
        .bindPopup(parkLoc[i][0])
        .addTo(map_);
    };
}


let map = {
    oninit: function() {
        // load/show/get scooters -> Models
        // load/show/get charging stations -> models
        // load/show/get parking places -> models
    },
    
    oncreate: viewMap,

    view: function () {
        // by clicking on the scooter marker, the "rentScooter view" will be displayed. 

        // fake data to test the map
        scooterLoc = [
            ["Scooter 1", 59.339397, 18.050925],
            ["Scooter 2", 59.339189, 18.032552],
            ["Scooter 3", 59.351887, 18.031327]
        ];

        chargLoc = [
            ["ladd station 1", 59.351656, 18.018962],
            ["ladd station 2", 59.310421, 18.093269],
        ];

        parkLoc = [
            ["Parkeringsplats 1", 59.340415, 18.122665],
            ["Parkeringsplats 2", 59.319285, 18.057685],
        ];

        return m("div#map", "");
    },
}


export { map };
