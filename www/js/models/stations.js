/**
 * Stations Model
 */

"use strict";

const m = require("mithril");

let stations = {
    url: process.env.DEV_API_BASE_URL
        ? process.env.DEV_API_BASE_URL
        : process.env.PROD_API_BASE_URL,
    allStations: [],
    station: [],
    getAllStations: () => {
        return m
            .request({
                method: "POST",
                url: `${stations.url}/graphql`,
                body: {
                    query: `{
                        
                        getAllStations {
                            id
                            station_name
                            city_name
                            zone_type
                            longitude
                            latitude
                        }
                    }     
                `,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                stations.allStations = result.data.getAllStations;
                console.log(stations.allStations);
            });
    },
    getStationByZoneType: (zoneType) => {
        const query = `
            {
                getStationByZoneType(zone_type: "${zoneType}") {
                    id,
                    station_name,
                    city_name,
                    zone_type,
                    latitude,
                    longitude
                }
            }
        `;

        return m
            .request({
                method: "POST",
                url: `${stations.url}/graphql`,
                body: {
                    query: query,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                stations.station = result.data.getStationByZoneType;
                console.log(stations.station);
            });
    },
};

module.exports = stations;
