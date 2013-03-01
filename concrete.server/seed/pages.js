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
                    { name: "navigation", container: { name: 'default', title: 'test title' }}
                ],
                left: [
                    { title: "Lorem ipsum", container: { name: 'default', title: 'test title' }, directive: { name: "text", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.aaaaaaaaaaaaaaadwdawdadawd" } }
                ],
                content: [
                  
                ]
            }
        }, {
            _id: "/about",
            parentId: null,
            title: 'about',
            layout: "CustomLayout",
            placeholders:
            {
                top: [
                    { name: "navigation", container: { name: 'default', title: 'test title' } }
                ],
                content: [
                   
                ]
            }
        }, {
            _id: "/contact-us",
            parentId: null,
            title: 'contact-us',
            layout: "MainLayout",
            placeholders:
            {
                top: [
                    { name: "navigation", container: { name: 'default', title: 'test title' } }
                ],
                left: [
                  
                ],
                content: [
                   
                ]
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
