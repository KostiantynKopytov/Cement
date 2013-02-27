var db = require('../db');

var pages = [
    {
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
    }, {
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
    }, {
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
];

var throwError = function (error) {
    if (error) throw error;
};

db.$collection('pages', function (error, collection) {
    if (error) throw error;
    collection.remove(throwError);
    collection.insert(pages, throwError);
    collection.ensureIndex("parentId", throwError);
});
