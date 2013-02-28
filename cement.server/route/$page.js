(function (module, require) {
    var db = require('../db');
    var logger = require('../logger').get();
    
    function readPost(req, callback) {
        var post = '';
        req.on('data', function (chunk) {
            post += chunk;
        });
        req.on('end', function () {
            callback(null, post);
        });
        req.on('error', function (error) {
            callback(error);
        });
    }

    module.exports = function (router) {
        return router
            .get(/^\/\$page(\/.*)/, function (req, res, path) {
                db.getPage(path, function (error, data) {
                    if (error) throw error;
                    var result = JSON.stringify(data);
                    logger.silly(' --> json:', result);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(result);
                });
            })
            .put(/^\/\$page(\/.*)/, function (req, res, path) {
                readPost(req, function (error, post) {
                    if (error) throw error;
                    var data = JSON.parse(post);
                    db.putPage(path, data, function(error) {
                        if (error) throw error;
                    });
                });
            });

    };
})(module, require);
