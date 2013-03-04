(function(module, require) {
    var db = require('../db');

    function readPost(req, callback) {
        var post = '';
        req.on('data', function(chunk) {
            post += chunk;
        });
        req.on('end', function() {
            callback(null, post);
        });
        req.on('error', function(error) {
            callback(error);
        });
    }

    var pageRegex = /^\/\$page((.*\/)([^/]+))\/?$/;

    module.exports = function(router) {
        return router
            .get(pageRegex, function(req, res, path, parent) {
                db.getEntity('pages', path, function(error, data) {
                    if (error) {
                        res.writeHead(500, error);
                        res.end();
                    } else if (data) {
                        var result = JSON.stringify(data);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(result);
                    } else if (parent) {
                        db.hasEntity('pages', parent, function(error, result) {
                            if (error) {
                                res.writeHead(500, error);
                                res.end();
                            } else if (!result) {
                                res.writeHead(500, 'No parent page: ' + parent);
                                res.end();
                            } else {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end("{}");
                            }
                        });
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end("{}");
                    }
                });
            })
            .put(pageRegex, function(req, res, path, parent) {
                readPost(req, function(error, post) {
                    if (error) {
                        res.writeHead(500, error);
                        res.end();
                        return;
                    }
                    var data = JSON.parse(post);
                    if (parent) {
                        db.hasEntity('pages', parent, function(error, result) {
                            if (error) {
                                res.writeHead(500, error);
                                res.end();
                            } else if (result) {
                                data.parentId = parent;
                                db.putEntity('pages', path, data, function(error) {
                                    if (error) throw error;
                                    res.writeHead(200, 'OK');
                                    res.end();
                                });
                            } else {
                                res.writeHead(500, 'No parent page: ' + parent);
                                res.end();
                            }
                        });
                    }
                    db.putEntity('pages', path, data, function(error) {
                        if (error) throw error;
                        res.writeHead(200, 'OK');
                        res.end();
                    });
                });
            });

    };
})(module, require);