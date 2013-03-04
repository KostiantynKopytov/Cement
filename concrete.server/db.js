(function(module, require) {
    var Q = require('q');
    var mongodb = require('mongodb');

    var getCollection = function(name) {
        var server = new mongodb.Server("127.0.0.1", 27017, {});
        var db = new mongodb.Db('test', server, { w: 1 });
        return Q.ninvoke(db, "open").then(function (client) {
            return Q(new mongodb.Collection(client, name));
        });
    };

    var hasEntity = function(type, id) {
        return getCollection(type).ninvoke("findOne", { _id: id }).then(function (data) {
            return Q(data ? true : false);
        });
    };

    var getEntity = function(type, id) {
        return getCollection(type).ninvoke("findOne", { _id: id });
    };

    var putEntity = function(type, id, data) {
        return getCollection(type).ninvoke("update", { _id: id }, { $set: data }, { upsert: true });
    };

    var getMenu = function() {
        return getCollection('pages').ninvoke("aggregate", [{ $group: { _id: "$parentId", childPages: { $addToSet: "$_id" } } }]);
    };

    module.exports.hasEntity = hasEntity;
    module.exports.getEntity = getEntity;
    module.exports.putEntity = putEntity;

    module.exports.getMenu = getMenu;

    module.exports.getCollection = getCollection;
})(module, require);