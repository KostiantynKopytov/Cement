(function(module, require) {
    var db = require('../db');
    var logger = require('../logger').get();

    module.exports = function(router) {
        return router
            .get(/^\/\$menu(.*)$/, function (req, res, path) {
                db.getMenu(path, function (error, data) {
                    if (error) {
                        res.writeHead(500, error);
                        res.end();
                    } else {
                        var result = JSON.stringify(data);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(result);
                    }
                });
            });
    };
})(module, require);