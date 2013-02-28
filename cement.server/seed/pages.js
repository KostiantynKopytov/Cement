(function(module, require) {
    var logger = require('../logger').get();
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
                    { directive: "text", settings: { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.aaaaaaaaaaaaaaadwdawdadawd" } }
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
                    { directive: "navigation", settings: { template: "template2" } }
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
        }
    ];

    function progress(message) {
        return function(error) {
            if (error) {
                logger.error('db error:', error);
                throw error;
            }
            logger.info(message);
        };
    }

    db.$collection('pages', function(error, collection) {
        progress('pages: seed started...')(error);
        collection.remove(function(error) {
            progress('pages: removed')(error);
            collection.insert(pages, function(error) {
                progress('pages: inserted')(error);
                collection.ensureIndex("parentId", progress('pages: indexed'));
           });
        });
    });
})(module, require);
