// handles files lookup using patterns like *.html
(function(module, require) {
    var Q = require('Q');
    var fs = require('fs');
    var glob = require('glob');
    var pathLib = require('path');
    var logger = require('../logger').get();

    var removeExtension = function(val) {
        var dot = val.lastIndexOf('.');
        return (dot >= 0 ? val.substring(0, dot) : val);
    };

    module.exports = function(router) {
        return router
            .get(/^\/([^*]*)([^*]*\*[^~]*)~?(.*)$/, function(req, res) {
                var path = req.params[0], pattern = req.params[1], filter = req.params[2];
                logger.silly('--- ', { path: path, pattern: pattern });
                return Q
                    .try(Q.nfbind(glob, path + pattern, { root: '../concrete', cwd: '../concrete' }))
                    .then(function(files) {
                        switch (filter) {
                        case "noext":
                            files = files.map(removeExtension);
                            break;
                        case "nodir":
                            files = files.map(function(val) {
                                return pathLib.basename(val);
                            });
                            break;
                        case "name":
                            files = files.map(function(val) {
                                return pathLib.basename(val, pathLib.extname(val));
                            });
                            break;
                        case "amd":
                        case "amd.js":
                            var qs = files.map(function(file) {
                                return Q.nfcall(fs.readFile, '../concrete/' + file, 'utf8');
                            });
                            return Q.all(qs).spread(function() {
                                console.log(files, qs, arguments[0].prototype);
                                var texts = arguments;
                                var content = '';
                                var deps = '';
                                files.forEach(function(file, index) {
                                    var text = texts[index];
                                    var filename = removeExtension(file);
                                    console.log(text.charCodeAt(0).toString(16));
                                    if (text.charCodeAt(0) == 0xFEFF) {
                                        text = text.substr(1);
                                    }
                                    content += text.replace(/^define\(/, '\ndefine("' + filename + '", ');
                                    deps += (deps ? '","' : '') + filename;
                                });
                                content += '\ndefine(["' + deps + '"], function () { return arguments; });';
                                res.writeHead(200, 'OK', { 'Content-Type': 'application/javascript' });
                                res.end(content);
                            });
                        }
                        return Q(files).then(function(f) {
                            var result = JSON.stringify(f);
                            res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
                            res.end(result);
                        });
                    });
            });
    };
})(module, require);