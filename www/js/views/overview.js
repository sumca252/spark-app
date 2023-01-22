/**
 * Map/main page
 */

"use strict";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { auth } from "../models/auth";
import locIcon from "../../img/loc.png";
import locationIcon from "../../img/location.png";
import m from "mithril";
import parkingIcon from "../../img/Parking.png";
import position from "../models/position.js";
import scooterIcon from "../../img/scooter.png";
import { scooters } from "../models/scooters.js";
import { stations } from "../models/stations.js";

let map;

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
    let previousLongitude, previousLatitude;

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
                        <p>Speed: <span class="speed">20 km/h</span></p> 
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
                            <p>Speed: <span class="speed">20 km/h</span></p> 
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
