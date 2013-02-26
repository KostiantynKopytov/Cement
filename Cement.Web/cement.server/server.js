var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var util = require('util');
var less = require('less');
require('./helpers');

var db = require('./db');

var router = require('choreographer').router();

http.ServerResponse.prototype.serveFile = function(file, contentType) {
    var res = this;
    console.log(' --> file:', file);
    if (fs.existsSync(file)) {
        if (file.endsWith('.less')) {
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(JSON.stringify(err));
                } else {
                    less.render(data, function(err2, css) {
                        res.writeHead(200, { 'Content-Type': 'text/css' });
                        if (err2) {
                            res.end(JSON.stringify(err2));
                        } else {
                            res.end(css);
                        }
                    });
                }
            });
        } else {
            contentType = contentType || db.getContentType(path.extname(file));

            this.writeHead(200, { 'Content-Type': contentType });
            var fileStream = fs.createReadStream(file);
            fileStream.pipe(this);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not found');
    }
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