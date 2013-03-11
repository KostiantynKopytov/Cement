(function(module, require, process) {
    var fs = require('fs');
    var path = require('path');
    var logger = require('../logger').get();
    var zlib = require('zlib');
    require('../helpers');

    var getContentType = function(ext) {
        switch (ext) {
        case ".htm":
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "application/javascript";
        case ".json":
            return "application/json";
        case ".ico":
            return "image/icon";
        case ".gif":
            return "image/gif";
        case ".png":
            return "image/png";
        case ".jpg":
            return "image/jpeg";
        default:
            return "text/plain";
        }
    };

    var serveFile = function(req, res, file, contentType) {
        if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
            logger.silly('--- file:', file);
            if (file.endsWith('.less')) {
                var fork = require('child_process').fork;
                var less = fork(__dirname + '/file_less.js', [file]);
                less.on('message', function (msg) {
                    res.writeHead(msg.statusCode || 500, msg.reason || 'OK', msg.headers);
                    res.end(msg.content);
                });
            } else {
                contentType = contentType || getContentType(path.extname(file));

                res.setHeader('Content-Type', contentType);
                var raw = fs.createReadStream(file);

                var acceptEncoding = req.headers['accept-encoding'];
                if (!acceptEncoding) {
                    acceptEncoding = '';
                }

                // Note: this is not a conformant accept-encoding parser.
                // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
                if (acceptEncoding.match(/\bgzip\b/)) {
                    res.writeHead(200, { 'content-encoding': 'gzip' });
                    raw.pipe(zlib.createGzip()).pipe(res);
                } else {
                    res.writeHead(200, {});
                    raw.pipe(res);
                }
            }
        } else {
            res.writeHead(404, 'Not found');
            res.end();
        }

        return "done";
    };

    module.exports = serveFile;
})(module, require, process);