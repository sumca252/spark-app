/**
 * Map/main page
 */

"use strict";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
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
            .bindPopup("You are here");
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
    const scootersIcon = L.icon({
        iconUrl: scooterIcon,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, 0],
    });

    scooters.allScooters.forEach((scooter) => {
        if (scooter.status.status === "Available") {
            scootersIcon.options.iconUrl = scooterIcon;
        }

        L.marker([scooter.latitude, scooter.longitude], {
            icon: scootersIcon,
        })
            .bindPopup(
                `
                <p class="scooter">
                    Scooter status: ${scooter.status.status}
                </p>`
            )
            .addTo(map);
    });
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
            m("div.title"),
            m("div.input-field col s12", [
                m(
                    "select",
                    {
                        onchange: async (e) => {
                            stations.station = [];
                            const results = await stations.getStationByZoneType(
                                e.target.value
                            );

                            showStations(stations.station);
                        },
                    },
                    [
                        m(
                            "option",
                            { value: "", disabled: true, selected: true },
                            "Show Stations"
                        ),
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
