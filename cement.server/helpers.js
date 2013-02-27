var fs = require('fs');
var less = require('less');
var path = require('path');
var logger = require("./logger").get();

String.prototype.endsWith = function (str) {
    var indexOf = this.indexOf(str);
    return (indexOf >= 0) && ((indexOf + str.length) == this.length);
};

String.prototype.startsWith = function (str) {
    var indexOf = this.indexOf(str);
    return indexOf == 0;
};

function getContentType(ext) {
    switch (ext) {
    case ".html":
        return "text/html";
    case ".css":
        return "text/css";
    case ".js":
        return "application/javascript";
    case ".png":
        return "image/png";
    case ".jpg":
        return "image/jpeg";
    default:
        return "text/plain";
    }
};

function serveFile(res, file, contentType) {
    logger.silly(' --> file:', file);
    if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
        if (file.endsWith('.less')) {
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
                                res.end(tree.toCSS({ compress: true }));
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

exports.serveFile = serveFile;
exports.getContentType = getContentType;
