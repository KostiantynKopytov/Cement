(function(module, require) {
    var Q = require('Q');

    var http = require('http');
    var logger = require('./logger').get();

    //require('./seed/pages');

    var router = require('choreographer').router();

    require('./route/lookupForFiles')(router);
    require('./route/$page')(router);
    require('./route/$entity')(router);
    require('./route/$menu')(router);
    require('./route/content')(router);
    require('./route/index')(router);

    function logRequest(req, res) {
        logger.silly('<-- ' + req.method, req.url);
    }

    var logWriteHead = function(req, res) {
        var resWriteHead = res.writeHead;
        res.writeHead = function(statusCode, reasonPhrase, headers) {
            var method = statusCode < 500 ? "silly" : "error";
            logger[method]('--> code: ' + statusCode + ' ' + reasonPhrase, headers);
            return resWriteHead.apply(res, arguments);
        };
    };

    var logEnd = function(req, res) {
        var resEnd = res.end;
        res.end = function(data, encoding) {
            if (data) {
                var text = data.substring(0, 200).replace(/[\r\n\t ]+/g, ' ');
                text = text.substring(0, 80) + (text.length > 80 ? '...' : '');
                logger.silly('--> text: ' + text);
            }
            return resEnd.apply(res, arguments);
        };
    };

    var enableCache = function(req, res) {
        var date = new Date();
        date.setHours(date.getHours() + 24);
        res.setHeader("Cache-Control", "private");
        res.setHeader("Expires", date.toUTCString());
    };

    var pipeFns = [logRequest, enableCache, logWriteHead, logEnd, router];
    var pipe = function(req, res) {
        try {
            pipeFns.forEach(function(fn) {
                Q(fn(req, res)).done();
            });
        } catch(error) {
            res.writeHead(500, error.stack || error);
            res.end();
        }
    };

    http.createServer(pipe).listen(10000);

    logger.info('server is running at http://localhost:10000');
})(module, require);