(function (module, require) {
    var util = require('util');
    var url = require('url');
    var helpers = require('../helpers');
    var logger = require('../logger').get();

    module.exports = function (router) {
        return router
            .get(/^\/\$layout\/([^/]*)/, function(req, res, path) {
                logger.silly(' --- path:', path);
                var parsedUrl = url.parse(path);
                helpers.serveFile(res, util.format("../cement/portal/layouts/%s.html", parsedUrl.pathname));
            });
    };
})(module, require);
