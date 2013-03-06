(function(module, require) {
    var db = require('../db');

    module.exports = function(router) {
        return router
            .get(/^\/\$menu(.*)$/, function(req, res, path) {
                return db.getMenu(path).then(function(data) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                });
            });
    };
})(module, require);