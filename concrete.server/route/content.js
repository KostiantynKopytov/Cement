(function(module, require) {
    var url = require('url');
    var serveFile = require('./file');

    module.exports = function(router) {
        return router
            .get(/^(.*\.(js|json|html?|ico|jpg|png|gif|css|less))$/, function (req, res) {
                var path = req.params[0];
                var parsedUrl = url.parse(path);
                return serveFile(req, res, "../concrete" + parsedUrl.pathname);
            });
    };
})(module, require);