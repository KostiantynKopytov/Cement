(function(module, require) {
    var db = require('../db');
    var helpers = require('../helpers');

    module.exports = function(router) {
        return router
            .get(/^\/\$entity\/([^/]*)\/([^/]*)/, function(req, res, type, id) {
                return db.getEntity(type, id).then(function(data) {
                    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data || {}));
                });
            })
            .put(/^\/\$entity\/([^/]*)\/([^/]*)/, function(req, res, type, id) {
                return helpers.readPost(req).then(function(post) {
                    var data = JSON.parse(post);
                    return db.putEntity(type, id, data);
                }).then(function() {
                    res.writeHead(200, 'OK');
                    res.end();
                });
            });
    };
})(module, require);