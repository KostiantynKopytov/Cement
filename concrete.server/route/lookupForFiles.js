// handles files lookup using patterns like *.html
(function (module, require) {
    var glob = require('glob');
    var pathLib = require('path');
    var logger = require('../logger').get();

    module.exports = function (router) {
        return router
            .get(/^\/([^*]*)([^*]*\*[^~]*)~?(.*)$/, function (req, res, path, pattern, filter) {
                logger.silly('--- ', { path: path, pattern: pattern });
                glob(path + pattern, { root: '../concrete', cwd: '../concrete' }, function (error, files) {
                    switch (filter) {
                        case "noext":
                            files = files.map(function (val) {
                                var dot = val.lastIndexOf('.');
                                return (dot >= 0 ? val.substring(0, dot) : val);
                            });
                            break;
                        case "nodir":
                            files = files.map(function (val) {
                                return pathLib.basename(val);
                            });
                            break;
                        case "name":
                            files = files.map(function (val) {
                                return pathLib.basename(val, pathLib.extname(val));
                            });
                            break;
                        default:
                            files = files.map(function (val) {
                                return val;
                            });
                    }
                    if (!error) {
                        var result = JSON.stringify(files);
                        res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
                        res.end(result);
                    }
                });
            });
    };
})(module, require);
