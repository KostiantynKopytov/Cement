(function(module, require) {
    var Q = require('Q');
    var db = require('../db');
    var helpers = require('../helpers');

    var trimEndSlash = function(path) {
        if (path && path !== '/' && path[path.length - 1] === '/') {
            return path.substring(0, path.length - 1);
        }
        return path;
    };

    var pageRegex = /^\/\$page((.*\/)([^/]*))\/?$/;

    module.exports = function(router) {
        return router
            .get(pageRegex, function(req, res, path, parent) {
                parent = trimEndSlash(parent);
                Q.all([db.getEntity('pages', path), (path === '/') || db.hasEntity('pages', parent)]).spread(function(data, hasParent) {
                    if (!hasParent) throw 'No parent page: ' + parent;
                    var result = JSON.stringify(data);
                    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
                    res.end(result);
                }).catch(function(error) {
                    res.writeHead(500, error);
                    res.end();
                }).done();
            }).put(pageRegex, function(req, res, path, parent) {
                parent = trimEndSlash(parent);
                Q.all([helpers.readPost(req), (path === '/') || db.hasEntity('pages', parent)]).spread(function (post, hasParent) {
                    if (!hasParent) throw 'No parent page: ' + parent;
                    var data = JSON.parse(post);
                    if (path !== '/') data.parentId = parent;
                    return db.putEntity('pages', path, data);
                }).then(function() {
                    res.writeHead(200, 'OK');
                    res.end();
                }).catch(function(error) {
                    res.writeHead(500, error);
                    res.end();
                }).done();
            });
    };
})(module, require);