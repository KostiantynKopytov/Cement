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

    var getWhereQuery = function(path) {
        path = path.replace(/(['".^$+*\\\[\]()])/gi, '\\$1');
        return { $where: "'" + path + "'.match(this.regex)" };
    };

    var preparePageIdRegex = function(path) {
        path = path.replace(/(['".^$+*\\\[\]()])/gi, '\\$1');
        return "^" + path.replace(/:([\d\w_]+)/gi, '([^/]+)') + "$";
    };

    var pageRegex = /^\/\$page((.*\/)([^/]*))\/?$/;

    module.exports = function(router) {
        return router
            .get(pageRegex, function(req, res, next) {
                var path = req.params[0], parent = req.params[1];
                parent = trimEndSlash(parent);
                var pageQuery = db.getCollection('pages').ninvoke("findOne", getWhereQuery(path));
                var parentQuery = (path === '/') || db.getCollection('pages').ninvoke("findOne", getWhereQuery(parent));
                return Q.all([pageQuery, parentQuery]).spread(function(pageData, parentData) {
                    console.log('get page', pageData, parentData);
                    if (!parentData) {
                        next(new Error('No parent page: ' + parent));
                    } else {
                        if (pageData) {
                            var values = path.match(pageData.regex);
                            var names = pageData._id.match(/:([\d\w_]+)/gi);
                            pageData.params = {};
                            if (names) {
                                names.map(function(name, index) {
                                    pageData.params[name.substring(1)] = values[index + 1];
                                });
                            }
                        }
                        var result = JSON.stringify(pageData || {});
                        res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
                        res.end(result);
                    }
                }).done();
            }).put(pageRegex, function(req, res, next) {
                var path = req.params[0], parent = req.params[1];
                parent = trimEndSlash(parent);
                var pageQuery = db.getCollection('pages').ninvoke("findOne", getWhereQuery(path));
                var parentQuery = (path === '/') || db.getCollection('pages').ninvoke("findOne", getWhereQuery(parent));
                return Q.all([helpers.readPost(req), pageQuery, parentQuery]).spread(function(post, pageData, parentData) {
                    if (!parentData) {
                        return next(new Error('No parent page: ' + parent));
                    } else {
                        var pageId = pageData ? pageData._id : path;
                        console.log('put page', pageId, pageData, parentData);
                        var data = JSON.parse(post);
                        delete data.params;
                        if (path !== '/') data.parentId = parentData._id;
                        data.regex = pageData ? pageData.regex : preparePageIdRegex(path);
                        return db.putEntity('pages', pageId, data);
                    }
                }).then(function() {
                    res.writeHead(200, 'OK');
                    res.end();
                }).done();
            });
    };
})(module, require);