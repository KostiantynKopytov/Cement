(function(module, require) {
    var url = require('url');
    var serveFile = require('./file');

    module.exports = function(router) {
        return router
            .get(/^(.*\.(js|json|html?|jpg|png|gif|css|less))$/, function(req, res, path) {
                var parsedUrl = url.parse(path);
                serveFile(res, "../concrete" + parsedUrl.pathname);
            });
    };
})(module, require);
