(function(module, require) {
    var db = require('../db');
    var logger = require('../logger').get();

    module.exports = function(router) {
        return router
            .get(/^\/\$menu/, function(req, res) {
                var result = JSON.stringify(db.getMenu());
                logger.silly(' --> json:', result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(result);
            });
    };
})(module, require);