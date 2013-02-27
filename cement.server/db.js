(function(module, require) {
    var mongodb = require('mongodb');

    function $collection(name, callback) {
        var server = new mongodb.Server("127.0.0.1", 27017, {});
        new mongodb.Db('test', server, { w: 1 }).open(function(error, client) {
            if (error) callback(error);
            var collection = new mongodb.Collection(client, name);
            callback(null, collection);
        });
    }

    function $page(path, callback) {
        path = path || "/";
        $collection('pages', function(error, collection) {
            if (error) callback(error);
            collection.find({ _id: path }, { limit: 1 }).nextObject(callback);
        });
    }

    function $menu() {
        return menu;
    }

    module.exports.$collection = $collection;
    module.exports.$page = $page;
    module.exports.$menu = $menu;

    var menu = {
        childPages: [{
                href: "/",
                title: "home"
            }, {
                href: "/about",
                title: "about"
            }, {
                href: "/contact-us",
                title: "contact-us"
            }
        ]
    };
})(module, require);
