var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var util = require('util');
var db = require('./db');

var router = require('choreographer').router();

http.ServerResponse.prototype.serveFile = function(file, contentType) {
    console.log(' --> file:', file);
    contentType = contentType || db.getContentType(path.extname(file));

    this.writeHead(200, { 'Content-Type': contentType });
    var fileStream = fs.createReadStream(file);
    fileStream.pipe(this);
};

router
    .get(/^\/(cement|content|scripts)\//, function(req, res) {
        console.log(" <-- content:", req.url);
        var parsedUrl = url.parse(req.url);
        res.serveFile(".." + parsedUrl.pathname);
    })
    .get(/^\/\$page(\/.*)/, function(req, res, path) {
        console.log(" <-- page:", req.url);
        // TODO: read database
        var result = JSON.stringify(db.pages[path]);
        console.log(' --> json:', result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result);
    })
    .get(/^\/\$layout\/([^/]*)/, function(req, res, path) {
        console.log(" <-- layout:", req.url);
        var parsedUrl = url.parse(path);
        res.serveFile(util.format("../cement/portal/layouts/%s.html", parsedUrl.pathname));
    })
    .get(/^\/\$menu/, function(req, res) {
        console.log(" <-- menu:", req.url);
        // TODO: read database
        var result = JSON.stringify(db.menu);
        console.log(' --> json:', result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result);
    })
    .get('/**', function(req, res) {
        console.log(' <-- default:', req.url);
        res.serveFile('../cement/index.html');
    });

http.createServer(router).listen(10000);

console.log('Server running at http://localhost:10000');
