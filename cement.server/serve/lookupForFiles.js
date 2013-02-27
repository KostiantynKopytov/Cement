// handles files lookup using patterns like *.html
// TODO: security!

(function (module, require) {
    var glob = require('glob');
    var logger = require('../logger').get();

    module.exports = function (router) {
        return router
            .get(/^([^*]+)([^*]*\*[^$]*)\$?(.*)$/, function (req, res, path, pattern, filter) {
                logger.silly(' --- ', { path: path, pattern: pattern });
                glob(pattern, { root: '../cement/', cwd: '../cement' + path }, function (error, files) {
                    switch (filter) {
                        case "name":
                            files = files.map(function (val) {
                                var dot = val.lastIndexOf('.');
                                return dot >= 0 ? val.substring(0, dot) : val;
                            });
                            break;
                    }
                    if (!error) {
                        var result = JSON.stringify(files);
                        logger.silly(' --> widgets:', result);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(result);
                    }
                });
            });
    };
})(module, require);
