(function(module, require) {
    var logger = require('./logger').get();
    
    require('./seed/pages');

    var express = require('express');
    var app = express();

    var enableCache = function (req, res, next) {
        var date = new Date();
        date.setHours(date.getHours() + 24);
        res.setHeader("Cache-Control", "private");
        res.setHeader("Expires", date.toUTCString());
        next();
    };
    
    app.use(express.logger());
    app.use(enableCache);
    app.use(app.router);
    app.use(function (err, req, res, next) {
        logger.error(err.stack);
        res.writeHead(500, err.stack);
        res.end();
        next(err);
    });
    app.use(function (err, req, res, next) {
        next(err);
    });

    require('./route/lookupForFiles')(app);
    require('./route/$page')(app);
    require('./route/$entity')(app);
    require('./route/$menu')(app);
    require('./route/content')(app);
    require('./route/index')(app);


//    function logRequest(req, res) {
//        logger.silly('<-- ' + req.method, req.url);
//    }
//
//    var logWriteHead = function(req, res, next) {
//        var resWriteHead = res.writeHead;
//        res.writeHead = function(statusCode, reasonPhrase, headers) {
//            var method = statusCode < 500 ? "silly" : "error";
//            logger[method]('--> code: ' + statusCode + ' ' + reasonPhrase, headers);
//            resWriteHead.apply(res, arguments);
//            next();
//        };
//    };
//
//    var logEnd = function(req, res, next) {
//        var resEnd = res.end;
//        res.end = function(data, encoding) {
//            if (data) {
//                var text = data.substring(0, 200).replace(/[\r\n\t ]+/g, ' ');
//                text = text.substring(0, 80) + (text.length > 80 ? '...' : '');
//                logger.silly('--> text: ' + text);
//            }
//            resEnd.apply(res, arguments);
//            next();
//        };
//    };
//


//    app.use(logRequest);
//    app.use(enableCache);
//    app.use(logWriteHead);
//    app.use(logEnd);

    app.listen(10000);

    logger.info('server is running at http://localhost:10000');
})(module, require);