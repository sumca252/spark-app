/**
 *
 *
 */

"use strict";

import m from "mithril";

let auth = {
    url: process.env.DEV_API_BASE_URL
        ? process.env.DEV_API_BASE_URL
        : process.env.PROD_API_BASE_URL,
    token: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    roleId: 2,
    isLoggedIn: false,

    login: () => {
        console.log("login", auth.email, auth.password);
        m.request({
            method: "POST",
            url: `${auth.url}/auth/login`,
            body: {
                email: auth.email,
                password: auth.password,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200) {
                auth.email = response.user.email;
                auth.isLoggedIn = true;

                localStorage.setItem("token", auth.token);

                m.route.set("/");
            }
        });
    },
    register: () => {
        const newUser = {
            firstName: auth.firstName,
            lastName: auth.lastName,
            username: auth.username,
            email: auth.email,
            password: auth.password,
            phone: auth.phone,
            roleId: auth.roleId,
        };

        m.request({
            method: "POST",
            url: `${auth.url}/auth/register`,
            body: {
                firstName: auth.firstName,
                lastName: auth.lastName,
                username: auth.username,
                email: auth.email,
                password: auth.password,
                phone: auth.phone,
                roleId: auth.roleId,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200) {
                m.route.set("/login");
            }
        });
    },
    logout: () => {
        localStorage.removeItem("token");
        auth.isLoggedIn = false;
        m.route.set("/login");
    },
};

export { auth };
