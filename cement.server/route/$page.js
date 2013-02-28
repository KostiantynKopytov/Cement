(function (module, require) {
    var db = require('../db');
    var logger = require('../logger').get();

    module.exports = function (router) {
        return router
            .get(/^\/\$page(\/.*)/, function (req, res, path) {
                db.$page(path, function (error, data) {
                    if (error) throw error;
                    var result = JSON.stringify(data);
                    logger.silly(' --> json:', result);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(result);
                });
            });
    };
})(module, require);
