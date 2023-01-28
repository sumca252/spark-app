const m = require("mithril");
const auth = require("../models/auth.js");

let register = {
    view: () => {
        return [
            m("h1.title", "Register"),
            m(
                "form.form",
                {
                    onsubmit: (e) => {
                        e.preventDefault();
                        auth.register();
                    },
                },
                [
                    m("lable.input-label", "First Name"),
                    m(
                        "input[name=firstname][type=text][placeholder=Enter First name...][required].input",
                        {
                            oninput: (e) => {
                                auth.firstName = e.target.value;
                            },
                        }
                    ),
                    m("lable.input-label", "Last Name"),
                    m(
                        "input[name=lastname][type=text][placeholder=Enter Last name...][required].input",
                        {
                            oninput: (e) => {
                                auth.lastName = e.target.value;
                            },
                        }
                    ),
                    m("lable.input-label", "Username"),
                    m(
                        "input[name=username][type=text][placeholder=Enter username123...][required].input",
                        {
                            oninput: (e) => {
                                auth.username = e.target.value;
                            },
                        }
                    ),
                    m("lable.input-label", "E-mail"),
                    m(
                        "input[name=email][type=email][placeholder=E-mail...][required].input",
                        {
                            oninput: (e) => {
                                auth.email = e.target.value;
                            },
                        }
                    ),
                    m("lable.input-label", "Password"),
                    m(
                        "input[name=password][type=password][placeholder=Password...][required].input",
                        {
                            oninput: (e) => {
                                auth.password = e.target.value;
                            },
                        }
                    ),
                    m("lable.input-label", "Phone"),
                    m(
                        "input[type=text][name=phone][placeholder=Enter Phone number...][required].input",
                        {
                            oninput: (e) => {
                                auth.phone = e.target.value;
                            },
                        }
                    ),
                    m(
                        "input[type=submit][value=Register].button.sm.blue-button "
                    ),
                ]
            ),
        ];
    },
};

module.exports = register;
