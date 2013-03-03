(function(module, require) {
    var logger = require('../logger').get();
    var db = require('../db');

    var pages = [{ _id: '/' }];

    function progress(message) {
        return function(error) {
            if (error) {
                logger.error('db error:', error);
                throw error;
            }
            logger.info(message);
        };
    }

    db.$collection('pages', function(error, collection) {
        progress('pages: seed started...')(error);
        collection.remove(function(error) {
            progress('pages: removed')(error);
            collection.insert(pages, function(error) {
                progress('pages: inserted')(error);
                collection.ensureIndex("parentId", progress('pages: indexed'));
            });
        });
    });
    
    db.$collection('news', function (error, collection) {
        progress('news: seed started...')(error);
        collection.remove(function (error) {
            progress('news: removed')(error);
        });
    });
})(module, require);