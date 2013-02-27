var mongodb = require('mongodb');
var logger = require('./logger').get();

function $page(path, callback) {
    path = path || "/";
    var server = new mongodb.Server("127.0.0.1", 27017, {});
    new mongodb.Db('test', server, { w: 1 }).open(function (error, client) {
        if (error) callback(error);
        var collection = new mongodb.Collection(client, 'pages');
        collection.find({ _id: path }, { limit: 1 }).nextObject(function(error, data) {
            callback(error, data);
        });
    });
}

function $menu() {
    return menu;
}

exports.$page = $page;
exports.$menu = $menu;

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
        },
    ]
};