(function(module, require) {
    var Q = require('Q');
    var db = require('../db');

    var readPost = function (req) {
        var q = Q.defer();
        var post = '';
        req.on('data', function(chunk) {
            post += chunk;
        });
        req.on('end', function() {
            q.resolve(post);
        });
        req.on('error', function(error) {
            q.reject(error);
        });
        req.on('close', function () {
            q.reject("conntection closed");
        });
        return q.promise;
    };

    var trimEndSlash = function(path) {
        if (path && path !== '/' && path[path.length - 1] === '/') {
            return path.substring(0, path.length - 1);
        }
        return path;
    };

    var pageRegex = /^\/\$page((.*\/)([^/]*))\/?$/;

    module.exports = function(router) {
        return router
            .get(pageRegex, function (req, res, path, parent) {
                Q.try(function() {
                    parent = trimEndSlash(parent);
                    return db.getEntity('pages', path);
                }).then(function(data) {
                    if (data || !parent) {
                        return data || {};
                    }
                    return db.hasEntity('pages', parent).then(function(hasEntity) {
                        if (!hasEntity) throw 'No parent page: ' + parent;
                        return {};
                    });
                }).then(function(data) {
                    var result = JSON.stringify(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(result);
                }).catch(function(error) {
                    res.writeHead(500, error);
                    res.end();
                });
            }).put(pageRegex, function(req, res, path, parent) {
                var qPost = readPost(req);
                Q.try(function () {
                    parent = trimEndSlash(parent);
                    if (!parent) return true;
                    return db.hasEntity('pages', parent);
                }).then(function(canPut) {
                    console.log(1, canPut);
                    if (!canPut) throw 'No parent page: ' + parent;
                    return qPost;
                }).then(function (post) {
                    console.log(2);
                    var data = JSON.parse(post);
                    data.parentId = parent || null;
                    return db.putEntity('pages', path, data);
                }).then(function() {
                    res.writeHead(200, 'OK');
                    res.end();
                }).catch(function (error) {
                    res.writeHead(500, error);
                    res.end();
                });
            });
    };
})(module, require);