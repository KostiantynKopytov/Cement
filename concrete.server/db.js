(function(module, require) {
    var mongodb = require('mongodb');
    var logger = require('./logger').get();

    var $collection = function(name, callback) {
        var server = new mongodb.Server("127.0.0.1", 27017, {});
        new mongodb.Db('test', server, { w: 1 }).open(function(error, client) {
            if (error) callback(error);
            var collection = new mongodb.Collection(client, name);
            callback(null, collection);
        });
    };

    var hasEntity = function(type, id, callback) {
        $collection(type, function(error, collection) {
            if (error) callback(error);
            collection.findOne({ _id: id }, { limit: 1 }, function (error, data) {
                logger.silly('--- has entity:', { id: id, type: type, 'has?': data });
                callback(error, data !== null);
            });
        });
    };

    var getEntity = function(type, id, callback) {
        $collection(type, function(error, collection) {
            if (error) callback(error);
            logger.silly('--- reading entity:', { id: id, type: type });
            collection.findOne({ _id: id }, { limit: 1 }, callback);
        });
    };

    var putEntity = function(type, id, data, callback) {
        $collection(type, function(error, collection) {
            if (error) callback(error);
            logger.silly('--- update entity: ', { id: id, type: type, data: data });
            delete data._id;
            collection.update({ _id: id }, { $set: data }, { upsert: true }, callback);
        });
    };

    var getMenu = function (path, callback) {
        $collection('pages', function (error, collection) {
            if (error) callback(error);
            logger.silly('--- read menu: ', path);
            collection.find({ parentId: path }).toArray(callback);
        });
    };

    module.exports.hasEntity = hasEntity;
    module.exports.getEntity = getEntity;
    module.exports.putEntity = putEntity;

    module.exports.getMenu = getMenu;

    module.exports.$collection = $collection;
})(module, require);