/**
 * Map/main page
 */

"use strict";

require("leaflet/dist/leaflet.css");

const m = require("mithril");
const L = require("leaflet");

const auth = require("../models/auth.js");

// icons
import locIcon from "../../img/loc.png";
import locationIcon from "../../img/location.png";
import parkingIcon from "../../img/parking.png";
import scooterIcon from "../../img/scooter.png";

const position = require("../models/position.js");
let scooters = require("../models/scooters.js");
let stations = require("../models/stations.js");


let map;
let updateView = false;
let startTime;

const locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
});

const scootersIcon = L.icon({
    iconUrl: scooterIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
});

const showMap = () => {
    map = L.map("map").setView([62.5, 15.5], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
};

const showPosition = () => {
    if (
        position.currentPosition.latitude &&
        position.currentPosition.longitude
    ) {
        L.marker(
            [
                position.currentPosition.latitude,
                position.currentPosition.longitude,
            ],
            {
                icon: locationMarker,
            }
        )
            .addTo(map)
            .bindTooltip("You are here");
    }
};

const showStations = (stations) => {
    stations.forEach((station) => {
        const markerIcon = L.icon({
            iconUrl: `../../img/${station.zone_type.replace(
                " Station",
                ""
            )}.png`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, 0],
        });

        L.marker([station.latitude, station.longitude], {
            icon: markerIcon,
        })
            .bindPopup(
                `
                <p class="station">
                    Station type: ${station.zone_type.replace("Station", "")}
                </p>`
            )
            .addTo(map);
    });
};

const showScooters = () => {
    scooters.scooter.forEach((scooter) => {
        if (scooter.status.status === "Available") {
            scootersIcon.options.iconUrl = scooterIcon;

            L.marker([scooter.latitude, scooter.longitude], {
                icon: scootersIcon,
                id: scooter.id,
            })
                .bindPopup(
                    `
                    <div class="scooter">

                        <p>Status: <span class="status">${scooter.status.status}</span></p>
                        <p>Battery: <span class="battery_charging_full">${scooter.battery}</span> %</p>
                        <p>Max speed: <span class="speed">20 km/h</span></p> 
                        <button type="button" class="rentBtn btn">Rent scooter</button>
                    </div>
                    `
                )
                .addTo(map)
                .on("popupopen", function (e) {
                    const rentBtn = document.querySelector(".rentBtn");

                    rentBtn.addEventListener("click", async () => {
                        if (!auth.isLoggedIn) {
                            m.route.set("/login");
                        } else {
                            await rentScooter(
                                e.target.options.id,
                                auth.userId,
                                scooter.longitude,
                                scooter.latitude
                            );

                            const logId = JSON.parse(localStorage.getItem("scooterStatus")).id;

                            await scooters.getLogById(logId);
                            const data = JSON.parse(localStorage.getItem("scooterTime"));

                            startTime = data[0].start_time;

                            updateView = true;
                            m.redraw();
                        }
                    });
                });
        } else if (scooter.status.status === "Rented") {
            scootersIcon.options.iconUrl = scooterIcon;

            L.marker([scooter.latitude, scooter.longitude], {
                icon: scootersIcon,
                id: scooter.id,
            })
                .bindPopup(
                    `
                        <div class="scooter">
    
                            <p>Status: <span class="status">${scooter.status.status}</span></p>
                            <p>Battery: <span class="battery_charging_full">${scooter.battery}</span> %</p>
                            <p>Max speed: <span class="speed">20 km/h</span></p> 
                            <p>Renttime: <span class="">${startTime}</span></p>
                            <button type="button" class="returnBtn btn">Return scooter</button>
                        </div>
                        `
                )
                .addTo(map)
                .on("popupopen", function (e) {
                    const rentBtn = document.querySelector(".returnBtn");

                    rentBtn.addEventListener("click", async () => {
                        if (!auth.isLoggedIn) {
                            m.route.set("/login");
                        } else {
                            await returnScooter(
                                e.target.options.id,
                                auth.userId,
                                scooter.longitude,
                                scooter.latitude,
                                scooters.status
                            );

                            startTime = "";
                            updateView = true;
                            m.redraw();
                        }
                    });
                });
        }
    });
};

const rentScooter = async (scooterId, userId, longitude, latitude) => {
    const result = await scooters.rentScooter(
        scooterId,
        userId,
        longitude,
        latitude
    );

    console.log(scooters.status);
};

const returnScooter = async (scooterId, userId, endLong, endLat, status) => {
    const result = await scooters.returnScooter(
        scooterId,
        userId,
        endLong,
        endLat,
        status
    );
};

const removeLayers = () => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
};

let overview = {
    oninit: () => {
        position.getPosition();
        stations.getAllStations();
        scooters.getAllScooters();

        setInterval(async () => {
            if (updateView) {
                await scooters.getAllScooters();
                showScooters();
                updateView = false;
            }
        }, 1000);
    },
    oncreate: () => {
        showMap();
    },
    view: () => {
        showPosition();

        return m("div", [
            m("div.title", "Overview"),
            m("div.stationsBox", [
                m(
                    "select",
                    {
                        onchange: async (e) => {
                            const zones = e.target.value
                                ? e.target.value.includes("Station")
                                : false;

                            if (zones) {
                                const results =
                                    await stations.getStationByZoneType(
                                        e.target.value
                                    );

                                removeLayers();
                                showStations(stations.station);
                            }

                            if (!zones) {
                                console.log(e.target.value);
                                removeLayers();
                                showScooters();
                            }
                        },
                    },
                    [
                        m(
                            "option",
                            { value: "", disabled: true, selected: true },
                            "Choose your option"
                        ),
                        m("option", { value: "Scooters" }, "Scooters"),
                        m(
                            "option",
                            { value: "Charging Station" },
                            "Charging Station"
                        ),
                        m(
                            "option",
                            { value: "Parking Station" },
                            "Parking Station"
                        ),
                        m("option", { value: "Bike Station" }, "Bike Station"),
                        m(
                            "option",
                            { value: "Maintenance Station" },
                            "Maintenance Station"
                        ),
                    ]
                ),
            ]),

            m("div", { id: "map" }),
        ]);
    },
};

export { overview };
//module.exports = overview;
