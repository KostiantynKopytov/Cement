(function(module, require) {
    var url = require('url');
    var serveFile = require('./file');

    module.exports = function(router) {
        return router
            .get(/^(.*\.(js|html|jpg|png|css|less))$/, function(req, res, path) {
                var parsedUrl = url.parse(path);
                serveFile(res, "../cement" + parsedUrl.pathname);
            });
    };
})(module, require);
