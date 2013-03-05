(function(module, require) {
    var db = require('../db');
    var logger = require('../logger').get();

    module.exports = function(router) {
        return router
            .get(/^\/\$menu(.*)$/, function(req, res, path) {
                db.getMenu(path).then(function(data) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                }).catch(function(error) {
                    res.writeHead(500, error);
                    res.end();
                }).done();
            });
    };
})(module, require);