import { auth } from "../models/auth";
import m from "mithril";

let login = {
    view: () => {
        return [
            m("h1.title", "Login"),
            m(
                "form.form",
                {
                    onsubmit: (e) => {
                        e.preventDefault();
                        auth.login();
                    },
                },
                [
                    m("lable.input-label", "E-mail"),
                    m(
                        "input[type=email][placeholder=E-mail...][required].input",
                        {
                            oninput: (e) => {
                                auth.email = e.target.value;
                            },
                            value: auth.email,
                        }
                    ),
                    m("lable.input-label", "Password"),
                    m(
                        "input[type=password][placeholder=Password...][required].input",
                        {
                            oninput: (e) => {
                                auth.password = e.target.value;
                            },
                            value: auth.password,
                        }
                    ),

                    m("input[type=submit][value=Login].button.sm"),
                    m(
                        "a.button..green-button",
                        { href: "#!/register" },
                        "Register"
                    ),
                ]
            ),
        ];
    },
};

export { login };
