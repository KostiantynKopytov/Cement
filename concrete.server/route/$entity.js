(function (module, require) {
    var db = require('../db');
    var logger = require('../logger').get();

    var readPost = function(req, callback) {
        var post = '';
        req.on('data', function(chunk) {
            post += chunk;
        });
        req.on('end', function() {
            callback(null, post);
        });
        req.on('error', function(error) {
            callback(error);
        });
    };

    module.exports = function (router) {
        return router
            .get(/^\/\$entity\/([^/]*)\/([^/]*)/, function (req, res, type, id) {
                db.getEntity(type, id, function (error, data) {
                    if (error) throw error;
                    var result = JSON.stringify(data || {});
                    logger.silly(' --> json:', result);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(result);
                });
            })
            .put(/^\/\$entity\/([^/]*)\/([^/]*)/, function (req, res, type, id) {
                readPost(req, function (error, post) {
                    if (error) throw error;
                    var data = JSON.parse(post);
                    db.putEntity(type, id, data, function(error) {
                        if (error) throw error;
                        res.writeHead(200);
                        res.end();
                    });
                });
            });
    };
})(module, require);
