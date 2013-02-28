(function(module, require) {
    var mongodb = require('mongodb');
    var logger = require('./logger').get();

    function $collection(name, callback) {
        var server = new mongodb.Server("127.0.0.1", 27017, {});
        new mongodb.Db('test', server, { w: 1 }).open(function(error, client) {
            if (error) callback(error);
            var collection = new mongodb.Collection(client, name);
            callback(null, collection);
        });
    }

    function getPage(path, callback) {
        path = path || "/";
        $collection('pages', function(error, collection) {
            if (error) callback(error);
            collection.find({ _id: path }, { limit: 1 }).nextObject(callback);
        });
    }

    function putPage(path, data, callback) {
        path = path || "/";
        $collection('pages', function(error, collection) {
            if (error) callback(error);
            logger.silly('update page:', { id: path, data: data });
            delete data._id;
            collection.update({ _id: path }, { $set: data }, callback);
        });
    }

    function getMenu() {
        return menu;
    }

    module.exports.getPage = getPage;
    module.exports.putPage = putPage;
    module.exports.getMenu = getMenu;

    module.exports.$collection = $collection;

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