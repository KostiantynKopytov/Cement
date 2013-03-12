(function(module, require) {
    var db = require('../db');

    var pages = [{ _id: '/', regex: '^/$' }];

    var qPages = db.getCollection('pages');
    qPages.ninvoke("remove").done();
    qPages.ninvoke("insert", pages).done();
    qPages.ninvoke("ensureIndex", "parentId").done();

    var qNews = db.getCollection('news');
    qNews.ninvoke("remove").done();
})(module, require);