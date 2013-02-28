(function(module, require) {
    var http = require('http');
    var logger = require('./logger').get();

    require('./seed/pages');

    var router = require('choreographer').router();

    require('./route/lookupForFiles')(router);
    require('./route/$page')(router);
    require('./route/$menu')(router);
    require('./route/content')(router);
    require('./route/index')(router);

    var active = 0;
    function logRequest(chainFn) {
        return function(req, res) {
            try {
                active++;
                logger.silly(' <-- ', { active: active, url: req.url });
                return chainFn(req, res);
            } finally {
                active--;
            }
        };
    }

    http.createServer(logRequest(router)).listen(10000);

    logger.info('server is running at http://localhost:10000');
})(module, require);
