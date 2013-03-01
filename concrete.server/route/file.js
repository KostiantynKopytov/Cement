(function (module, require) {
    var fs = require('fs');
    var less = require('less');
    var path = require('path');
    var logger = require("../logger").get();

    require("../helpers");

    var lessCache = {};

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
    
    function serveFile(res, file, contentType) {
        //var date = new Date();
        //date.setHours(date.getHours() + 24);
        //res.setHeader("Cache-Control", "must-revalidate");
        //res.setHeader("Expires", date.toUTCString());
        
        logger.silly(' --> file:', file);
        if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
            if (file.endsWith('.less')) {
                //                if (lessCache[file]) {
                //                    res.writeHead(200, { 'Content-Type': 'text/css' });
                //                    res.end(lessCache[file]);
                //                    return;
                //                }

                fs.readFile(file, 'utf8', function (err, data) {
                    if (!err) {
                        try {
                            var parser = new (less.Parser)({
                                paths: [path.dirname(file)],
                                filename: path.basename(file)
                            });
                            parser.parse(data, function (err2, tree) {
                                if (!err2) {
                                    res.writeHead(200, { 'Content-Type': 'text/css' });
                                    lessCache[file] = tree.toCSS({ compress: true });
                                    res.end(lessCache[file]);
                                } else {
                                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                                    res.end(JSON.stringify(err2));
                                }
                            });
                        } catch (e) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end(JSON.stringify(e));
                        }
                    } else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end(JSON.stringify(err));
                    }
                });
            } else {
                contentType = contentType || getContentType(path.extname(file));

                res.writeHead(200, { 'Content-Type': contentType });
                var fileStream = fs.createReadStream(file);
                fileStream.pipe(res);
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not found');
        }
    };

    module.exports = serveFile;
})(module, require);
