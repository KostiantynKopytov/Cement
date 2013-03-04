(function(module, require) {
    var http = require('http');
    var logger = require('./logger').get();

    require('./seed/pages');

    var router = require('choreographer').router();

    require('./route/lookupForFiles')(router);
    require('./route/$page')(router);
    require('./route/$entity')(router);
    require('./route/$menu')(router);
    require('./route/content')(router);
    require('./route/index')(router);

    var active = 0;

    function logRequest(chainFn) {
        return function(req, res) {
            try {
                var resWriteHead = res.writeHead;
                var resEnd = res.end;
                var logWriteHead = function(statusCode, reasonPhrase, headers) {
                    logger.silly('--> code: ' + statusCode, { headers: headers , reason: reasonPhrase });
                    return resWriteHead.apply(res, arguments);
                };
                var logEnd = function(data) {
                    if (data) {
                        logger.silly('--> text: ' + data.substring(0, 100));
                    }
                    return resEnd.apply(res, arguments);
                };

                active++;
                logger.silly('<-- ' + req.method, { active: active, url: req.url });
                res.writeHead = logWriteHead;
                res.end = logEnd;

                return chainFn(req, res);
            } finally {
                active--;
            }
        };
    }

    http.createServer(logRequest(router)).listen(10000);

    logger.info('server is running at http://localhost:10000');
})(module, require);