var http = require('http');
var url = require('url');
var util = require('util');
var logger = require('./logger').get();
var helpers = require('./helpers');
var db = require('./db');

var router = require('choreographer').router();

router
    .get(/^\/(admin|content|core|portal|scripts|shared)\//, function(req, res) {
        var parsedUrl = url.parse(req.url);
        helpers.serveFile(res, "../cement" + parsedUrl.pathname);
    })
    .get(/^\/\$page(\/.*)/, function(req, res, path) {
        db.$page(path, function (error, data) {
            if (!error) {
                var result = JSON.stringify(data);
                logger.silly(' --> json:', result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(result);
            }
        });
    })
    .get(/^\/\$layout\/([^/]*)/, function(req, res, path) {
        var parsedUrl = url.parse(path);
        helpers.serveFile(res, util.format("../cement/portal/layouts/%s.html", parsedUrl.pathname));
    })
    .get(/^\/\$menu/, function(req, res) {
        // TODO: read database
        var result = JSON.stringify(db.$menu());
        logger.silly(' --> json:', result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result);
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

logger.info('Server running at http://localhost:10000');