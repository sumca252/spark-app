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
    status: [],
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
                    success  
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
            .then((result) => {
                scooters.status = result.data.rentScooter;

                localStorage.setItem(
                    "scooterStatus",
                    JSON.stringify(scooters.status)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    },
    returnScooter: (scooterId, userId, endLong, endLat, distance) => {
        const logId = JSON.parse(localStorage.getItem("scooterStatus")).id;
        const status = JSON.parse(
            localStorage.getItem("scooterStatus")
        ).success;

        scooters.getLogById(logId);

        const data = JSON.parse(localStorage.getItem("scooterTime"));
        const startTime = data[0].start_time;

        const today = new Date();
        const date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();

        const time = today.getHours() + ":" + today.getMinutes();

        const endTime = date + " " + time;

        const total = new Date(endTime) - new Date(startTime);

        const tolalTimeInMinutes = Math.floor(total / 60000);

        const query = `
            mutation {
                returnScooter(
                    id:"${scooterId}",
                    user_id: "${userId}",
                    longitude:"${endLong}",
                    latitude: "${endLat}"
                    time: "${tolalTimeInMinutes}",
                    station: "${status}"
                ) {
                    id
                    success
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
            .then((result) => {
                localStorage.removeItem("scooterStatus");
                localStorage.removeItem("scooterTime");
                console.log("result: ", result.data.returnScooter);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getLogById: (id) => {
        const query = `
            query {
                getLogById(id: "${id}") {
                    id,
                    start_time,
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
            .then((result) => {
                localStorage.setItem(
                    "scooterTime",
                    JSON.stringify(result.data.getLogById)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    },
};

export { scooters };
