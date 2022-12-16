/**
 * Contains navigation
 * 
*/

"use strict";

import m from "mithril";


let layout = {
    // user is logged in
    in: [
        { name: "Betalning", icon: "payment", route: "#!/payment" },
        { name: "Historik över resorna", icon: "history", route: "#!/history" },
        { name: "Inställningar", icon: "settings_applications", route: "#!/settings" },
        { name: "Logga ut", icon: "exit_to_app", route: "#!/logout" },
    ],

    // the user is not logged in
    out: [
        { name: "Logga in", route: "#!/login" },
        { name: "Registrera", route: "#!/register" },
        { name: "Inställningar", route: "#!/settings" },
    ],

    view: function (vnode) {
        let nav = vnode.attrs.nav;

        return [
            m("h1.app-header", m("a", {href: "#!/"}, "Spark")),
            m("nav", [
                // Check if user is logged in (if token)

                // if logged in show this
                m("h2", "Hej username"),
                layout.in.map(function(link) {
                    return m("li", [
                        m("i.material-icons", link.icon),
                        m("a", {
                            href: link.route,
                            class: nav == link.route ? "active" : null
                        }, link.name)
                    ])
                }),

                // otherwise show this
                /*
                m("p", "Välkommen till Spark appen"),
                layout.out.map(function(link) {
                    return m("li", [
                        m("a", {
                            href: link.route,
                            class: nav == link.route ? "active" : null
                        }, link.name)
                    ])
                })*/

            ]),
            m("main", vnode.children),
        ];
    }
};

export { layout };