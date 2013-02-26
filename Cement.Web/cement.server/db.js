exports.getContentType = function(ext) {
    switch (ext) {
    case ".html":
        return "text/html";
    case ".css":
        return "text/css";
    case ".js":
        return "application/javascript";
    case ".png":
        return "image/png";
    case ".jpg":
        return "image/jpeg";
    default:
        return "text/plain";
    }
};

exports.pages = {
    "/": {
        _id: "/",
        parentId: null,
        title: 'home',
        layout: "MainLayout",
        placeholders:
        {
            top: [
                { directive: "navigation" }
            ],
            left: [
                { directive: "text", settings: { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." } }
            ],
            content: [
                { directive: "text", settings: { title: "Module 1", content: "<b>Phasellus</b> odio felis, tempus eget rhoncus quis, placerat sed purus. Nulla metus leo, cursus nec auctor quis, volutpat nec urna." } },
                { directive: "text", settings: { title: "Module 2", content: "Aenean viverra ultricies sapien nec porttitor." } }
            ],
        }
    },
    "/about": {
        _id: "/about",
        parentId: null,
        title: 'about',
        layout: "CustomLayout",
        placeholders:
        {
            top: [
                { directive: "navigation" }
            ],
            content: [
                { directive: "text", settings: { title: "Module 1" } }, { directive: "text", settings: { title: "Module 2" } }
            ],
        }
    },
    "/contact-us": {
        _id: "/contact-us",
        parentId: null,
        title: 'contact-us',
        layout: "MainLayout",
        placeholders:
        {
            top: [
                { directive: "navigation" }
            ],
            left: [
                { directive: "text", settings: { title: "Module 2" } }
            ],
            content: [
                { directive: "text", settings: { title: "Module 1" } }, { directive: "text", settings: { title: "Module 2" } }
            ],
        }
    },
};

exports.menu = {
    childPages: [{
            href: "/",
            title: "home"
        }, {
            href: "/about",
            title: "about"
        }, {
            href: "/contact-us",
            title: "contact-us"
        },
    ]
};
