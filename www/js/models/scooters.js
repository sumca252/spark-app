/**
 * Scooters model
 */

"use strict";

import m from "mithril";

let scooters = {
    url: process.env.DEV_API_BASE_URL
        ? process.env.DEV_API_BASE_URL
        : process.env.PROD_API_BASE_URL,

    allScooters: [],
    scooter: [],
    active: [],
    getAllScooters: () => {
        const query = `
            query {
                getAllScooters {
                    id,
                    battery,
                    status {
                        status,
                    },
                    longitude,
                    latitude,
                    price {
                        start_cost
                        travel_cost
                        parking_cost
                    },
                    speed,   
                }
            } 
        `;

        return m
            .request({
                method: "POST",
                url: `${scooters.url}/graphql`,
                body: {
                    query: query,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                scooters.allScooters = result.data.getAllScooters;

                scooters.scooter = result.data.getAllScooters.slice(0, 1000);
            });
    },
    rentScooter: (scooterId, userId, long, lat) => {
        const query = `
            mutation {
                rentScooter(
                    id:"${scooterId}",
                    user_id: "${userId}",
                    longitude:"${long}",
                    latitude: "${lat}"
                ) {
                    id  
                }
            }
        `;

        return m
            .request({
                method: "POST",
                url: `${scooters.url}/graphql`,
                body: { query: query },
                headers: { "Content-Type": "application/json" },
            })
            .then((result) => result)
            .catch((err) => {
                console.log(err);
            });
    },
    returnScooter: (scooterId, userId, endLong, endLat, distance) => {
        const query = `
            mutation {
                returnScooter(
                    id:"${scooterId}",
                    user_id: "${userId}",
                    longitude:"${long}",
                    latitude: "${lat}"
                    distance: "${distance}"
                ) {
                    id  
                }
            }
        `;

        return m
            .request({
                method: "POST",
                url: `${scooters.url}/graphql`,
                body: { query: query },
                headers: { "Content-Type": "application/json" },
            })
            .then((result) => result)
            .catch((err) => {
                console.log(err);
            });
    },
};

export { scooters };
