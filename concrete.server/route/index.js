(function(module, require) {
    var serveFile = require('./file');

    module.exports = function(router) {
        return router
            .get('/**', function(req, res) {
                return serveFile(req, res, '../concrete/index.html');
            });

    };
})(module, require);