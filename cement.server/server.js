var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util');
var logger = require('./logger').get();
var helpers = require('./helpers');
var db = require('./db');

require('./seed/pages');

var router = require('choreographer').router();

router
    .get("/portal/$widgets", function (req, res) {
        // TODO: read database
        fs.readdir('../cement/portal/widgets', function (error, files) {
            if (!error) {
                var result = JSON.stringify(files);
                logger.silly(' --> widgets:', result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(result);
            }
        });
    })
    .get("/portal/widgets/*/$templates", function (req, res, widget) {
        // TODO: read database
        var path = util.format('../cement/portal/widgets/%s', widget);
        fs.readdir(path, function (error, files) {
            if (!error) {
                var htmlExt = ".html";
                var templates = files.filter(function (file) { return file.endsWith(htmlExt); });
                var result = JSON.stringify(templates.map(function (val) { return val.substring(0, val.length - htmlExt.length); }));
                logger.silly(' --> widget templates:', result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(result);
            }
        });
    })
    .get(/^\/(admin|content|core|portal|scripts|shared)\//, function(req, res) {
        var parsedUrl = url.parse(req.url);
        helpers.serveFile(res, "../cement" + parsedUrl.pathname);
    })
    .get(/^\/\$page(\/.*)/, function(req, res, path) {
        db.$page(path, function(error, data) {
            if (error) throw error;
            var result = JSON.stringify(data);
            logger.silly(' --> json:', result);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(result);
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

logger.info('server is running at http://localhost:10000');
