(function(module, require) {
    var http = require('http');
    var url = require('url');
    var logger = require('./logger').get();
    var helpers = require('./helpers');

    require('./seed/pages');

    var router = require('choreographer').router();

    require('./serve/lookupForFiles')(router);
    require('./serve/$page')(router);
    require('./serve/$menu')(router);
    require('./serve/$layout')(router);
    
    router
        .get(/^\/(admin|content|core|portal|scripts|shared)\//, function (req, res) {
            var parsedUrl = url.parse(req.url);
            helpers.serveFile(res, "../cement" + parsedUrl.pathname);
        })
        .get('/**', function(req, res) {
            helpers.serveFile(res, '../cement/index.html');
        });

    function logRequest(chainFn) {
        return function(req, res) {
            logger.silly(' <-- ', req.url);
            return chainFn(req, res);
        };
    }

    http.createServer(logRequest(router)).listen(10000);

    logger.info('server is running at http://localhost:10000');
})(module, require);
