(function (module, require) {
    var Q = require('Q');
    var fs = require('fs');
    var less = require('less');
    var path = require('path');
    var logger = require("../logger").get();

    require("../helpers");

    function getContentType(ext) {
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
    
    var serveFile = function (res, file, contentType) {
        //var date = new Date();
        //date.setHours(date.getHours() + 24);
        //res.setHeader("Cache-Control", "must-revalidate");
        //res.setHeader("Expires", date.toUTCString());
        
        if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
            logger.silly('--- file:', file);
            if (file.endsWith('.less')) {
                Q.nfcall(fs.readFile, file, 'utf8').then(function(data) {
                    var parser = new (less.Parser)({
                        paths: [path.dirname(file)],
                        filename: path.basename(file)
                    });
                    return Q.ninvoke(parser, "parse", data);
                }).then(function(tree) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(tree.toCSS({ compress: true }));
                }).catch(function(error) {
                    res.writeHead(500, error, { 'Content-Type': 'text/plain' });
                    res.end();
                });
            } else {
                var contentType = contentType || getContentType(path.extname(file));

                res.writeHead(200, { 'Content-Type': contentType });
                var fileStream = fs.createReadStream(file);
                fileStream.pipe(res);
            }
        } else {
            res.writeHead(404, 'Not found', { 'Content-Type': 'text/plain' });
            res.end();
        }
    };

    module.exports = serveFile;
})(module, require);
